import { Role } from "@/app/generated/prisma/enums"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { NextRequest } from "next/server"
import { getAuthUser } from "../../libs/auth/auth"
import prisma from "@/libs/db"
import { AppError } from "@/utils/AppError"
import { ProfileUpdate } from "../supabase/ProfileUpload.service"
import { createFileSignedUrl } from "@/libs/createFileSignedUrl"


export const authService = {

    async register(
        username: string,
        email: string,
        password: string,
        role: Role
    ) {
        if (!username || !email || !password) {
            throw new Error('All field are required')
        }

        const alreadyExist = await prisma.user.findUnique(
            {
                where: {
                    username,
                    email
                }
            }
        )

        if (alreadyExist) {
            throw new Error("User Already Exist")
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create(
            {
                data: {
                    username,
                    email,
                    password: hashPassword,
                    role
                }
            }
        )



        return { user }
    },

    async login(
        email: string,
        password: string,
    ) {
        if (!email || !password) {
            throw new Error('Both field require')
        }


        const user = await prisma.user.findUnique(
            {
                where: {
                    email
                }
            }
        )

        if (!user) {
            throw new Error('Email is Incorrect')
        }

        const hashPassword = await bcrypt.compare(password, user.password)

        if (!hashPassword) {
            throw new Error("Password is incorrect ")
        }

        return { user }
    },

    async refreshToken() {
        const cookiestore = await cookies()
        const token = cookiestore.get('refreshToken')?.value

        if (!token) {
            throw new Error('Token is not provided')
        }


        const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN)

        const { payload } = await jwtVerify(token, secret)


        const user = await prisma.user.findUnique(
            {
                where: {
                    id: payload.userId as string
                }
            }
        )

        if (!user) {
            throw new Error("User is not found")
        }

        return {
            user
        }
    },

    async loginUser(request: NextRequest) {
        const user = await getAuthUser(request)

        const findUser = await prisma.user.findUnique(
            {
                where: {
                    id: user.userId
                }
            }
        )

        if (!findUser) {
            throw new Error('User is not found ')
        }

        return findUser

    },

    async updateProfile(request: NextRequest, username?: string, email?: string, pfp?: File, removePfp?: boolean) {
        const admin = await getAuthUser(request)

        let pfpPath: string | undefined

        if (removePfp && !(pfp instanceof File)) {
            await prisma.user.update(
                {
                    where: {
                        id: admin.userId
                    },
                    data: {
                        pfp: ''
                    }
                }
            )
        }
        else if (pfp && pfp.size > 0) {
            const allowedType: Record<string, string> = {
                "image/jpeg": "jpg",
                "image/png": "png",
                "image/webp": "webp",
            }

            const extension = allowedType[pfp.type]

            if (!extension) {
                throw new AppError('Only JPEG, PNG, and WebP images are allowed', 404)
            }

            if (pfp.size > 2 * 1024 * 1024) {
                throw new AppError('Image must be less than 2 mb', 400)
            }

            const buffer = Buffer.from(await pfp.arrayBuffer())

            pfpPath = await ProfileUpdate(
                buffer,
                pfp.type,
                admin.userId,
                extension
            )

        }

        const find = await prisma.user.findFirst(
            {
                where: {
                    id: {
                        not: admin.userId
                    },
                    email: email
                }
            }
        )

        if (find) {
            throw new AppError('Email is already exist', 409)
        }

        const updateAdminProfile = await prisma.user.update(
            {
                where: {
                    id: admin.userId,
                },
                data: {
                    ...(username !== undefined && { username }),
                    ...(email !== undefined && { email }),
                    ...(pfp !== undefined && { pfp: pfpPath }),
                }
            }
        )

        return updateAdminProfile

    },

    async ProfileImage(request: NextRequest) {
        const admin = await getAuthUser(request)

        const user = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!user) {
            throw new AppError('Unauthorized user', 401)
        }

        const signedUrl = user.pfp ? await createFileSignedUrl(user.pfp) : null

        return signedUrl

    }

}
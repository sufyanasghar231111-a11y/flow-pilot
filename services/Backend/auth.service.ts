import { Role } from "@/app/generated/prisma/enums"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { NextRequest } from "next/server"
import { getAuthUser } from "../../libs/auth/auth"
import prisma from "@/libs/db"


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

    }

}
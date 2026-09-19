import { NextRequest } from "next/server";
import { cookies } from "next/headers";
import crypto from 'crypto'
import { authService } from "@/services/Backend/auth.service";
import { createRefreshToken } from "@/libs/auth/refreshToken";
import prisma from "@/libs/db";
import { createAccessToken } from "@/libs/auth/accessToken";

export async function POST(request: NextRequest) {

    try {

        const body = await request.json()

        const forwardedfor = request.headers.get('x-forwarded-for')
        const ip = forwardedfor?.split(',')[0].trim() || 'Unknown'

        const userAgent = request.headers.get('user-agent') || 'Unknown'

        const { user } = await authService.login(
            body.email, body.password
        )
        


        const refreshToken = await createRefreshToken(user.id, user.role)
        const refreshHash = crypto.createHash('sha256').update(refreshToken).digest('hex')


        const session = await prisma.logout.create(
            {
                data: {
                    userId: user.id,
                    refreshHash,
                    revoke: false,
                    ip,
                    userAgent
                }
            }
        )

        const accessToken = await createAccessToken(user.id, user.role, session.id)

        const cookieStore = await cookies()

        cookieStore.set("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        })

        return Response.json(
            {
                message: "Successful login",
                user,
                accessToken,
            },
            {
                status: 201
            }
        )

    }
    catch (err) {
        return Response.json(
            {
                message: err instanceof Error ?
                    err.message : "Something went wrong"
            },
            {
                status: 500
            }
        )
    }

}
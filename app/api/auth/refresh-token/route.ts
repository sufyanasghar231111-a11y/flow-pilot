
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import crypto from 'crypto'
import { authService } from "@/services/Backend/auth.service";
import { createRefreshToken } from "@/libs/auth/refreshToken";
import prisma from "@/libs/db";
import { createAccessToken } from "@/libs/auth/accessToken";

export async function GET(request: NextRequest) {
    try {

        const { user } = await authService.refreshToken()

        const forwardedfor = request.headers.get('x-forwarded-for')
        const ip = forwardedfor?.split(',')[0].trim() || 'Unknown'

        const userAgent = request.headers.get('user-agent') || 'Unknown'


        const cookiestore = await cookies()

        const refreshToken = await createRefreshToken(user.id, user.role)
        const refreshHash = crypto.createHash('sha256').update(refreshToken).digest('hex')

        const session = await prisma.logout.create(
            {
                data: {
                    ip,
                    userAgent,
                    refreshHash,
                    userId: user.id
                }
            }
        )

        const accessToken = await createAccessToken(user.id, user.role, session.id)

        cookiestore.set("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        })


        return Response.json(
            {
                message: "Successfull create Token",
                user,
                accessToken
            },
            {
                status: 200
            }
        )

    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something Went Wrong'

        return Response.json(
            {
                message
            },
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 :
                        500
            }
        )
    }
}
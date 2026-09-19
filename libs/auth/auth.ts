import { jwtVerify } from "jose"
import { NextRequest } from "next/server"
import prisma from "../db"

type AuthUser = {
    userId: string,
    role: "USER" | "ADMIN",
    sessionId: string
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser> {

    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authorization token is not provided')
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        throw new Error('Token is not provided')
    }

    try {
        const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN)

        const { payload } = await jwtVerify<AuthUser>(token, secret)

        if (
            !payload.userId ||
            !payload.role ||
            !payload.sessionId
        ) {
            throw new Error("Invalid token payload")
        }

        if (!payload.sessionId) {
            throw new Error('Invalid Session')
        }


        const session = await prisma.logout.findUnique(
            {
                where: {
                    id: payload.sessionId
                },
                select: {
                    userId: true,
                    revoke: true
                }
            }
        )

        if (!session || session.userId !== payload.userId || session.revoke) {
            throw new Error("Invalid access token")
        }

        return payload

    }
    catch {
        throw new Error('Invalid access token')
    }

}
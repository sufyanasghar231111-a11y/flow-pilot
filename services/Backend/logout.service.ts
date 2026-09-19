import { cookies } from "next/headers"
import prisma from "../../libs/db"
import { jwtVerify } from "jose"

export const logoutService = {

    async logoutAllDevice() {

        const cookiestore = await cookies()

        const token = cookiestore.get('refreshToken')?.value

        if (!token) {
            throw new Error('Token is not Provided')
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
            throw new Error('User is not found')
        }

        const session = await prisma.logout.updateMany(
            {
                where: {
                    userId: user.id,
                    revoke: false
                },
                data: {
                    revoke: true
                }
            }
        )


        cookiestore.delete('refreshToken')
        return session
    }
}
import { SignJWT } from "jose"


const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN)

export async function createRefreshToken(userId: string, role: string) {
    return new SignJWT({
        userId,
        role
    })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('7d')
        .sign(secret)
}
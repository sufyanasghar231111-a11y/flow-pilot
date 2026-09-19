
import { AuthUser } from "@/types/usertype";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function checkPageRole(role: 'USER' | 'ADMIN') {
    const cookieStore = await cookies()

    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        redirect('/auth/login')
    }
    try {

        const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN)

        const { payload } = await jwtVerify<AuthUser>(refreshToken, secret)

        if (payload.role !== role) {
            redirect('/auth/login')
        }
        
        return payload
    }
    catch (err) {
        redirect('/auth/login')
    }
}
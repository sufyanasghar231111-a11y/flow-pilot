import { AuthUser } from "@/types/usertype";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function getCurrentUser() {

    const cookieStore = await cookies()
    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        return
    }

    const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN)

    const { payload } = await jwtVerify<AuthUser>(refreshToken, secret)

    if (payload.role === 'ADMIN') {
        redirect('/admin/dashboard')
    }

    redirect('/user/dashboard')

}
import { AuthUser } from "@/types/usertype";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashBoard() {

    const cookieStore = await cookies()

    const refreshToken = cookieStore.get('refreshToken')?.value

    if (!refreshToken) {
        redirect('/auth/login')
    }

    let payload: AuthUser;

    try {
        const secret = new TextEncoder().encode(process.env.REFRESH_TOKEN)

        const result = await jwtVerify<AuthUser>(refreshToken, secret)

        payload = result.payload

    }
    catch (error) {
        console.log("Dashboard auth error:", error);
        redirect('/auth/login')
    }

    if (payload.role === 'USER') {
        redirect('/user/dashboard')
    }

    if (payload.role === 'ADMIN') {
        redirect('/admin/dashboard')
    }

    redirect('/auth/login')
}
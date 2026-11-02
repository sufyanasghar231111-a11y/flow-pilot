import { NextRequest } from "next/server"
import { getAuthUser } from "./auth"
import { AppError } from "@/utils/AppError"

type Role = 'USER' | 'ADMIN'


export async function checkrole(request: NextRequest, roles: Role | Role[]) {

    const user = await getAuthUser(request)

    const allowedRole = Array.isArray(roles) ? roles : [roles]

    if (!user) {
        throw new AppError("Unauthorized", 401)
    }

    if (!allowedRole.includes(user.role)) {
        throw new AppError('forbidden', 403)
    }

    return user

}
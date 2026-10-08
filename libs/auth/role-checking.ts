import { NextRequest } from "next/server"
import { getAuthUser } from "./auth"
import { AppError } from "@/utils/AppError"


export async function checkrole(request:NextRequest, role: 'USER' | "ADMIN" ){

    const user = await getAuthUser(request)

    if(!user){
        throw new AppError("Unauthorized", 401)
    }

    if(user?.role !== role){
        throw new AppError('forbidden', 403)
    }

    return user

}
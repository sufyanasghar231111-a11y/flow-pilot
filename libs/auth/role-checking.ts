import { NextRequest } from "next/server"
import { getAuthUser } from "./auth"


export async function checkrole(request:NextRequest, role: 'USER' | "ADMIN" ){

    const user = await getAuthUser(request)

    if(!user){
        throw new Error("Unauthorized")
    }

    if(user?.role !== role){
        throw new Error('forbidden')
    }

    return user

}
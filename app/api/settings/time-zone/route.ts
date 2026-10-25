import { checkrole } from "@/libs/auth/role-checking";
import { SettingService } from "@/services/Backend/setting.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function PATCH(request:NextRequest) {
    try{

        await checkrole(request, 'ADMIN')

        const body = await request.json()

        const timeZone = await SettingService.timeZoneSetting(request,body.timeZone, body.dateFormat)

        return Response.json(
            {
                timeZone,
                message:"Successful change time zone"
            },
            {
                status:200
            }
        )

    }
    catch(err){
        const message = err instanceof Error ? err.message: 'something went wrong'
        const status = err instanceof AppError ? err.statusCode : 500

        return Response.json(
            {
                message
            },
            {
                status
            }
        )
    }
}
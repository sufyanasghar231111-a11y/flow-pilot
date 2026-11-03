import { checkrole } from "@/libs/auth/role-checking";
import UserNotificationService from "@/services/Backend/user.notification.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        await checkrole(request, 'USER')

        const markAllRead = await UserNotificationService.MarkAllRead(request)

        return Response.json(
            {
                message:"Successful get",
                markAllRead
            },
            {
                status:200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something Went Wrong'
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
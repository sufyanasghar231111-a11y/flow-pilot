import { checkrole } from "@/libs/auth/role-checking";
import { NotificationService } from "@/services/Backend/notification.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'USER')

        const getNotification = await NotificationService.getNotificationByUser(request)

        return Response.json(
            {
                message: "Successful get notification",
                getNotification
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something Went Wrong"
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
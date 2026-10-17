
import { checkrole } from "@/libs/auth/role-checking";
import { NotificationService } from "@/services/Backend/notification.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ notificationid: string }> }) {
    try {
        await checkrole(request, 'ADMIN')
        const { notificationid } = await params
        const singleDelete = await NotificationService.deleteNotification(request, notificationid)

        return Response.json(
            {
                singleDelete,
                message: "Successful mark All"
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
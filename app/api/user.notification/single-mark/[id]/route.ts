import { checkrole } from "@/libs/auth/role-checking";
import UserNotificationService from "@/services/Backend/user.notification.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await checkrole(request, 'USER')

        const { id } = await params

        const singleMark = await UserNotificationService.SingleMark(request, id)

        return Response.json(
            {
                message: "Successful get",
                singleMark
            },
            {
                status: 200
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
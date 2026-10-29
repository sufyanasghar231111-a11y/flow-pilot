import { checkrole } from "@/libs/auth/role-checking";
import { UserAllService } from "@/services/Backend/user.All.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ taskid: string }> }) {
    try {
        await checkrole(request, 'USER')

        const { taskid } = await params
        const body = await request.json()

        const updateStatus = await UserAllService.updateStatus(
            request, taskid, body.status
        )

        return Response.json(
            {
                message: "Successful update",
                updateStatus
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong"
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
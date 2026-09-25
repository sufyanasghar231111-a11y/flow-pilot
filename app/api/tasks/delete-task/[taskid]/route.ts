import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ taskid: string }> }) {
    try {
        await checkrole(request, 'ADMIN')
        const { taskid } = await params

        const deleteTask = await taskService.deleteTask(
            taskid,
            request
        )

        return Response.json(

            {
                message: "Successful delete",
                deleteTask
            },
            {
                status: 201
            }
        )

    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something Went Wrong"

        return Response.json(
            {
                message
            },
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 : 500
            }
        )
    }
}
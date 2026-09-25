import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ taskid: string }> }) {
    try {

        await checkrole(request, 'ADMIN')
        const { taskid } = await params

        const body = await request.json()
        const TaskStatusUpdate = await taskService.updateTaskByStatus(
            taskid,
            body.status,
            request
        )

        return Response.json(
            {
                message: "Successful update",
                TaskStatusUpdate
            },
            {
                status: 201
            }
        )


    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong"

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
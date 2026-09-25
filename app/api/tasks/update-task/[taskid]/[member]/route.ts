import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";


export async function PATCH(request: NextRequest,
    { params }: { params: Promise<{ taskid: string, member: string }> }
) {

    try {

        await checkrole(request, 'ADMIN')
        const { taskid, member } = await params

        const assignedTask = await taskService.updateTaskByAssiging(
            taskid,
            member,
            request
        )

        return Response.json(
            {
                message: "Successful assign task",
                assignedTask
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
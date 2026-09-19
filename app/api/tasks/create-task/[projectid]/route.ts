import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest,
    { params }: { params: Promise<{ projectid: string }> }
) {
    try {

        await checkrole(request, 'ADMIN')

        const { projectid } = await params

        const body = await request.json()

        const createTask = await taskService.createTask(
            projectid,
            body.name,
            body.description,
            body.priority,
            request
        )

        return Response.json(
            {
                message: "Successful created task",
                createTask
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
            }
            ,
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 403 : 500
            }
        )
    }
}
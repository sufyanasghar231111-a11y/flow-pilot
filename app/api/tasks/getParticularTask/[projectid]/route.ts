import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest,
    { params }: { params: Promise<{ projectid: string }> }
) {

    try {

        await checkrole(request, 'ADMIN')
        const { projectid } = await params

        const getParticularTask = await taskService.getTaskById(
            projectid,
            request,
        )

        return Response.json(
            {
                message: "Successful get task by id",
                getParticularTask
            }, {
            status: 200
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
                    message === 'Unauthorized' || message === 'Invalid access token' ? 403 : 500
            }
        )
    }
}
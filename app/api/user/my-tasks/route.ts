import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {

        await checkrole(request, 'USER')

        const getAssignTask = await taskService.getAssignTasksByUser(
            request
        )

        return Response.json(
            {
                message: "Successful get",
                getAssignTask
            },
            {
                status: 200
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
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 : 500
            }
        )
    }
}
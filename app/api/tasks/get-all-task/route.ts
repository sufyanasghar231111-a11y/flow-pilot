import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {

        await checkrole(request, 'ADMIN')

        const getTasks = await taskService.getTask(
            request
        )

        return Response.json(
            {
                message: "Successful get",
                getTasks
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
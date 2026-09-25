import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const [completedTask, pendingTask, activeTask, newCompleted, newPending] = await taskService.countTask()

        return Response.json(
            {
                completedTask, pendingTask, activeTask, newCompleted, newPending
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
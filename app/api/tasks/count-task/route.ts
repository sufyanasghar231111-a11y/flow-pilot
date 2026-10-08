import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const [completedTask, pendingTask, activeTask, newCompleted, newPending, overDue] = await taskService.countTask(request)

        return Response.json(
            {
                completedTask, pendingTask, activeTask, newCompleted, newPending, overDue
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something Went Wrong"
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
import { checkrole } from "@/libs/auth/role-checking";
import { userService } from "@/services/Backend/user.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async  function GET(request: NextRequest) {
    try {

        await checkrole(request, 'USER')
        const [totalProject, taskAssign, pendingTask, taskCompleted, totalActive, totalComplete, totalPending,
            newMonthProject, newTask, newPendingTask, newCompletedTask
        ] = await userService.totalStat(request)

        return Response.json(
            {
                message:"successful get",
                totalProject, taskAssign, pendingTask, taskCompleted, totalActive, totalComplete, totalPending,
                newMonthProject, newTask, newPendingTask, newCompletedTask
            },
            {
                status:200
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
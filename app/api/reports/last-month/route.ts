import { checkrole } from "@/libs/auth/role-checking";
import { ReportService } from "@/services/Backend/reports.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const {percentageProject, percentageTask, percentageTeam, taskCompleted, projectCompleted} = await ReportService.lastMonthData(
            request
        )
        return Response.json(
            {
                message: "Successful get comparison",
                percentageProject, percentageTask, percentageTeam, taskCompleted, projectCompleted
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
import { checkrole } from "@/libs/auth/role-checking";
import { ReportService } from "@/services/Backend/reports.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {

    try {
        await checkrole(request, 'ADMIN')

        const { total, pending, isActive, completed, cancelled, percentageOfComplete, project, percentageOfPending, percentageOfIsActive, percentageOfCancelled, } = await ReportService.projectReport(
            request
        )

        return Response.json(
            {
                total, pending, isActive, completed, cancelled, percentageOfComplete, percentageOfPending, percentageOfIsActive, percentageOfCancelled, project
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something went Wrong'
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
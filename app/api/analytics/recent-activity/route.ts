import { checkrole } from "@/libs/auth/role-checking";
import { AnalyticService } from "@/services/Backend/Analytics";
import { AppError } from "@/utils/AppError";
import { ApiError } from "next/dist/server/api-utils";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const activities = await AnalyticService.recentActivity(
            request
        )

        return Response.json(
            {
                message: "Successful get recent activity",
                activities
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something Went Wrong'
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
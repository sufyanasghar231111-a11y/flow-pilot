import { checkrole } from "@/libs/auth/role-checking";
import { AnalyticService } from "@/services/Backend/Analytics";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try{

        await checkrole(request, 'ADMIN')
        const [high, medium, low] = await AnalyticService.taskPriority(
            request
        )

        return Response.json(
            {
                message:"Successful get",
                high, medium, low
            },
            {
                status:200
            }
        )

    }
    catch(err){
        const message = err instanceof Error ? err.message : 'something went wrong'

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
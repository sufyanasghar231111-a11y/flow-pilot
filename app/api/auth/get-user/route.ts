import { authService } from "@/services/Backend/auth.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const loginUser = await authService.loginUser(request)

        return Response.json(
            {
                message: "Successful get user",
                loginUser
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



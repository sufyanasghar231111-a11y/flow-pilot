import { checkrole } from "@/libs/auth/role-checking";
import { authService } from "@/services/Backend/auth.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const signedUrl = await authService.ProfileImage(request)

        return Response.json(
            {
                message: "Successfull load image",
                signedUrl
            },
            {
                status: 200
            }
        )

    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something went wrong'
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
import { checkrole } from "@/libs/auth/role-checking";
import { authService } from "@/services/Backend/auth.service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const formData = await request.formData()

        const username = formData.get('username')?.toString()
        const email = formData.get('email')?.toString()
        const file = formData.get('pfp')
        const pfp = file instanceof File ? file : undefined
        const removePfp = formData.get('removePfp') === 'true'

        const updateAdminProfile = await authService.updateProfile(
            request,
            username,
            email,
            pfp,
            removePfp
        )

        return Response.json(
            {
                updateAdminProfile
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
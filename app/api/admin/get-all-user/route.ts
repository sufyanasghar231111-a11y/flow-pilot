import { checkrole } from "@/libs/auth/role-checking";
import { AdminService } from "@/services/Backend/admin.service";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const users = await AdminService.getAllUser()

        return Response.json(
            {
                message: 'Successful get user',
                users
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something Went wrong'

        return Response.json(
            {
                message
            },
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 : 500
            }
        )
    }
}
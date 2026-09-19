import { checkrole } from "@/libs/auth/role-checking";
import { userService } from "@/services/Backend/user.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {

        await checkrole(request, 'USER')

        const getProject = await userService.getMyProject(request)
        return Response.json(
            {
                message: "Successful get project by user",
                getProject
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong"
        return Response.json(
            {
                message
            }
            ,
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 : 500
            }
        )
    }
}
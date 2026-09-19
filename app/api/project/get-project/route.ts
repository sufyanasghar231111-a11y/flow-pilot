import { checkrole } from "@/libs/auth/role-checking";
import { projectService } from "@/services/Backend/project.service";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest) {
    try {

        await checkrole(request, 'ADMIN')

        const findProject = await projectService.getProjectByAdmin(request)

        return Response.json(
            {
                message: "Successful get",
                findProject
            },
            {
                status: 200
            }
        )

    }
    catch (err) {

         const message = err instanceof Error ? err.message : 'Something Went Wrong'

        return Response.json(
            {
                message
            },
            {
                status:message === 'forbidden' ? 403:
                message === 'Unauthorized' || message === 'Invalid access token' ? 401 :
                500
            }
        )
    }

}
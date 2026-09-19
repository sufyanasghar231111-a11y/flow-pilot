import { checkrole } from "@/libs/auth/role-checking";
import { projectService } from "@/services/Backend/project.service";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest, { params }: { params: Promise<{ projectid: string }> }) {
    try {
        await checkrole(request, 'ADMIN')
        const { projectid } = await params
        const singleProject = await projectService.singleProject(projectid, request)

        return Response.json(
            {
                message: "Successful get",
                singleProject
            },
            {
                status: 200
            }
        )

    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something Went Wrong"
        return Response.json(
            {
                message
            }
            ,
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 403 : 500
            }
        )
    }
}
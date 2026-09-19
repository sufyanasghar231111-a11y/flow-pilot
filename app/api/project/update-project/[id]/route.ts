import { checkrole } from "@/libs/auth/role-checking";
import { projectService } from "@/services/Backend/project.service";
import { NextRequest } from "next/server";


export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {

        await checkrole(request, 'ADMIN')

        const { id } = await params

        const body = await request.json()

        const updateProject = await projectService.updateProject(
            id,
            body.name,
            body.description,
            new Date(body.deadline),
            request
        )

        return Response.json(
            {
                message:"Successful update",
                updateProject
            },
            {
                status:201
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
import { checkrole } from "@/libs/auth/role-checking";
import { projectService } from "@/services/Backend/project.service";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {

        await checkrole(request, "ADMIN")
        const { id } = await params

        const deleteProject = await projectService.deleteProject(
            id,
            request
        )
      return Response.json(
            {
                message: "Successful delete project",
                deleteProject
            }, {
            status: 201
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
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 : 500
            }
        )
    }

}
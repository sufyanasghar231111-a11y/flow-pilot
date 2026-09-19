import { checkrole } from "@/libs/auth/role-checking";
import { projectService } from "@/services/Backend/project.service";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    try {

        await checkrole(request, "ADMIN")

        const body = await request.json()

        const creatProject = await projectService.projectCreation(
            body.name,
            body.description,
            new Date(body.startDate),
            new Date(body.deadline),
            body.status,
            request
        )

        return Response.json(
            {
                message: "Successful create project",
                creatProject
            },
            {
                status: 201
            }
        )

    } catch (err) {
        const message = err instanceof Error ? err.message : 'Something Went Wrong'

        return Response.json(
            {
                message
            },
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 :
                        500
            }
        )
    }

}
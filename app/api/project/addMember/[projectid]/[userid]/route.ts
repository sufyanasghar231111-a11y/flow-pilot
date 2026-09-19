import { checkrole } from "@/libs/auth/role-checking";
import { projectService } from "@/services/Backend/project.service";
import { NextRequest } from "next/server";


export async function POST(request: NextRequest,
    { params }: { params: Promise<{ projectid: string, userid:string }> }
) {
    try {

        await checkrole(request, 'ADMIN')
        const { projectid, userid } = await params

        const addMember = await projectService.addMember(
            projectid,
            userid,
            request
        )

        return Response.json(
            {
                message: "Successful add member",
                addMember
            },
            {
                status: 201
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
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 :
                        500
            }
        )
    }
}
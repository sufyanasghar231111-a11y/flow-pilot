import { checkrole } from "@/libs/auth/role-checking";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";


export async function PATCH(request: NextRequest,
    { params }: { params: Promise<{ taskid: string, memberid: string }> }
) {

    try {

        await checkrole(request, 'ADMIN')

        const { taskid, memberid } = await params

        const removeUser = await taskService.removeMemberFromTask(
            taskid,
            memberid,
            request
        )

        return Response.json(
            {
                message:"Successful remove",
                removeUser
            }, {
                status:201
        }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong"

        return Response.json(
            {
                message
            },
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 403 : 500
            }
        )
    }
}
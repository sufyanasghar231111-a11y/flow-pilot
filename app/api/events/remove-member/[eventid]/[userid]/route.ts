import { checkrole } from "@/libs/auth/role-checking";
import { EventService } from "@/services/Backend/event.service";
import { taskService } from "@/services/Backend/task.service";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ eventid: string, userid: string }> }) {
    try {
        await checkrole(request, 'ADMIN')

        const { eventid, userid } = await params

        const removeMember = await EventService.removeMember(
            eventid, userid, request
        )

        return Response.json(
            {
                message: "Successful add member",
                removeMember
            },
            {
                status: 201
            }
        )

    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something Went Wrong"

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
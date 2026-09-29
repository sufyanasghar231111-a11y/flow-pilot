import { checkrole } from "@/libs/auth/role-checking";
import { EventService } from "@/services/Backend/event.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ eventid: string }> }) {
    try {
        await checkrole(request, 'ADMIN')

        const { eventid } = await params

        const event = await EventService.singleEvent(
            eventid,
            request
        )

        return Response.json(
            {
                message: "Successful get",
                event
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
            },
            {
                status: message === 'forbidden' ? 403 :
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 : 500
            }
        )
    }
}
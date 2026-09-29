import { checkrole } from "@/libs/auth/role-checking";
import { EventService } from "@/services/Backend/event.service";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await checkrole(request, 'ADMIN')

        const body = await request.json()

        const createEvent = await EventService.createEvent(
            body.name,
            new Date(body.date),
            new Date(body.startTime),
            new Date(body.endTime),
            body.type,
            request
        )


        return Response.json(
            {
                message: 'successful create event',
                createEvent
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
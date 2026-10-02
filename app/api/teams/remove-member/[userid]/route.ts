import { checkrole } from "@/libs/auth/role-checking";
import { TeamService } from "@/services/Backend/team.service";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ userid: string }> }) {
    try {
        await checkrole(request, 'ADMIN')

        const { userid } = await params

        const removeMember = await TeamService.removeMemberTeam(
            request,
            userid
        )

        return Response.json(
            {
                message:"Successful get",
                removeMember
            },
            {
                status:201
            }
        )

    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something Went wrong'

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
import { checkrole } from "@/libs/auth/role-checking";
import { memberService } from "@/services/Backend/member.service";
import { NextRequest } from "next/server";

export async function DELETE(request: NextRequest,
    { params }: { params: Promise<{ projectid: string, member: string }> }
) {
    try {

        await checkrole(request, 'ADMIN')
        const { projectid, member } = await params

        const deleteMember = await memberService.removeMember(
            projectid, member
        )

        return Response.json(
            {
                message: "Successful remove member",
                deleteMember
            }, {
            status: 201
        }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong"
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
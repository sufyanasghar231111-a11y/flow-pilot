import { checkrole } from "@/libs/auth/role-checking";
import { memberService } from "@/services/Backend/member.service";
import { NextRequest } from "next/server";

export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ projectid: string; member: string }> }
) {

    try {

        await checkrole(request, "ADMIN")

        const { projectid, member } = await params

        const addmember = await memberService.createMember(
            projectid,
            member
        )

        return Response.json(
            {
                message: "Successful create member",
                addmember
            },
            {
                status: 201
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
                    message === 'Unauthorized' || message === 'Invalid access token' ? 401 :
                        500
            }
        )
    }

}
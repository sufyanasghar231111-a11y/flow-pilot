import { checkrole } from "@/libs/auth/role-checking";
import { memberService } from "@/services/Backend/member.service";
import { NextRequest } from "next/server";


export async function GET(request: NextRequest,
    { params }: { params: Promise<{ projectid: string }> }) {
    try {

        await checkrole(request, 'ADMIN')

        const { projectid } = await params

        const getMember = await memberService.getMember(
            projectid
        )

        return Response.json(
            {
                message: "Successful get member",
                getMember
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : "Something went wrong "

        return Response.json(
            {
                message
            }, {
            status: 500
        }
        )
    }
}
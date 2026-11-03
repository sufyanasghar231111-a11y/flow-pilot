import { checkrole } from "@/libs/auth/role-checking";
import { UserSearch } from "@/services/Backend/usersearch-service";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        await checkrole(request, 'USER')

        const usersearch = await UserSearch.UserSearch(request)

        return Response.json(
            {
                message: "Successful get",
                usersearch
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        const message = err instanceof Error ? err.message : 'Something Went Wrong'
        const status = err instanceof AppError ? err.statusCode : 500

        return Response.json(
            {
                message
            },
            {
                status
            }
        )

    }
}
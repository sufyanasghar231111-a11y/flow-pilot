import { authService } from "@/services/Backend/auth.service";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const loginUser = await authService.loginUser(request)

        return Response.json(
            {
                message: "Successful get user",
                loginUser
            },
            {
                status: 200
            }
        )
    }
    catch (err) {
        return Response.json(
            {
                message: err instanceof Error ?
                    err.message : "Something Went Wrong "
            },
            {
                status: err instanceof Error && err.message === "Invalid access token"
                    ? 401
                    : 500
            }
        )
    }

}



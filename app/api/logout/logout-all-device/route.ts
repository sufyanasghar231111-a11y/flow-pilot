import { logoutService } from "@/services/Backend/logout.service";

export async function GET() {
    try {
        const session = await logoutService.logoutAllDevice()

        return Response.json(
            {
                message: "Successful logout",
                session
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
                    err.message : "Something went wrong"
            },
            {
                status: 500
            }
        )
    }

}
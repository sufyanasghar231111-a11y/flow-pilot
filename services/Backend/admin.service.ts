import prisma from "@/libs/db";
import { NextRequest } from "next/server";


export class AdminService {

    static async getAllUser(request: NextRequest) {

        const { searchParams } = new URL(request.url)
        const page = Number(searchParams.get('page')) || 1
        const limit = 8
        const skip = (page - 1) * limit

        const users = await prisma.user.findMany(
            {
                where: {
                    role: 'USER'
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,

                },
                skip,
                take: limit
            }
        )

        return users
    }

}
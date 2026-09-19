import prisma from "@/libs/db";


export class AdminService {

    static async getAllUser() {


        const users = await prisma.user.findMany(
            {
                where: {
                    role:'USER'
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    role: true,

                }
            }
        )

        return users
    }

}
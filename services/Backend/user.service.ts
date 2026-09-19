import { NextRequest } from "next/server";
import { getAuthUser } from "../../libs/auth/auth";
import prisma from "../../libs/db";

export const userService = {

    async getMyProject(request: NextRequest) {
        const user = await getAuthUser(request)

        const getProject = await prisma.projectMember.findMany(
            {
                where: {
                    userId: user.userId
                },

                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    },

                    project: true
                },

            }
        )

        return {
            user: getProject[0]?.user,
            project: getProject.map(elem => elem.project)
        }
    },

    async totalUser() {

        const now = new Date()
        const currentMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const [totalUser, newThisMonth] = await Promise.all([
            prisma.user.count(
                {
                    where: {
                        role: 'USER'
                    }
                }
            ),

            prisma.user.count(
                {
                    where: {
                        role: 'USER',
                        createdAt: {
                            gte: currentMonth
                        }
                    }
                }
            )

        ])

        return [totalUser, newThisMonth]
    }

}
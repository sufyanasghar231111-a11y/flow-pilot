import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export class TeamService {

    static async AddTeamMember(request: NextRequest, userid: string) {
        const admin = await getAuthUser(request)

        const find = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!find) {
            throw new Error('admin is not found')
        }

        const findMember = await prisma.teamMember.findFirst(
            {
                where: {
                    userId: userid
                }
            }
        )

        if (findMember) {
            throw new Error("Member is already exist")
        }

        const addMember = await prisma.teamMember.create(
            {
                data: {
                    userId: userid,
                    adminId: admin.userId
                }
            }
        )
        return addMember
    }

    static async getTeamMember(request: NextRequest) {
        const admin = await getAuthUser(request)

        const find = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                },

            }
        )

        if (!find) {
            throw new Error('Admin is not found')
        }

        const { searchParams } = new URL(request.url)
        const startDate = searchParams.get('startdate')
        const enddate = searchParams.get('enddate')

        const [getMember] = await Promise.all(
            [
                prisma.teamMember.findMany(
                    {
                        where: {
                            adminId: admin.userId,
                            ...(startDate || enddate ? {
                                createdAt: {

                                    ...(startDate ? { gte: new Date(startDate) } : {}),
                                    ...(enddate ? {
                                        lt: new Date(
                                            new Date(enddate).getTime() + 24 * 60 * 60 * 1000
                                        )
                                    } : {})

                                }
                            } : {})
                        },
                        select: {
                            id: true,
                            createdAt: true,
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    email: true,
                                    role: true
                                }

                            },
                            // byAdmin: {
                            //     select: {
                            //         id: true,
                            //         username: true,
                            //         email: true
                            //     }

                            // },
                            assignedTask: {
                                select: {
                                    id: true,
                                    name: true
                                }
                            }
                        },
                        orderBy: {
                            createdAt: 'desc'
                        }
                    }
                ),   
            ]
        )

        const totalMember = getMember.filter(elem => elem.user.role === 'USER').length
        const memberWithTask = getMember.filter(elem => elem.assignedTask.length > 0).length
        const memberWithOutTask = getMember.filter(elem => elem.assignedTask.length === 0).length
        const totalTask = getMember.reduce((total, user) => total + user.assignedTask.length, 0)

        return {
            totalMember,
            memberWithTask,
            memberWithOutTask,
            totalTask,
            // admins: getMember[0].byAdmin,
            member: getMember.map(elem => ({
                ...elem.user,
                createdAt: elem.createdAt,
                assignedTask: elem.assignedTask
            }))
        }

    }

    static async removeMemberTeam(request: NextRequest, userid: string,) {
        const admin = await getAuthUser(request)

        const find = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!find) {
            throw new Error('Admin is not found')
        }


        const removeMember = await prisma.teamMember.delete(
            {
                where: {
                    userId_adminId: {
                        userId: userid,
                        adminId: admin.userId,
                    }
                },
            }
        )
        return removeMember
    }

    static async countMember(request: NextRequest) {
        const admin = await getAuthUser(request)

        const find = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!find) {
            throw new Error('Admin is not found')
        }

        const now = new Date()
        const newThisMonth = new Date(now.getFullYear(), now.getMonth(), 1)

        const [totalMember, newTotal] = await Promise.all([
            prisma.teamMember.count(),
            prisma.teamMember.count({
                where: {
                    createdAt: {
                        gte: newThisMonth
                    }
                }
            })
        ])

        return [totalMember, newTotal]

    }

}
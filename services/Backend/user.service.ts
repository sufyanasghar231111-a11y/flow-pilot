import { NextRequest } from "next/server";
import { getAuthUser } from "../../libs/auth/auth";
import prisma from "../../libs/db";

export const userService = {

    async getMyProject(request: NextRequest) {
        const user = await getAuthUser(request)

        const getProject = await prisma.projectMember.findMany(
            {
                where: {
                    teamMemberId: user.userId
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

    async totalUser(request: NextRequest) {
        const admin = await getAuthUser(request)

        const now = new Date()
        const currentMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const [totalUser, newThisMonth] = await Promise.all([
            prisma.teamMember.count(
                {
                    where: {
                        user: {
                            role: 'USER'
                        },
                        adminId: admin.userId
                    }
                }
            ),

            prisma.teamMember.count(
                {
                    where: {
                        user: {
                            role: 'USER'
                        },
                        createdAt: {
                            gte: currentMonth
                        },
                        adminId: admin.userId
                    }
                }
            )

        ])

        return [totalUser, newThisMonth]
    },

    async totalStat(request: NextRequest) {
        const user = await getAuthUser(request)
        const now = new Date()
        const startofMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const [totalProject, taskAssign, pendingTask, taskCompleted, totalActive, totalComplete, totalPending, newMonthProject, newTask, newPendingTask, newCompletedTask] = await Promise.all([
            prisma.projectMember.count(
                {
                    where: {
                        user: {
                            user: {
                                id: user.userId
                            }
                        }
                    }
                }
            ),

            prisma.task.count(
                {
                    where: {
                        assignedTo: {
                            user: {
                                id: user.userId
                            }
                        },
                    }
                }
            ),

            prisma.task.count(
                {
                    where: {
                        assignedTo: {
                            user: {
                                id: user.userId
                            }
                        },
                        status: 'TODO'
                    }
                }
            ),

            prisma.task.count(
                {
                    where: {
                        assignedTo: {
                            user: {
                                id: user.userId
                            }
                        },
                        status: 'DONE'
                    }
                }
            ),

            prisma.projectMember.count(
                {
                    where: {
                        project: {
                            status: 'ACTIVE'
                        },
                        user: {
                            user: {
                                id: user.userId
                            }
                        }
                    }
                }
            ),

            prisma.projectMember.count(
                {
                    where: {
                        project: {
                            status: 'COMPLETE'
                        },
                        user: {
                            user: {
                                id: user.userId
                            }
                        }
                    }
                }
            ),

            prisma.projectMember.count(
                {
                    where: {
                        project: {
                            status: 'PENDING'
                        },
                        user: {
                            user: {
                                id: user.userId
                            }
                        }
                    }
                }
            ),

            prisma.projectMember.count(
                {
                    where:{
                        user:{
                            user:{
                                id:user.userId
                            }
                        },
                        createdAt:{
                            gte:startofMonth
                        }
                    }
                }
            ),

            prisma.task.count(
                {
                    where:{
                        assignedTo:{
                            user:{
                                id:user.userId
                            }
                        },
                        createdAt:{
                            gte:startofMonth
                        }
                    }
                }
            ),

            prisma.task.count(
                {
                    where:{
                        assignedTo:{
                            user:{
                                id:user.userId
                            }
                        },
                        createdAt:{
                            gte:startofMonth
                        },
                        status:'TODO'
                    }
                }
            ),

            prisma.task.count(
                {
                    where:{
                        assignedTo:{
                            user:{
                                id:user.userId
                            }
                        },
                        createdAt:{
                            gte:startofMonth
                        },
                        status:'DONE'
                    }
                }
            ),

        ])

        return [totalProject, taskAssign, pendingTask, taskCompleted, totalActive, totalComplete, totalPending,
            newMonthProject, newTask, newPendingTask, newCompletedTask
        ]

    }

}
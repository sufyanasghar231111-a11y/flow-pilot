import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";

import { NextRequest } from "next/server";

export class AnalyticService {

    static async dailyProject(request: NextRequest) {
        const admin = await getAuthUser(request)

        const now = new Date()

        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        )

        const [resultByCreated, resultByComplete] = await Promise.all([

            prisma.project.findMany(
                {
                    where: {
                        adminId: admin.userId,
                        createdAt: {
                            gte: startOfMonth,
                            lt: endOfMonth
                        }
                    },
                    select: {
                        createdAt: true
                    }

                }
            ),

            prisma.project.findMany(
                {
                    where: {
                        adminId: admin.userId,
                        completedAt: {
                            gte: startOfMonth,
                            lt: endOfMonth
                        }
                    },
                    select: {
                        completedAt: true
                    }
                }
            )

        ])

        const dailyData: Record<string, number> = {}
        const dailyCompleted: Record<string, number> = {}

        const daysInMonth = now.getDate()


        for (let i = 1; i <= daysInMonth; i++) {

            const date = new Date(
                now.getFullYear(),
                now.getMonth(),
                i
            )

            const key = date.toLocaleDateString('en-US', {
                month: 'short',
                day: "numeric"
            })

            dailyData[key] = 0
            dailyCompleted[key] = 0
        }

        resultByCreated.forEach((project) => {
            const date = project.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })

            dailyData[date] = (dailyData[date] || 0) + 1
        })

        resultByComplete.forEach((project) => {
            if (!project.completedAt) return

            const date = project.completedAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })

            dailyCompleted[date] = (dailyCompleted[date] || 0) + 1

        })

        return { dailyData, dailyCompleted }

    }

    static async dailyTask(request: NextRequest) {
        const admin = await getAuthUser(request)

        const now = new Date()
        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const endOfMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        )

        const [resultByCreated, resultByCompleted] = await Promise.all([
            prisma.task.findMany(
                {
                    where: {
                        createdById: admin.userId,
                        createdAt: {
                            gte: startOfMonth,
                            lt: endOfMonth
                        }
                    },
                    select: {
                        createdAt: true
                    }
                }
            ),

            prisma.task.findMany(
                {
                    where: {
                        createdById: admin.userId,
                        completedAt: {
                            gte: startOfMonth,
                            lt: endOfMonth
                        }
                    },
                    select: {
                        completedAt: true
                    }
                }
            )
        ])

        const dailyCreated: Record<string, number> = {}

        const dailyCompleted: Record<string, number> = {}

        const getInMonth = now.getDate()

        for (let i = 1; i <= getInMonth; i++) {

            const date = new Date(
                now.getFullYear(),
                now.getMonth(),
                i
            )

            const key = date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })

            dailyCreated[key] = 0
            dailyCompleted[key] = 0
        }

        resultByCreated.forEach((task) => {
            const date = task.createdAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })

            dailyCreated[date] = (dailyCreated[date] || 0) + 1
        })

        resultByCompleted.forEach((task) => {
            if (!task.completedAt) return

            const date = task.completedAt.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric'
            })

            dailyCompleted[date] = (dailyCompleted[date] || 0) + 1
        })

        return { dailyCreated, dailyCompleted }
    }

    static async overDueProject(request: NextRequest) {
        const admin = await getAuthUser(request)

        const overDue = await prisma.project.count(
            {
                where: {
                    deadline: {
                        lt: new Date()
                    },
                    adminId: admin.userId,
                    status: {
                        not: 'COMPLETE'
                    }
                }
            }
        )

        return overDue
    }

    static async taskPriority(request: NextRequest) {
        const admin = await getAuthUser(request)

        const [high, medium, low] = await Promise.all([
            prisma.task.count(
                {
                    where: {
                        createdById: admin.userId,
                        priority: 'HIGH'
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        createdById: admin.userId,
                        priority: "MEDIUM"
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        createdById: admin.userId,
                        priority: "LOW"
                    }
                }
            ),
        ])

        return [high, medium, low]
    }

    static async WeeklyActivity(request: NextRequest) {
        const admin = await getAuthUser(request)

        const now = new Date()

        const day = now.getDay()

        const diff = day === 0 ? 6 : day - 1

        const startOfWeek = new Date(now)
        startOfWeek.setDate(now.getDate() - diff)
        startOfWeek.setHours(0, 0, 0, 0)

        const endOfWeek = new Date(startOfWeek)
        endOfWeek.setDate(startOfWeek.getDate() + 7)
        endOfWeek.setHours(0, 0, 0, 0)

        const [completedAt, createdAt] = await Promise.all([

            prisma.task.findMany(
                {
                    where: {
                        createdById: admin.userId,
                        completedAt: {
                            gte: startOfWeek,
                            lt: endOfWeek
                        }
                    },
                    select: {
                        completedAt: true
                    }
                }
            ),

            prisma.task.findMany(
                {
                    where: {
                        createdById: admin.userId,
                        createdAt: {
                            gte: startOfWeek,
                            lt: endOfWeek
                        }
                    },
                    select: {
                        createdAt: true
                    }
                }
            )
        ])

        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

        const completedResult = {
            Mon: 0,
            Tue: 0,
            Wed: 0,
            Thu: 0,
            Fri: 0,
            Sat: 0,
            Sun: 0
        }

        const createdResult = {
            Mon: 0,
            Tue: 0,
            Wed: 0,
            Thu: 0,
            Fri: 0,
            Sat: 0,
            Sun: 0
        }

        completedAt.forEach((data) => {
            if (data.completedAt) {
                const day = days[data.completedAt?.getDay()]
                completedResult[day as keyof typeof completedResult]++
            }
        })

        createdAt.forEach((data) => {
            const day = days[data.createdAt.getDay()]
            createdResult[day as keyof typeof createdResult]++
        })

        return { completedResult, createdResult }

    }

    static async recentActivity(request: NextRequest) {
        const admin = await getAuthUser(request)

        const [member, project, task] = await Promise.all([
            prisma.teamMember.findMany(
                {
                    where: {
                        adminId: admin.userId,
                    },
                    select: {
                        createdAt: true,
                        user: {
                            select: {
                                id: true,
                                username: true
                            }
                        }
                    }
                }
            ),
            prisma.project.findMany(
                {
                    where: {
                        adminId: admin.userId
                    },
                    select: {
                        createdAt: true,
                        completedAt: true,
                        name: true,
                        projectmembers: {
                            select: {
                                user: {
                                    select: {
                                        user: {
                                            select: {
                                                username: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            ),

            prisma.task.findMany(
                {
                    where: {
                        createdById: admin.userId
                    },
                    select: {
                        createdAt: true,
                        completedAt: true,
                        name: true,
                        assignedTo: {
                            select: {
                                user: {
                                    select: {
                                        username: true
                                    }
                                }
                            }
                        }
                    }
                }
            )
        ])

        const activities = [
            ...member.map(elem => ({
                data: elem.createdAt,
                user: elem.user.username,
                id: elem.user.id,
                types: 'Member_joined'
            })),

            ...project.flatMap((elem) => [
                {
                    types: 'project_Creation',
                    data: elem.createdAt,
                    name: elem.name
                },

                ...(elem.completedAt ? [{
                    types: 'project_completed',
                    data: elem.completedAt,
                    name: elem.name
                }] : [])
            ]),

            ...task.flatMap((elem) => [
                {
                    types: 'taskCreation',
                    data: elem.createdAt,
                    name: elem.name,
                    username:elem.assignedTo
                },

                ...(elem.completedAt ? [{
                    types: 'taskCompletion',
                    data: elem.completedAt,
                    name: elem.name,
                    username:elem.assignedTo
                }] : [])
            ])


        ].sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime())

        return activities
    }

}
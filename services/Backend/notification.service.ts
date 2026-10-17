import { NotificationType } from "@/app/generated/prisma/enums";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export class NotificationService {

    static async getNotificationByUser(request: NextRequest) {
        const user = await getAuthUser(request)

        const [taskUpdate, projectUpdate, taskAssigned, taskOverdue, teamMember, projectMember, taskCompleted] = await Promise.all([

            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: 'TASK_UPDATED'
                    }
                }
            ),

            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: 'PROJECT_UPDATED'
                    }
                }
            ),

            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: 'TASK_ASSIGNED'
                    }
                }
            ),

            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: 'TASK_OVERDUE'
                    }
                }
            ),

            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: 'TEAM_MEMBER_ADDED'
                    }
                }
            ),
            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: 'ADD_PROJECT_MEMBER'
                    }
                }
            ),
            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: 'TASK_COMPLETED'
                    }
                }
            ),

        ])

        const getNotification = [
            ...taskUpdate.map((elem) => ({
                ...elem
            })),
            ...projectUpdate.map((elem) => ({
                ...elem
            })),
            ...taskAssigned.map((elem) => ({
                ...elem
            })),
            ...taskOverdue.map((elem) => ({
                ...elem
            })),
            ...teamMember.map((elem) => ({
                ...elem
            })),
            ...projectMember.map((elem) => ({
                ...elem
            })),
            ...taskCompleted.map((elem) => ({
                ...elem
            })),
        ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

        return getNotification
    }

    static async getNotificationByAdmin(request: NextRequest) {
        const admin = await getAuthUser(request)

        const { searchParams } = new URL(request.url)
        const page = Number(searchParams.get('page')) || 1
        const type = searchParams.get('type')
        const startDate = searchParams.get('startdate')
        const enddate = searchParams.get('enddate')

        const limit = 8
        const skip = (page - 1) * limit


        const getNotification = await prisma.notification.findMany({
            where: {
                adminId: admin.userId,
                type: {
                    in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                },
                ...(startDate || enddate ? {
                    createdAt: {
                        ...(startDate ? {
                            gte: new Date(startDate)
                        } : {}),
                        ...(enddate ? {
                            lt: new Date(
                                new Date(enddate).getTime() + 24 * 60 * 60 * 1000
                            )
                        } : {})
                    }
                } : {}),
                ...(type && type !== 'All' ? {
                    type: type as NotificationType
                } : {})
            },
            select: {
                id: true,
                type: true,
                title: true,
                message: true,
                isRead: true,
                projectId: true,
                taskId: true,
                eventId: true,
                createdAt: true,
                admin: {
                    select: {
                        username: true
                    }
                },
                user: {
                    select: {
                        username: true
                    }
                }
            },
            skip,
            take: limit,
            orderBy: {
                createdAt: 'desc'
            }
        })

        return getNotification
    }

    static async compare(request: NextRequest) {
        const admin = await getAuthUser(request)

        const now = new Date()
        const day = now.getDay()
        const diff = day === 0 ? 6 : day - 1

        const currentWeek = new Date(now)
        currentWeek.setDate(now.getDate() - diff)
        currentWeek.setHours(0, 0, 0, 0)

        const startOfLastWeek = new Date(currentWeek)
        startOfLastWeek.setDate(currentWeek.getDate() - 7)

        const startOfNextWeek = new Date(currentWeek)
        startOfNextWeek.setDate(currentWeek.getDate() + 7)

        const today = new Date(now)
        today.setHours(0, 0, 0, 0)

        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)

        const [totalLastWeek, totalCurrenttWeek, totalUnReadLastWeek, totalUnReadCurrentWeek, totalReadLastWeek, totalReadCurrentWeek, totalYesterday, totalToday] = await Promise.all([

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        createdAt: {
                            gte: startOfLastWeek,
                            lt: currentWeek
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        createdAt: {
                            gte: currentWeek,
                            lt: startOfNextWeek
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        isRead: false,
                        createdAt: {
                            gte: startOfLastWeek,
                            lt: currentWeek
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        isRead: false,
                        createdAt: {
                            gte: currentWeek,
                            lt: startOfNextWeek
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        isRead: true,
                        createdAt: {
                            gte: startOfLastWeek,
                            lt: currentWeek
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        isRead: true,
                        createdAt: {
                            gte: currentWeek,
                            lt: startOfNextWeek
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        createdAt: {
                            gte: yesterday,
                            lt: today
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        adminId: admin.userId,
                        createdAt: {
                            gte: today,
                            lt: tomorrow
                        },
                        type: {
                            in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                        }
                    }
                }
            ),

        ])

        const [totalNotification, totalread, totalunread, totaltoday, totalTaskComplete, totalProjectDeadline, totalTaskDeadline, eventReminder] = await Promise.all([

            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    type: {
                        in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                    }
                }
            }),

            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    isRead: true,
                    type: {
                        in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                    }
                }
            }),

            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    isRead: false,
                    type: {
                        in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                    }
                }
            }),

            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    createdAt: {
                        gte: today,
                        lt: tomorrow
                    },
                    type: {
                        in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                    }
                }
            }),


            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    type: 'TASK_COMPLETED'
                }
            }),
            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    type: 'PROJECT_DEADLINE'
                }
            }),
            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    type: 'TASK_OVERDUE'
                }
            }),
            prisma.notification.count({
                where: {
                    adminId: admin.userId,
                    type: 'EVENT_REMINDER'
                }
            }),


        ])


        const totalComparePercentage = totalLastWeek === 0 ? 100 : (((totalCurrenttWeek - totalLastWeek) / totalLastWeek) * 100).toFixed(0)
        const totalUnReadComparePercentage = totalUnReadLastWeek === 0 ? totalUnReadCurrentWeek > 0 ? 100 : 0 : (((totalUnReadCurrentWeek - totalUnReadLastWeek) / totalUnReadLastWeek) * 100).toFixed(0)
        const totalReadComparePercentage = totalReadLastWeek === 0 ? totalReadCurrentWeek > 0 ? 100 : 0 : (((totalReadCurrentWeek - totalReadLastWeek) / totalReadLastWeek) * 100).toFixed(0)
        const totalTodayPercentage = totalYesterday === 0 ? totalToday > 0 ? 100 : 0 : (((totalToday - totalYesterday) / totalYesterday) * 100).toFixed(0)

        return {
            totalComparePercentage, totalUnReadComparePercentage, totalReadComparePercentage, totalTodayPercentage,
            totalNotification, totalread, totalunread, totaltoday, totalTaskComplete, totalProjectDeadline, totalTaskDeadline, eventReminder
        }
    }

    static async markAllRead(request: NextRequest) {
        const admin = await getAuthUser(request)

        const markAllRead = await prisma.notification.updateMany(
            {
                where: {
                    adminId: admin.userId,
                    isRead: false,
                    type: {
                        in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                    },
                },
                data: {
                    isRead: true
                }
            }
        )

        return markAllRead
    }

    static async markSingle(request: NextRequest, notificationid: string) {
        const admin = await getAuthUser(request)
        const singleMark = await prisma.notification.update(
            {
                where: {
                    id: notificationid,
                    adminId: admin.userId,
                    isRead: false,
                    type: {
                        in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                    },

                },
                data: {
                    isRead: true
                }
            }
        )

        return singleMark
    }

    static async deleteNotification(request: NextRequest, notificationid: string) {
        const admin = await getAuthUser(request)
        const singleDelete = await prisma.notification.delete(
            {
                where: {
                    id: notificationid,
                    adminId: admin.userId,
                    type: {
                        in: ['EVENT_REMINDER', 'PROJECT_COMPLETED', 'TASK_COMPLETED', 'TASK_OVERDUE', 'PROJECT_DEADLINE']
                    },
                }
            }
        )

        return singleDelete
    }


}
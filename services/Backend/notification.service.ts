import { NotificationType } from "@/app/generated/prisma/enums";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export class NotificationService {

    static async getNotificationByUser(request: NextRequest) {
        const user = await getAuthUser(request)
        const { searchParams } = new URL(request.url)
        const limit = 8
        const page = Number(searchParams.get('page')) || 1
        const type = searchParams.get('type')
        const startDate = searchParams.get('startDate')
        const endDate = searchParams.get('endDate')
        const skip = (page - 1) * limit

        const now = new Date()
        const day = now.getDay()
        const diff = day === 0 ? 6 : day - 1

        const currentWeek = new Date(now)
        currentWeek.setDate(now.getDate() - diff)
        currentWeek.setHours(0, 0, 0, 0)

        const lastWeek = new Date(currentWeek)
        lastWeek.setDate(currentWeek.getDate() - 7)

        const nextWeek = new Date(currentWeek)
        nextWeek.setDate(currentWeek.getDate() + 7)

        const today = new Date(now)
        today.setHours(0, 0, 0, 0)

        const yesterday = new Date(today)
        yesterday.setDate(today.getDate() - 1)

        const tomorrow = new Date(today)
        tomorrow.setDate(today.getDate() + 1)


        const [getNotification, totalNotification, read, notRead, todayData, totalVsLastWeek, totalVsNextWeek, readLastWeek, readNextWeek, notReadLastWeek, notReadNextWeek, yesterdayData, tomorrowData] = await Promise.all([

            prisma.notification.findMany(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        ...(type && type !== 'All' ? {
                            type: type as NotificationType
                        } : {}),
                        ...(startDate || endDate ?
                            {
                                createdAt: {
                                    ...(startDate ? {
                                        gte: new Date(startDate)
                                    } : {}),
                                    ...(endDate ? {
                                        lt: new Date(
                                            new Date(endDate).getTime() + 24 * 60 * 60 * 1000
                                        )
                                    } : {})
                                }
                            } : {}
                        )
                    },
                    orderBy: {
                        createdAt: 'desc'
                    },
                    skip,
                    take: limit
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        isRead: true
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        isRead: false
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: today,
                            lt: tomorrow
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: lastWeek,
                            lt: currentWeek
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: currentWeek,
                            lt: nextWeek
                        }
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: lastWeek,
                            lt: currentWeek
                        },
                        isRead: true
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: currentWeek,
                            lt: nextWeek
                        },
                        isRead: true
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: lastWeek,
                            lt: currentWeek
                        },
                        isRead: false
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: currentWeek,
                            lt: nextWeek
                        },
                        isRead: false
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: yesterday,
                            lt: today
                        },
                    }
                }
            ),

            prisma.notification.count(
                {
                    where: {
                        userId: user.userId,
                        type: {
                            in: ['TASK_UPDATED', 'PROJECT_UPDATED', 'TASK_ASSIGNED', 'TASK_OVERDUE', 'TEAM_MEMBER_ADDED', 'ADD_PROJECT_MEMBER']
                        },
                        createdAt: {
                            gte: today,
                            lt: tomorrow
                        }
                    }
                }
            ),


        ])

        const totalPercentage = totalVsLastWeek === 0 ? totalVsNextWeek > 0 ? 100 : 0 : (((totalVsNextWeek - totalVsLastWeek) / totalVsLastWeek) * 100).toFixed(0)
        const totalReadPercentage = readLastWeek === 0 ? readNextWeek > 0 ? 100 : 0 : (((readNextWeek - readLastWeek) / readLastWeek) * 100).toFixed(0)
        const totalUnReadPercentage = notReadLastWeek === 0 ? notReadNextWeek > 0 ? 100 : 0 : (((notReadNextWeek - notReadLastWeek) / notReadLastWeek) * 100).toFixed(0)
        const totalTodayPercentage = yesterdayData === 0 ? tomorrowData > 0 ? 100 : 0 : (((tomorrowData - yesterdayData) / yesterdayData) * 100).toFixed(0)

        return [getNotification, totalNotification, read, notRead, todayData, totalPercentage, totalReadPercentage, totalUnReadPercentage, totalTodayPercentage]
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
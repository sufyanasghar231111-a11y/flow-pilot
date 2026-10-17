import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export class ReportService {

    static async lastMonthData(request: NextRequest) {
        const admin = await getAuthUser(request)

        const now = new Date()

        const startOfLastMonth = new Date(
            now.getFullYear(),
            now.getMonth() - 1,
            1
        )

        const startOfThisMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const currentMonth = new Date(
            now.getFullYear(),
            now.getMonth() + 1,
            1
        )

        const [lastMonthProject, currentMonthProject, lastMonthTask, currentMonthTask, lastMonthMember, currentMonthMember, lastMonthTaskCompletion, currentMonthTaskCompletion, lastMonthProjectCompletion, currentMonthProjectCompletion] = await Promise.all(
            [
                prisma.project.count(
                    {
                        where: {
                            createdAt: {
                                gte: startOfLastMonth,
                                lt: startOfThisMonth
                            },
                            adminId: admin.userId
                        }
                    }
                ),

                prisma.project.count(
                    {
                        where: {

                            adminId: admin.userId,
                            createdAt: {
                                gte: startOfThisMonth,
                                lt: new Date(
                                    now.getFullYear(),
                                    now.getMonth() + 1,
                                    1
                                )
                            }
                        }
                    }
                ),

                prisma.task.count(
                    {
                        where: {
                            createdById: admin.userId,
                            createdAt: {
                                gte: startOfLastMonth,
                                lt: startOfThisMonth
                            }
                        }
                    }
                ),

                prisma.task.count(
                    {
                        where: {
                            createdById: admin.userId,
                            createdAt: {
                                gte: startOfThisMonth,
                                lt: currentMonth
                            }
                        }
                    }
                ),

                prisma.teamMember.count(
                    {
                        where: {
                            adminId: admin.userId,
                            createdAt: {
                                gte: startOfLastMonth,
                                lt: startOfThisMonth
                            }
                        }
                    }
                ),

                prisma.teamMember.count(
                    {
                        where: {
                            adminId: admin.userId,
                            createdAt: {
                                gte: startOfThisMonth,
                                lt: currentMonth
                            }
                        }
                    }
                ),

                prisma.task.count(
                    {
                        where: {
                            createdById: admin.userId,
                            status: 'DONE',
                            completedAt: {
                                gte: startOfLastMonth,
                                lt: startOfThisMonth
                            }
                        }
                    }
                ),

                prisma.task.count(
                    {
                        where: {
                            createdById: admin.userId,
                            status: 'DONE',
                            completedAt: {
                                gte: startOfThisMonth,
                                lt: currentMonth
                            }
                        }
                    }
                ),

                prisma.project.count(
                    {
                        where: {
                            adminId: admin.userId,
                            status: 'COMPLETE',
                            completedAt: {
                                gte: startOfLastMonth,
                                lt: startOfThisMonth
                            }
                        }
                    }
                ),

                prisma.project.count(
                    {
                        where: {
                            adminId: admin.userId,
                            status: 'COMPLETE',
                            completedAt: {
                                gte: startOfThisMonth,
                                lt: currentMonth
                            }
                        }
                    }
                )

            ]
        )

        const taskCompleted = lastMonthTaskCompletion === 0 ? currentMonthTaskCompletion > 0 ? 100 : 0 : (((currentMonthTaskCompletion - lastMonthTaskCompletion) / lastMonthTaskCompletion) * 100).toFixed(0)
        const projectCompleted = lastMonthProjectCompletion === 0 ? currentMonthProjectCompletion > 0 ? 100 : 0 : (((currentMonthProjectCompletion - lastMonthProjectCompletion) / lastMonthProjectCompletion) * 100).toFixed(0)

        const percentageProject = lastMonthProject === 0 ? currentMonthProject > 0 ? 100 : 0 : (((currentMonthProject - lastMonthProject) / lastMonthProject) * 100).toFixed(0)
        const percentageTask = lastMonthTask === 0 ? currentMonthTask > 0 ? 100 : 0 : (((currentMonthTask - lastMonthTask) / lastMonthTask) * 100).toFixed(0)
        const percentageTeam = lastMonthMember === 0 ? currentMonthMember > 0 ? 100 : 0 : (((currentMonthMember - lastMonthMember) / lastMonthMember) * 100).toFixed(0)

        return { percentageProject, percentageTask, percentageTeam, taskCompleted, projectCompleted }
    }

}
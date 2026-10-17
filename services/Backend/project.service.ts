
import prisma from "@/libs/db";
import { NextRequest } from "next/server";
import { getAuthUser } from "../../libs/auth/auth";
import { ProjectStatus } from "@/app/generated/prisma/enums";

export const projectService = {

    async projectCreation(
        name: string,
        description: string,
        startDate: Date,
        deadline: Date,
        status: ProjectStatus,
        request: NextRequest
    ) {

        const admin = await getAuthUser(request)

        const creatProject = await prisma.project.create(
            {
                data: {
                    name,
                    description,
                    startDate,
                    deadline,
                    status,
                    adminId: admin.userId
                }
            }
        )

        return creatProject

    },

    async getProjectByAdmin(request: NextRequest) {

        const admin = await getAuthUser(request)
        const { searchParams } = new URL(request.url)
        const page = Number(searchParams.get('page')) || 1
        const status = searchParams.get('status')
        const startDate = searchParams.get('startdate')
        const endDate = searchParams.get('enddate')

        const limit = 8
        const skip = (page - 1) * limit

        const findAdmin = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!findAdmin) {
            throw new Error("Only Admin Can Get")
        }

        const where = {
            adminId: admin.userId,
            ...(status && status !== 'All' ? { status: status as ProjectStatus } : {}),
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
        }

        const [findProject, totalProject, withOutPaginations] = await Promise.all([
            prisma.project.findMany(
                {
                    where,
                    include: {
                        admin: {
                            select: {
                                id: true,
                                username: true,
                                email: true,

                            }
                        },
                        tasks: {
                            select: {
                                id: true,
                                name: true,
                                status: true,
                                dueDate: true
                            }
                        },
                        projectmembers: {
                            select: {
                                id: true,
                                teamMemberId: true,

                                user: {
                                    select: {
                                        userId: true,
                                        user: {
                                            select: {
                                                id: true,
                                                username: true,
                                                email: true
                                            }
                                        }
                                    }
                                }
                            },

                        }
                    },

                    orderBy: {
                        createdAt: 'desc'
                    },
                    skip,
                    take: limit

                }
            ),

            prisma.project.count(
                {
                    where: {
                        adminId: admin.userId
                    }
                }
            ),

            prisma.project.findMany({
                where
            })
        ])

        const now = new Date()
        const beforeDay = new Date(now.getTime() + 24 * 60 * 60 * 1000)

        const deadlineSoon = findProject.filter(elem =>
            elem.deadline &&
            elem.deadline > now &&
            elem.deadline <= beforeDay &&
            elem.status !== 'COMPLETE' &&
            elem.status !== 'CANCELLED'
        )


        if (deadlineSoon.length > 0) {
            const candidates = deadlineSoon.map((project) => ({
                adminId: admin.userId,
                userId: admin.userId,
                type: "PROJECT_DEADLINE" as const,
                title: "Project Deadline",
                message: `The deadline for project "${project.name}" is approaching.`,
                projectId: project.id,
            }));

            const alreadyExist = await prisma.notification.findMany({
                where: {
                    OR: candidates.map((notification) => ({
                        adminId: notification.adminId,
                        userId: notification.userId,
                        type: notification.type,
                        projectId: notification.projectId,
                    })),
                },
                select: {
                    projectId: true,
                    userId: true,
                },
            });

            const newNotifications = candidates.filter(
                (notification) =>
                    !alreadyExist.some(
                        (existing) =>
                            existing.projectId === notification.projectId &&
                            existing.userId === notification.userId
                    )
            );

            if (newNotifications.length > 0) {
                await prisma.notification.createMany({
                    data: newNotifications,
                });
            }
        }

        const totalCompleted = withOutPaginations.filter((elem) => elem.status === 'COMPLETE').length
        const totalActive = withOutPaginations.filter((elem) => elem.status === 'ACTIVE').length
        const totalCancelled = withOutPaginations.filter((elem) => elem.status === 'CANCELLED').length
        const totalPending = withOutPaginations.filter((elem) => elem.status === 'PENDING').length
        const withOutPagination = withOutPaginations.length

        const totalCompletePercentage = Math.round((totalCompleted / withOutPaginations.length) * 100)
        const totalActivePercentage = Math.round((totalActive / withOutPaginations.length) * 100)
        const totalPendingPercentage = Math.round((totalPending / withOutPaginations.length) * 100)
        const totalCancelledPercentage = Math.round((totalCancelled / withOutPaginations.length) * 100)

        return { totalProject, totalActive, totalCancelled, totalPending, totalCompleted, totalActivePercentage, totalCompletePercentage, totalPendingPercentage, totalCancelledPercentage, findProject, withOutPagination }
    },

    async updateProject(
        id: string,
        name: string,
        description: string,
        deadline: Date | undefined,
        startDate: Date | undefined,
        status: ProjectStatus,
        request: NextRequest
    ) {

        const admin = await getAuthUser(request)

        const existing = await prisma.project.findFirst(
            {
                where: {
                    id: id,
                    adminId: admin.userId
                }
            }
        )

        if (!existing) {
            return Response.json(
                {
                    message: "Project is not found"
                },
                {
                    status: 404
                }
            )
        }

        await prisma.project.update(
            {
                where: {
                    id: id,
                },
                data: {
                    status: status,
                    completedAt: status === 'COMPLETE' ? new Date() : null
                }
            }
        )



        const updateProject = await prisma.project.update(
            {
                where: {
                    id: id,
                    adminId: admin.userId
                },
                data: {
                    ...(name !== undefined && { name }),
                    ...(description !== undefined && { description }),
                    ...(deadline !== undefined && { deadline }),
                    ...(startDate !== undefined && { startDate }),
                    ...(status !== undefined && { status }),
                },
                include: {
                    projectmembers: {
                        include: {
                            user: {
                                select: {
                                    userId: true,
                                    adminId: true
                                }
                            }
                        }
                    }
                }
            }
        )

        const change: string[] = []

        if (existing.name !== updateProject.name) {
            change.push(
                `Project name change from "${existing.name}" to "${updateProject.name}"`
            )
        }

        if (existing.status !== updateProject.status) {
            change.push(
                `Project status change from "${existing.status}" to "${updateProject.status}"`
            )
        }

        if (existing.description !== updateProject.description) {
            change.push(
                `Project description change from "${existing.description}" to "${updateProject.description}"`
            )
        }

        if (existing.deadline?.getTime() !== updateProject.deadline?.getTime()) {
            change.push(
                `Project deadline was changed.`
            )
        }

        if (change.length > 0) {

            await prisma.notification.createMany(
                {
                    data: updateProject?.projectmembers.map((member) => ({
                        title: 'Project Update',
                        message: change.join(" "),
                        type: 'PROJECT_UPDATED',
                        userId: member.user.userId,
                        adminId: admin.userId,
                        projectId: updateProject.id,
                    }))
                }
            );
        }

        return { updateProject }
    },

    async deleteProject(id: string, request: NextRequest) {

        const admin = await getAuthUser(request)

        const deleteProject = await prisma.project.delete(
            {
                where: {
                    id: id,
                    adminId: admin.userId
                },
            }
        )

        return deleteProject
    },

    async getAllProjectStatus(request: NextRequest) {

        const admin = await getAuthUser(request)

        const [totalCount, totalActive, totalComplete, totalPending, totalCancelled] = await Promise.all([
            prisma.project.count(
                {
                    where: {
                        adminId: admin.userId
                    }
                }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'ACTIVE',
                        adminId: admin.userId
                    }
                }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'COMPLETE',
                        adminId: admin.userId
                    }
                }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'PENDING',
                        adminId: admin.userId
                    }
                }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'CANCELLED',
                        adminId: admin.userId
                    }
                }
            )

        ])
        const now = new Date()
        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const [newProject, newActiveTask, newCompleted, newPending] = await Promise.all([
            prisma.project.count(
                {
                    where: {
                        createdAt: {
                            gte: startOfMonth
                        },
                        adminId: admin.userId
                    }
                }
            ),

            prisma.project.count({
                where: {
                    status: "ACTIVE",
                    createdAt: {
                        gte: startOfMonth
                    },
                    adminId: admin.userId
                }
            }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'COMPLETE',
                        completedAt: {
                            gte: startOfMonth
                        },
                        adminId: admin.userId
                    }
                }
            ),
            prisma.project.count(
                {
                    where: {
                        status: 'PENDING',
                        createdAt: {
                            gte: startOfMonth
                        },
                        adminId: admin.userId
                    }
                }
            ),

        ])

        return [
            totalCount, totalActive, totalComplete, totalPending, totalCancelled, newProject, newActiveTask, newCompleted, newPending
        ]
    },

    async addMember(projectid: string, userid: string, request: NextRequest) {

        const admin = await getAuthUser(request)

        const user = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!user) {
            throw new Error('only admin can do this ')
        }

        const teamMember = await prisma.teamMember.findFirst({
            where: {
                userId: userid,
                adminId: admin.userId
            }
        })

        if (!teamMember) {
            throw new Error('team member is not found')
        }

        const addMember = await prisma.projectMember.create(
            {
                data: {
                    projectId: projectid,
                    teamMemberId: teamMember.id,
                },
                include: {
                    user: true,
                    project: true
                }
            }
        )

        await prisma.notification.create({
            data: {
                adminId: admin.userId,
                userId: addMember.user.userId,
                title: 'Project Membership Added',
                message: `You are now a member of "${addMember.project.name}". You can view project details and collaborate with your team`,
                type: "ADD_PROJECT_MEMBER",
                projectId: projectid
            }
        }
        )

        return addMember
    },

    async singleProject(projectid: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const singleProject = await prisma.project.findUnique(
            {
                where: {
                    adminId: admin.userId,
                    id: projectid
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    startDate: true,
                    deadline: true,
                    status: true,
                    projectmembers: {
                        select: {
                            id: true,
                            user: {
                                select: {
                                    user: {
                                        select: {
                                            id: true,
                                            username: true,
                                            email: true
                                        }
                                    }
                                }
                            }
                        },
                    },
                    tasks: true
                },

            }
        )

        if ((singleProject?.tasks.length ?? 0) > 0 && singleProject?.tasks.every(elem => elem.status === 'DONE')) {

            await prisma.project.update(
                {
                    where: {
                        id: projectid
                    },
                    data: {
                        status: 'COMPLETE',
                        completedAt: new Date()
                    }
                }
            )
        }

        return singleProject
    }

}
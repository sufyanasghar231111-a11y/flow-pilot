
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

        const limit = 8
        const skip = (page - 1) * limit

        const findProject = await prisma.project.findMany(
            {
                where: {
                    adminId: admin.userId
                },
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
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    email: true
                                }
                            },
                            id: true
                        },

                    }
                },

                orderBy: {
                    createdAt: 'desc'
                },

                skip,
                take: limit

            }
        )

        return findProject
    },

    async updateProject(
        id: string,
        name: string,
        description: string,
        deadline: Date,
        request: NextRequest
    ) {

        const admin = await getAuthUser(request)

        const updateProject = await prisma.project.update(
            {
                where: {
                    id: id,
                    adminId: admin.userId
                },
                data: {
                    name,
                    description,
                    deadline

                }
            }
        )

        return updateProject
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

    async getAllProjectStatus() {

        const [totalCount, totalActive, totalComplete, totalPending, totalCancelled] = await Promise.all([
            prisma.project.count(),

            prisma.project.count(
                {
                    where: {
                        status: 'ACTIVE'
                    }
                }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'COMPLETE'
                    }
                }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'PENDING'
                    }
                }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'CANCELLED'
                    }
                }
            ),

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
                        }
                    }
                }
            ),

            prisma.project.count({
                where: {
                    status: "ACTIVE",
                    createdAt: {
                        gte: startOfMonth
                    }
                }
            }
            ),

            prisma.project.count(
                {
                    where: {
                        status: 'COMPLETE',
                        completedAt: {
                            gte: startOfMonth
                        }
                    }
                }
            ),
            prisma.project.count(
                {
                    where: {
                        status: 'PENDING',
                        createdAt: {
                            gte: startOfMonth
                        }
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


        const addMember = await prisma.projectMember.create(
            {
                data: {
                    projectId: projectid,
                    userId: userid,
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
                    projectmembers: {
                        select: {
                            user: {
                                select: {
                                    id: true,
                                    username: true
                                }
                            }
                        }
                    }
                }
            }
        )
        return singleProject
    }
}
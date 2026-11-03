import { ProjectStatus, TaskStatus } from "@/app/generated/prisma/enums";
import { generateEmbedding } from "@/libs/ai/embedding";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export class UserSearch {

    static async UserSearch(request: NextRequest) {
        const user = await getAuthUser(request)

        const { searchParams } = new URL(request.url)
        const page = Number(searchParams.get('page')) || 1
        const search = searchParams.get('search')

        const limit = 6
        const skip = (page - 1) * limit

        const projectStatus = Object.values(ProjectStatus)
        const taskStatus = Object.values(TaskStatus)

        const searchData = search?.trim().toLowerCase()
        const projectStatusMatch = projectStatus.find(elem => elem.toLocaleLowerCase() === search?.toLocaleLowerCase())
        const taskStatusMatch = taskStatus.find(elem => elem.toLocaleLowerCase() === search?.toLocaleLowerCase())

        const embedding = searchData ? await generateEmbedding(searchData) : null

        const projectMatch = searchData ?
            await prisma.$queryRaw<{ projectId: string, distance: number }[]>
                `
            SELECT
            se."projectId",
            se."embedding" <=> ${JSON.stringify(embedding)}::vector AS distance
            FROM "SearchEmbedding" se
           INNER JOIN "Project" p ON p."id" = se."projectId"
           INNER JOIN "ProjectMember" pm ON pm."projectId" = p."id"
           INNER JOIN "TeamMember" tm ON tm."id" = pm."teamMemberId"
           WHERE tm."userId" = ${user.userId}
           AND se."embedding" <=> ${JSON.stringify(embedding)}::vector < 0.5
           AND se."projectId" IS NOT NULL
           AND (
           ${projectStatusMatch ?? null}::"ProjectStatus" IS NULL
           OR p."status" = ${projectStatusMatch ?? null}::"ProjectStatus"
           )
           ORDER BY distance ASC
           LIMIT ${limit}
           OFFSET ${skip}
            `
            : []

        const taskMatch = searchData ?

            await prisma.$queryRaw<{ taskId: string, distance: number }[]>`
            SELECT
            se."taskId",
            se."embedding" <=> ${JSON.stringify(embedding)}::vector AS distance
            FROM "SearchEmbedding"  se
            INNER JOIN "Task" t ON t."id" = se."taskId"
            INNER JOIN "TeamMember" tm ON tm."id" = t."assignedToId"
            WHERE tm."userId" = ${user.userId}
            AND se."embedding" <=> ${JSON.stringify(embedding)}::vector < 0.5
            AND se."taskId" IS NOT NULL
            AND (
            ${taskStatusMatch ?? null}::"TaskStatus" IS NULL
            OR t."status" = ${taskStatusMatch ?? null}::"TaskStatus"
            )
            ORDER BY distance ASC
            LIMIT ${limit}
            OFFSET ${skip}
            ` : []

        const [projectSearch, taskSearch] = await Promise.all([
            prisma.projectMember.findMany(
                {
                    where: {
                        user: {
                            user: {
                                id: user.userId
                            }
                        },
                        project: {
                            id: {
                                in: projectMatch.map((elem) => elem.projectId)
                            }
                        }
                    },
                    select: {
                        projectId: true,
                        project: {
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
                                        dueDate: true,
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
                        }
                    },
                    skip,
                    take: limit
                }
            ),

            prisma.task.findMany(
                {
                    where: {
                        assignedTo: {
                            user: {
                                id: user.userId
                            }
                        },

                        id: {
                            in: taskMatch.map(elem => elem.taskId)
                        }
                    },
                    include: {
                        assignedTo: {
                            select: {
                                id: true,
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
                    skip,
                    take: limit
                }
            )
        ])

        const orderByProject = projectMatch.map(match => projectSearch.find(elem => elem.projectId === match.projectId))
            .filter(elem => elem !== undefined)

        const orderByTask = taskMatch.map(match => taskSearch.find(elem => elem.id === match.taskId))
            .filter(elem => elem !== undefined)

        const mixedData = [
            ...orderByProject.map((elem) => ({
                ...elem,
                types: 'project',
                distance: projectMatch.find(match => match.projectId === elem.projectId)?.distance ?? Infinity
            })),
            ...orderByTask.map((elem) => ({
                ...elem,
                types: 'task',
                distance: taskMatch.find(match => match.taskId === elem.id)?.distance ?? Infinity
            })),
        ].sort((a, b) => a.distance - b.distance)

        return mixedData
    }
}
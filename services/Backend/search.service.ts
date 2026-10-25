import { ProjectStatus, TaskStatus } from "@/app/generated/prisma/enums";
import { generateEmbedding } from "@/libs/ai/embedding";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";


export class SearchService {

    static async searchData(request: NextRequest) {

        const admin = await getAuthUser(request)
        const { searchParams } = new URL(request.url)
        const searchpage = Number(searchParams.get('searchpage')) || 1
        const search = searchParams.get('search')

        const limit = 8
        const skip = (searchpage - 1) * limit

        const searchTerm = search?.trim().toLowerCase()

        const statusOption = Object.values(ProjectStatus)
        const statusTask = Object.values(TaskStatus)
        const matchingStatus = statusOption.find(elem => elem.toLowerCase() === searchTerm?.toLowerCase())
        const matchStatus = statusTask.find((status) => status.toLowerCase() === searchTerm?.toLowerCase())

        const embedding = searchTerm ? await generateEmbedding(searchTerm) : null

        const projectMatch = searchTerm
            ?
            await prisma.$queryRaw<{ projectId: string, distance: number }[]>
                `
                SELECT 
                se."projectId",
                se."embedding" <=> ${JSON.stringify(embedding)}::vector AS distance
                FROM "SearchEmbedding" se
                INNER JOIN "Project" p ON p."id" = se."projectId"
                WHERE p."adminId" = ${admin.userId}
                AND se."projectId" IS NOT NULL
                AND se."embedding" <=> ${JSON.stringify(embedding)}::vector < 0.6
                AND (
                ${matchingStatus ?? null}::"ProjectStatus" IS NULL
                OR p."status" =${matchingStatus ?? null}::"ProjectStatus"
                )
                ORDER BY Distance ASC
                LIMIT ${limit}
                OFFSET ${skip}
            `
            : []


        const taskMatch = searchTerm ?
            await prisma.$queryRaw<{ taskId: string, distance: number }[]>
                `
            SELECT 
            se."taskId",
            se."embedding" <=> ${JSON.stringify(embedding)}::vector AS distance
            FROM "SearchEmbedding" se
            INNER JOIN "Task" t ON t."id" = se."taskId"
            WHERE t."createdById" = ${admin.userId}
            AND se."taskId" IS NOT NULL
            AND se."embedding" <=> ${JSON.stringify(embedding)}::vector < 0.6
            AND(
            ${matchStatus ?? null}::"TaskStatus" IS NULL
            OR t."status" = ${matchStatus ?? null}::"TaskStatus"
            )
            ORDER BY Distance ASC
            LIMIT ${limit}
            OFFSET ${skip}
            `
            :
            []

        const [searchProject, searchTask, searchMember] = await Promise.all([

            await prisma.project.findMany(
                {
                    where: {

                        id: {
                            in: projectMatch.map(elem => elem.projectId)
                        },
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
                    skip,
                    take: limit

                }
            ),

            prisma.task.findMany(
                {
                    where: {
                        id: {
                            in: taskMatch.map(elem => elem.taskId)
                        },
                        createdById: admin.userId
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
                    take: limit,
                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            ),

            prisma.teamMember.findMany({
                where: {
                    ...(search?.trim ? {
                        user: {
                            username: {
                                mode: 'insensitive',
                                contains: search.trim()
                            }
                        }
                    } : {}),
                    adminId: admin.userId
                },
                select: {
                    user: {
                        select: {
                            username: true,
                            id: true,
                            email: true,
                            pfp: true,
                            role: true,
                            createdAt: true
                        }
                    },
                    createdAt: true
                },
                take: limit,
                skip,
                orderBy: {
                    createdAt: 'desc'
                }
            }),

        ])

        const orderProject = projectMatch.map(match => searchProject.find(item => item.id === match.projectId))
            .filter(elem => elem !== undefined)

        const orderTask = taskMatch.map(elem => searchTask.find(value => value.id === elem.taskId))
            .filter(elem => elem !== undefined)

        const completeSearchData = [
            ...(orderProject.map((elem) => ({
                ...elem,
                types: 'project',
                date: elem.createdAt,
                distance: projectMatch.find(match => match.projectId === elem.id)?.distance ?? Infinity
            }))),
            ...(orderTask.map((elem) => ({
                ...elem,
                types: 'task',
                date: elem.createdAt,
                distance: taskMatch.find(match => match.taskId === elem.id)?.distance ?? Infinity
            }))),
            ...(searchMember.map((elem) => ({
                ...elem,
                types: 'team',
                date: elem.createdAt,
                distance: 0.7
            }))),
        ].sort((a, b) => a.distance - b.distance)

        return completeSearchData
    }
}
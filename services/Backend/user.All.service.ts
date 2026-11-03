import { TaskStatus } from "@/app/generated/prisma/enums";
import { generateEmbedding } from "@/libs/ai/embedding";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export class UserAllService {

    static async getAllProject(request: NextRequest) {
        const user = await getAuthUser(request)
        const { searchParams } = new URL(request.url)
        const page = Number(searchParams.get('page')) || 1
        const todoPage = Number(searchParams.get('todopage')) || 1
        const inProgressPage = Number(searchParams.get('inprogresspage')) || 1
        const reviewPage = Number(searchParams.get('reviewpage')) || 1
        const donePage = Number(searchParams.get('donepage')) || 1

        const limit = 4
        const skip = (page - 1) * limit

        const taskLimit = 5

        const todoSkip = (todoPage - 1) * taskLimit
        const inProgressSkip = (inProgressPage - 1) * taskLimit
        const reviewSkip = (reviewPage - 1) * taskLimit
        const doneSkip = (donePage - 1) * taskLimit
        const select = {
            id: true,
            name: true,
            description: true,
            dueDate: true,
            priority: true,
            status: true,
            completedAt: true,
            assignedTo: {
                select: {
                    id: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            }
        }

        const [myProject, taskTodo, taskInProgress, taskReview, taskDone] = await Promise.all([

            prisma.projectMember.findMany(
                {
                    where: {
                        user: {
                            user: {
                                id: user.userId
                            }
                        }
                    },
                    select: {
                        project: {
                            select: {
                                id: true,
                                name: true,
                                deadline: true,
                                description: true,
                                startDate: true,
                                createdAt: true,
                                status: true,
                                completedAt: true,
                                admin: {
                                    select: {
                                        id: true,
                                        username: true,
                                        email: true
                                    }
                                },
                                projectmembers: {
                                    select: {
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
                                    }
                                },
                                tasks: {
                                    select: {
                                        id: true,
                                        name: true,
                                        description: true,
                                        createdAt: true,
                                        status: true
                                    }
                                }
                            }
                        }
                    }
                    ,
                    orderBy: {
                        createdAt: 'desc'
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
                        status: 'TODO'
                    },
                    select,
                    skip: todoSkip,
                    take: taskLimit
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
                        status: 'IN_PROGRESS'
                    },
                    select,
                    skip: inProgressSkip,
                    take: taskLimit
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
                        status: 'REVIEW'
                    },
                    select,
                    skip: reviewSkip,
                    take: taskLimit
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
                        status: 'DONE'
                    },
                    select,
                    skip: doneSkip,
                    take: taskLimit
                }
            ),

        ])

        return [myProject, taskTodo, taskInProgress, taskReview, taskDone]
    }

    static async recentActivity(request: NextRequest) {
        const user = await getAuthUser(request)
        const { searchParams } = new URL(request.url)
        const loadData = Number(searchParams.get('loaddata')) || 1
        const limit = 3

        const skip = (loadData - 1) * limit

        const now = new Date()
        const newThisMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const [project, task, joined, joinedInTeam, newJoinedInTeam] = await Promise.all([
            prisma.projectMember.findMany(
                {
                    where: {
                        user: {
                            user: {
                                id: user.userId
                            }
                        },
                    },
                    select: {
                        createdAt: true,
                        project: {
                            select: {
                                name: true,

                            }
                        },
                        id: true
                    },
                    take: limit,
                    skip
                }
            ),

            prisma.task.findMany(
                {
                    where: {
                        assignedTo: {
                            user: {
                                id: user.userId
                            }
                        }
                    },
                    select: {
                        name: true,
                        createdAt: true,
                        completedAt: true,
                        id: true
                    }
                    ,
                    take: limit,
                    skip
                }
            ),

            prisma.teamMember.findMany(
                {
                    where: {
                        user: {
                            id: user.userId
                        }
                    },
                    select: {
                        createdAt: true,
                        byAdmin: {
                            select: {
                                username: true
                            }
                        },
                        id: true
                    },
                    take: limit,
                    skip
                }
            ),

            prisma.teamMember.count(
                {
                    where: {
                        user: {
                            id: user.userId,
                        },
                    }
                }
            ),

            prisma.teamMember.count(
                {
                    where: {
                        user: {
                            id: user.userId,
                        },
                        createdAt: {
                            gte: newThisMonth
                        }
                    }
                }
            ),

            // prisma.projectMember.count(
            //     {
            //         where: {
            //             user: {
            //                 user: {
            //                     id: user.userId
            //                 }
            //             },
            //         }
            //     }
            // ),

            // prisma.task.count(
            //     {
            //         where: {
            //             assignedTo: {
            //                 user: {
            //                     id: user.userId
            //                 }
            //             }
            //         }
            //     }
            // ),

        ])

        const totalActivity = [
            ...(project.map((elem) => ({
                types: 'project',
                date: elem.createdAt,
                name: elem.project.name,
                id: elem.id
            }))),
            ...(task.flatMap((elem) => [
                {
                    types: "taskCreated",
                    date: elem.createdAt,
                    name: elem.name,
                    id: elem.id
                },
                ...(elem.completedAt ? [{
                    types: 'taskCompleted',
                    date: elem.completedAt,
                    name: elem.name,
                    id: elem.id
                }] : [])
            ])),
            ...(joined.map((elem) => ({
                types: "teamMember",
                date: elem.createdAt,
                name: elem.byAdmin.username,
                id: elem.id
            })))
        ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

        return [totalActivity, joinedInTeam, newJoinedInTeam]
    }

    static async updateStatus(request: NextRequest, taskid: string, status: TaskStatus) {
        const user = await getAuthUser(request)

        if (status === 'DONE') {
            throw new AppError('You are not allowed to perform these functionality', 403)
        }

        const updatTaskByDrag = await prisma.task.update(
            {
                where: {
                    id: taskid,
                    status: {
                        in: ['TODO', 'IN_PROGRESS', 'REVIEW'],
                    },
                    assignedTo: {
                        user: {
                            id: user.userId
                        }
                    },
                    completedAt: null
                },
                data: {
                    status,
                }
            }
        )

        if (updatTaskByDrag.status || updatTaskByDrag.name || updatTaskByDrag.description) {

            const content = `
            Task: ${updatTaskByDrag.name}
            Description: ${updatTaskByDrag.description}
            Status: ${updatTaskByDrag.status}
            `

            const embedding = await generateEmbedding(content)

            await prisma.$executeRaw`
            INSERT INTO "SearchEmbedding" (
            "id",
            "taskId",
            "content",
            "embedding",
            "embeddingModel",
            "createdAt",
            "updatedAt"
            )
            VALUES(
            ${crypto.randomUUID()},
            ${updatTaskByDrag.id},
            ${content},
            ${JSON.stringify(embedding)}::vector,
            'gemini-embedding-2',
            NOW(),
            NOW()
            )

            ON CONFLICT ("taskId")
            DO UPDATE SET
            "content" = EXCLUDED."content",
            "embedding"= EXCLUDED."embedding",
            "embeddingModel"= EXCLUDED."embeddingModel",
            "updatedAt" = NOW()
            `
        }

        return updatTaskByDrag
    }

    static async singleTask(request: NextRequest, taskid: string) {
        const user = await getAuthUser(request)

        const singleTask = await prisma.task.findFirst(
            {
                where: {
                    id: taskid,
                    assignedTo: {
                        user: {
                            id: user.userId
                        }
                    }
                }
            }
        )

        return singleTask
    }

    static async eventMember(request: NextRequest) {
        const user = await getAuthUser(request)

        const now = new Date()
        const startOfMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const [totalEvent, totalProjectMeeting, totalPersonalMeeting, totalDeadline, newDeadline, newProjectMeeting, newPersonalMeeting, getEvent] = await Promise.all([

            prisma.eventMember.count(
                {
                    where: {
                        member: {
                            user: {
                                id: user.userId
                            }
                        }
                    }
                }
            ),

            prisma.eventMember.count(
                {
                    where: {
                        member: {
                            user: {
                                id: user.userId
                            }
                        },
                        event: {
                            type: 'PROJECT_MEETING'
                        }
                    }
                }
            ),

            prisma.eventMember.count(
                {
                    where: {
                        member: {
                            user: {
                                id: user.userId
                            }
                        },
                        event: {
                            type: 'PERSONAL_MEETING'
                        }
                    }
                }
            ),

            prisma.eventMember.count(
                {
                    where: {
                        member: {
                            user: {
                                id: user.userId
                            }
                        },
                        event: {
                            type: 'DEADLINE'
                        }
                    }
                }
            ),

            prisma.eventMember.count(
                {
                    where: {
                        member: {
                            user: {
                                id: user.userId
                            }
                        },
                        event: {
                            type: 'DEADLINE'
                        },
                        createdAt: {
                            gte: startOfMonth
                        }
                    }
                }
            ),

            prisma.eventMember.count(
                {
                    where: {
                        member: {
                            user: {
                                id: user.userId
                            }
                        },
                        event: {
                            type: 'PROJECT_MEETING'
                        },
                        createdAt: {
                            gte: startOfMonth
                        }
                    }
                }
            ),

            prisma.eventMember.count(
                {
                    where: {
                        member: {
                            user: {
                                id: user.userId
                            }
                        },
                        event: {
                            type: 'PERSONAL_MEETING'
                        },
                        createdAt: {
                            gte: startOfMonth
                        }
                    }
                }
            ),

            prisma.event.findMany(
                {
                    where: {
                        eventMember: {
                            some: {
                                member: {
                                    user: {
                                        id: user.userId
                                    }
                                }
                            }
                        }
                    },
                    select: {
                        id: true,
                        name: true,
                        date: true,
                        startTime: true,
                        endTime: true,
                        createdAt: true,
                        type: true,
                        eventMember: {
                            select: {
                                member: {
                                    select: {
                                        user: {
                                            select: {
                                                email: true,
                                                id: true,
                                                username: true
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            )

        ])

        return [
            totalEvent, totalProjectMeeting, totalPersonalMeeting, totalDeadline, newDeadline, newProjectMeeting, newPersonalMeeting, getEvent
        ]
    }

}
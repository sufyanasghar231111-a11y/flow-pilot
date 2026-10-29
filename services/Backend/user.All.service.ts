import { TaskStatus } from "@/app/generated/prisma/enums";
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

        const [project, task, joined] = await Promise.all([
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
                    }
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
                    }
                }
            )
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

        return totalActivity
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

}
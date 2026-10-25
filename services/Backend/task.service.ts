import { Priority, TaskStatus } from "@/app/generated/prisma/enums";
import { generateEmbedding } from "@/libs/ai/embedding";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";


export class taskService {

    static async createTask(projectid: string, name: string, description: string, priority: Priority, dueDate: Date, assignedToId: string, request: NextRequest) {

        const createdBy = await getAuthUser(request)

        const teamMember = await prisma.teamMember.findFirst(
            {
                where: {
                    userId: assignedToId,
                    adminId: createdBy.userId
                }
            }
        )

        if (!teamMember) {
            throw new Error('user is not team member')
        }

        const projectMember = await prisma.project.findFirst(
            {
                where: {
                    id: projectid,
                    projectmembers: {
                        some: {
                            teamMemberId: teamMember.id
                        }
                    }
                }
            }
        )

        if (!projectMember) {
            throw new Error('User is not project member')
        }

        const createTask = await prisma.task.create(
            {
                data: {
                    projectId: projectid,
                    name,
                    description,
                    priority,
                    dueDate,
                    assignedToId: teamMember.id,
                    createdById: createdBy.userId
                }
            }
        )

        const content = `
        Task: ${createTask.name}
        Description: ${createTask.description}
        Status: ${createTask.status}
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
        VALUES (
        ${crypto.randomUUID()},
        ${createTask.id},
        ${content},
        ${JSON.stringify(embedding)}::vector,
        'gemini-embedding-2',
        NOW(),
        NOW()
        )
        `


        await prisma.project.update(
            {
                where: {
                    id: projectid,
                    status: {
                        not: 'CANCELLED'
                    }
                },
                data: {
                    status: 'ACTIVE',
                    completedAt: null,
                }
            }
        )

        return createTask
    }

    static async getTask(request: NextRequest) {

        const createdBy = await getAuthUser(request)
        const { searchParams } = new URL(request.url)
        const taskStatus = searchParams.get('taskstatus')
        const priority = searchParams.get('priority')
        const startDate = searchParams.get('startdate')
        const endDate = searchParams.get('enddate')

        const [getTasks, totalTask] = await Promise.all([
            prisma.task.findMany(
                {
                    where: {
                        createdById: createdBy.userId,
                        ...(taskStatus && taskStatus !== 'All' ? { status: taskStatus as TaskStatus } : {}),
                        ...(priority && priority !== 'All' ? { priority: priority as Priority } : {}),
                        ...(startDate || endDate ? {
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
                        } : {})

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

                    orderBy: {
                        createdAt: 'desc'
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        createdById: createdBy.userId
                    }
                }
            )
        ])

        const now = new Date()

        const before = new Date(now.getTime() + 24 * 60 * 60 * 1000)
        const taskDueSoon = getTasks.filter((elem) =>
            elem.dueDate &&
            new Date(elem.dueDate) > now &&
            new Date(elem.dueDate) <= before &&
            elem.status !== 'DONE' &&
            elem.assignedTo
        )

        if (taskDueSoon.length > 0) {

            const alreadyExist = await prisma.notification.findMany({
                where: {
                    OR: taskDueSoon.map((elem) => ({
                        type: 'TASK_OVERDUE',
                        title: 'Task Deadline Approaching',
                        taskId: elem.id,
                        userId: elem.assignedTo!.userId,
                        adminId: createdBy.userId
                    }))
                },
                select: {
                    taskId: true,
                    userId: true
                }
            })

            const newNotification = taskDueSoon.filter((task) => {
                return !alreadyExist.some(
                    (notification) =>
                        notification.taskId === task.id &&
                        notification.userId === task.assignedTo!.userId
                )
            })

            if (newNotification.length > 0) {
                await prisma.notification.createMany({
                    data: newNotification.map((task) => ({
                        adminId: createdBy.userId,
                        type: 'TASK_OVERDUE',
                        title: 'Task Deadline Approaching',
                        message: `Your task "${task.name}" is due within the next 24 hours.`,
                        userId: task.assignedTo!.userId,
                        taskId: task.id
                    }))
                })
            }
        }


        const totalDone = getTasks.filter(elem => elem.status === 'DONE').length
        const totalTodo = getTasks.filter(elem => elem.status === 'TODO').length
        const totalReview = getTasks.filter(elem => elem.status === 'REVIEW').length
        const totalInProgress = getTasks.filter(elem => elem.status === 'IN_PROGRESS').length

        const totalHigh = getTasks.filter(elem => elem.priority === 'HIGH').length
        const totalMedium = getTasks.filter(elem => elem.priority === 'MEDIUM').length
        const totalLow = getTasks.filter(elem => elem.priority === "LOW").length

        const totalDonePercentage = Math.round((totalDone / getTasks.length) * 100)
        const totalTodoPercentage = Math.round((totalTodo / getTasks.length) * 100)
        const totalReviewPercentage = Math.round((totalReview / getTasks.length) * 100)
        const totalInProgressPercentage = Math.round((totalInProgress / getTasks.length) * 100)

        const totalHighPercentage = Math.round((totalHigh / getTasks.length) * 100)
        const totalMediumPercentage = Math.round((totalMedium / getTasks.length) * 100)
        const totalLowPercentage = Math.round((totalLow / getTasks.length) * 100)




        return {
            totalTask, totalDone, totalTodo, totalReview, totalInProgress, totalDonePercentage, totalTodoPercentage, totalReviewPercentage, totalInProgressPercentage, getTasks
            , totalHigh, totalMedium, totalLow, totalHighPercentage, totalMediumPercentage, totalLowPercentage
        }
    }

    static async getTaskById(projectid: string, request: NextRequest) {

        const createdByAdmin = await getAuthUser(request)

        const find = await prisma.user.findUnique(
            {
                where: {
                    id: createdByAdmin.userId
                }
            }
        )

        if (!find) {
            throw new Error('Only admin can get')
        }

        const getTaskById = await prisma.task.findMany(
            {
                where: {
                    projectId: projectid,
                    createdById: createdByAdmin.userId,
                }
            }
        )

        return getTaskById

    }

    static async updateTaskByAssiging(taskid: string, member: string, request: NextRequest) {
        const createdBy = await getAuthUser(request)

        const task = await prisma.task.findUnique(
            {
                where: {
                    id: taskid
                }
            }
        )

        if (!task) {
            throw new Error("Task not found")
        }

        if (task.assignedToId) {
            throw new Error('Task is Already assign')
        }

        const project = await prisma.projectMember.findFirst(
            {
                where: {
                    projectId: task.projectId,
                    userId: member
                },

            }
        )

        if (!project) {
            throw new Error("Member not found")
        }

        const assignTask = await prisma.task.update(
            {
                where: {
                    id: taskid,
                    createdById: createdBy.userId,
                },
                data: {
                    assignedToId: member
                }

            }
        )
        return assignTask
    }

    static async getAssignTasksByUser(request: NextRequest) {
        const user = await getAuthUser(request)

        const userAssignTask = await prisma.task.findMany(
            {
                where: {
                    assignedToId: user.userId
                }
            }
        )

        return userAssignTask
    }

    static async removeMemberFromTask(taskid: string, memberid: string, request: NextRequest) {
        const createdBy = await getAuthUser(request)

        const task = await prisma.task.findUnique(
            {
                where: {
                    id: taskid
                }
            }
        )

        if (!task) {
            throw new Error("Task is not found")
        }

        const projectMember = await prisma.projectMember.findFirst(
            {
                where: {
                    projectId: task.projectId,
                    userId: memberid
                }
            }
        )

        if (!projectMember) {
            throw new Error("User is not member")
        }

        const removeUser = await prisma.task.update(
            {
                data: {
                    assignedToId: null
                },
                where: {
                    id: taskid,
                    createdById: createdBy.userId,
                    assignedToId: memberid
                }
            }
        )

        return removeUser

    }

    static async countTask(request: NextRequest) {

        const admin = await getAuthUser(request)

        const find = await prisma.user.findFirst(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!find) {
            throw new AppError('Only admin can count', 403)
        }

        const [completedTask, pendingTask, activeTask, overDue] = await Promise.all([
            prisma.task.count(
                {
                    where: {
                        status: 'DONE',
                        createdById: admin.userId
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        status: 'TODO',
                        createdById: admin.userId
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        status: 'IN_PROGRESS',
                        createdById: admin.userId
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        createdById: admin.userId,
                        dueDate: {
                            lt: new Date()
                        },
                        status: {
                            not: 'DONE',
                        }
                    }
                }
            )
        ])

        const newThisWeek = new Date()
        const day = newThisWeek.getDay()
        const diff = day === 0 ? 6 : day - 1
        newThisWeek.setDate(newThisWeek.getDate() - diff)
        newThisWeek.setHours(0, 0, 0, 0)


        const [newCompleted, newPending] = await Promise.all([
            prisma.task.count(
                {
                    where: {
                        completedAt: {
                            gte: newThisWeek
                        },
                        createdById: admin.userId
                    }
                }
            )
            ,
            prisma.task.count(
                {
                    where: {
                        createdAt: {
                            gte: newThisWeek
                        },
                        createdById: admin.userId
                    }
                }
            )
        ])


        return [completedTask, pendingTask, activeTask, newCompleted, newPending, overDue]
    }

    static async updateTaskByStatus(taskid: string, status: TaskStatus, request: NextRequest) {
        const admin = await getAuthUser(request)

        const taskId = await prisma.task.findUnique(
            {
                where: {
                    id: taskid,
                    createdById: admin.userId,
                    status: 'REVIEW'
                }
            }
        )

        if (!taskId) {
            throw new Error("Task Not Found")
        }

        if (status !== 'DONE') {
            throw new Error("Task can only be marked as COMPLETE");
        }

        const taskStatusUpdate = await prisma.task.update(
            {
                where: {
                    createdById: admin.userId,
                    id: taskid,
                    status: 'REVIEW',
                    completedAt: null
                },
                data: {
                    status,
                    completedAt: new Date()
                },
                include: {
                    assignedTo: true
                }

            }
        )

        if (
            taskStatusUpdate.assignedTo
        ) {
            await prisma.notification.createMany(
                {
                    data: {
                        adminId: admin.userId,
                        userId: taskStatusUpdate.assignedTo.userId,
                        title: 'Completed Task',
                        message: `User completed Task ${taskStatusUpdate.name}`,
                        taskId: taskid,
                        type: 'TASK_COMPLETED'
                    }
                }
            )
        }


        return taskStatusUpdate
    }

    static async deleteTask(taskid: string, request: NextRequest) {
        const admin = await getAuthUser(request)
        const find = await prisma.task.findUnique(
            {
                where: {
                    id: taskid,
                    createdById: admin.userId
                }
            }
        )
        if (!find) {
            throw new Error("Task not found")
        }

        const deleteTask = await prisma.task.delete(
            {
                where: {
                    id: taskid,
                    createdById: admin.userId
                }
            }
        )
        return deleteTask
    }

    static async getsingleTask(taskid: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const find = await prisma.task.findUnique(
            {
                where: {
                    id: taskid,
                    createdById: admin.userId
                },

            }
        )
        if (!find) {
            throw new Error("Task not found")
        }

        const task = await prisma.task.findUnique(
            {
                where: {
                    id: taskid,
                    createdById: admin.userId
                },
                select: {
                    id: true,
                    name: true,
                    description: true,
                    status: true,
                    priority: true,
                    dueDate: true,
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
                    },
                    project: {
                        select: {
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
                                }
                            }
                        }
                    }
                }

            }
        )

        return task
    }

    static async updateTask(taskid: string, name: string, description: string, priority: Priority, dueDate: Date | undefined, assignedToId: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const teamMember = await prisma.teamMember.findFirst(
            {
                where: {
                    userId: assignedToId,
                    adminId: admin.userId
                }
            }
        )

        if (!teamMember) {
            throw new Error("User is not team member")
        }

        const find = await prisma.task.findUnique(
            {
                where: {
                    id: taskid,
                    createdById: admin.userId
                }
            }
        )
        if (!find) {
            throw new Error("Task not found")
        }

        const findMember = await prisma.project.findFirst(
            {
                where: {
                    tasks: {
                        some: {
                            id: taskid
                        }
                    },
                    projectmembers: {
                        some: {
                            teamMemberId: teamMember.id
                        }
                    },
                }
            }
        )

        if (!findMember) {
            throw new Error("User is not project Member")
        }

        const updateTask = await prisma.task.update(
            {
                where: {
                    id: taskid,
                    createdById: admin.userId
                },
                data: {
                    ...(name !== undefined && { name }),
                    ...(description !== undefined && { description }),
                    ...(priority !== undefined && { priority }),
                    ...(dueDate !== undefined && { dueDate }),
                    ...(assignedToId !== undefined && { assignedToId: teamMember.id }),
                }
            }
        )


        if (updateTask.name || updateTask.description || updateTask.status) {

            const content = `
            Task: ${updateTask.name}
            Description: ${updateTask.description}
            Status: ${updateTask.status}
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
            VALUES (
            ${crypto.randomUUID()},
            ${updateTask.id},
            ${content},
            ${JSON.stringify(embedding)}::vector,
            'gemini-embedding-2',
             NOW(),
             NOW()
            )

            ON CONFLICT ("taskId")
            DO UPDATE SET
            "content" = EXCLUDED."content",
            "embedding" = EXCLUDED."embedding",
            "embeddingModel" = EXCLUDED."embeddingModel",
            "updatedAt" = NOW()
            `
        }

        return updateTask
    }

}
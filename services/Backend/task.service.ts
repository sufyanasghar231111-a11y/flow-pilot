import { Priority, TaskStatus } from "@/app/generated/prisma/enums";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";


export class taskService {

    static async createTask(projectid: string, name: string, description: string, priority: Priority, dueDate: Date, assignedToId: string, request: NextRequest) {

        const createdBy = await getAuthUser(request)

        const projectMember = await prisma.project.findFirst(
            {
                where: {
                    id: projectid,
                    projectmembers: {
                        some: {
                            userId: assignedToId
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
                    assignedToId,
                    createdById: createdBy.userId
                }
            }
        )
        return createTask
    }

    static async getTask(request: NextRequest) {

        const createdBy = await getAuthUser(request)

        const getTasks = await prisma.task.findMany(
            {
                where: {
                    createdById: createdBy.userId,
                },
                include: {
                    assignedTo: {
                        select: {
                            id: true,
                            username: true,
                            email: true
                        }
                    }
                },

                orderBy: {
                    createdAt: 'desc'
                }
            }
        )

        return getTasks
    }

    static async getTaskById(projectid: string, request: NextRequest) {

        const createdByAdmin = await getAuthUser(request)

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

    static async countTask() {

        const [completedTask, pendingTask, activeTask] = await Promise.all([
            prisma.task.count(
                {
                    where: {
                        status: 'DONE'
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        status: 'TODO'
                    }
                }
            ),
            prisma.task.count(
                {
                    where: {
                        status: 'IN_PROGRESS'
                    }
                }
            ),
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
                        }
                    }
                }
            )
            ,
            prisma.task.count(
                {
                    where: {
                        createdAt: {
                            gte: newThisWeek
                        }
                    }
                }
            )
        ])


        return [completedTask, pendingTask, activeTask, newCompleted, newPending]
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
                }
            }
        )
        return taskStatusUpdate
    }

    static async deleteTask(taskid: string, request: NextRequest) {
        const admin = await getAuthUser(request)
        const find = await prisma.task.findUnique(
            {
                where:{
                    id:taskid,
                    createdById:admin.userId
                }
            }
        )
        if(!find){
            throw new Error("Task not found")
        }

        const deleteTask = await prisma.task.delete(
            {
                where:{
                    id:taskid,
                    createdById:admin.userId
                }
            }
        )
        return deleteTask
    }

    

}
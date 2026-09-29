import { EventType } from "@/app/generated/prisma/enums";
import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export class EventService {
    static async createEvent(name: string, date: Date, startTime: Date, endTime: Date, type: EventType, request: NextRequest) {
        const admin = await getAuthUser(request)

        const adminid = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                }
            }
        )

        if (!adminid) {
            throw new Error('Event Cannot Create')
        }

        const createEvent = await prisma.event.create(
            {
                data: {
                    name,
                    date,
                    startTime,
                    endTime,
                    type,
                    adminId: admin.userId,

                }
            }
        )

        return createEvent

    }

    static async getEvent(request: NextRequest) {
        const admin = await getAuthUser(request)

        const findAdmin = await prisma.event.findFirst(
            {
                where: {
                    adminId: admin.userId
                },

            }
        )

        if (!findAdmin) {
            throw new Error("Only Admin Can Get")
        }

        const getEvent = await prisma.event.findMany(
            {
                where: {
                    adminId: admin.userId
                },
                select: {
                    id: true,
                    name: true,
                    date: true,
                    startTime: true,
                    endTime: true,
                    type: true,
                    eventMember: {
                        select: {
                            member: {
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

        return getEvent
    }

    static async createMember(eventid: string, userid: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const findAdmin = await prisma.event.findFirst(
            {
                where: {
                    adminId: admin.userId
                }
            }
        )

        if (!findAdmin) {
            throw new Error("Only Admin Can Get")
        }

        const findMember = await prisma.eventMember.findFirst(
            {
                where: {
                    memberId: userid
                }
            }
        )

        if (findMember) {
            throw new Error("User is already add")
        }

        const createMember = await prisma.eventMember.create(
            {
                data: {
                    eventId: eventid,
                    memberId: userid
                }
            }
        )

        return createMember

    }

    static async removeMember(eventid: string, userid: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const findAdmin = await prisma.event.findFirst(
            {
                where: {
                    adminId: admin.userId
                }
            }
        )

        if (!findAdmin) {
            throw new Error("Only Admin Can Get")
        }

        const removeMember = await prisma.eventMember.delete({
            where: {
                eventId_memberId: {
                    eventId: eventid,
                    memberId: userid
                }
            }
        })


        return removeMember

    }

    static async countEvent(request: NextRequest) {
        const admin = await getAuthUser(request)

        const findAdmin = await prisma.event.findFirst(
            {
                where: {
                    adminId: admin.userId
                }
            }
        )

        if (!findAdmin) {
            throw new Error("Only Admin Can Get")
        }

        const [totalEvent, totalProjectMeeting, totalDeadLine, totalPersonalMeeting] = await Promise.all([
            prisma.event.count()
            ,
            prisma.event.count(
                { where: { type: 'PROJECT_MEETING' } }
            ),
            prisma.event.count(
                { where: { type: 'DEADLINE' } }
            ),
            prisma.event.count(
                { where: { type: "PERSONAL_MEETING" } }
            ),
        ])

        const now = new Date()

        const newthisMonth = new Date(
            now.getFullYear(),
            now.getMonth(),
            1
        )

        const [newEvent, newProjectMeeting, newDeadline, newPersonalMeeting] = await Promise.all(
            [
                prisma.event.count(
                    {
                        where: {
                            createdAt: {
                                gte: newthisMonth
                            }
                        }
                    }
                ),

                prisma.event.count(
                    {
                        where: {
                            createdAt: {
                                gte: newthisMonth
                            },
                            type: 'PROJECT_MEETING'
                        }
                    }
                ),
                prisma.event.count(
                    {
                        where: {
                            createdAt: {
                                gte: newthisMonth
                            },
                            type: "DEADLINE"
                        }
                    }
                ),
                prisma.event.count(
                    {
                        where: {
                            createdAt: {
                                gte: newthisMonth
                            },
                            type: 'PERSONAL_MEETING'
                        }
                    }
                ),

            ]
        )

        return [totalEvent, totalProjectMeeting, totalDeadLine, totalPersonalMeeting, newEvent, newProjectMeeting, newDeadline, newPersonalMeeting]

    }

    static async singleEvent(eventid: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const findAdmin = await prisma.event.findFirst(
            {
                where: {
                    adminId: admin.userId
                }
            }
        )

        if (!findAdmin) {
            throw new Error("Only Admin Can Get")
        }

        const event = await prisma.event.findFirst(
            {
                where: {
                    id:eventid
                },
                select: {
                    id: true,
                    name: true,
                    date: true,
                    startTime: true,
                    endTime: true,
                    type: true,
                    eventMember: {
                        select: {
                            member: {
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
        return event
    }

}
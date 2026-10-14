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

        const findAdmin = await prisma.user.findUnique(
            {
                where: {
                    id: admin.userId
                },

            }
        )

        if (!findAdmin) {
            throw new Error("Only Admin Can Get")
        }

        const { searchParams } = new URL(request.url)
        const type = searchParams.get('eventtype')
        const startDate = searchParams.get('startdate')
        const endDate = searchParams.get('enddate')

        const getEvent = await prisma.event.findMany(
            {
                where: {
                    adminId: admin.userId,
                    ...(type && type !== 'All' ? {
                        type: type as EventType
                    } : {}),
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
                select: {
                    id: true,
                    name: true,
                    date: true,
                    startTime: true,
                    endTime: true,
                    type: true,
                    eventMember: {
                        select: {
                            id: true,
                            member: {
                                select: {
                                    user: {
                                        select: {
                                            id: true,
                                            email: true,
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

        const totalEvent = getEvent.length
        const totalPersonalMeeting = getEvent.filter(elem => elem.type === 'PERSONAL_MEETING').length
        const totalProjectMeeting = getEvent.filter(elem => elem.type === 'PROJECT_MEETING').length
        const totalDeadLine = getEvent.filter(elem => elem.type === 'DEADLINE').length

        return { totalEvent, totalPersonalMeeting, totalProjectMeeting, totalDeadLine, getEvent }
    }

    static async createMember(eventid: string, userid: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const teamMember = await prisma.teamMember.findFirst(
            {
                where: {
                    userId: userid,
                    adminId: admin.userId
                }
            }
        )

        if (!teamMember) {
            throw new Error("User is not Team member")
        }



        const createMember = await prisma.eventMember.create(
            {
                data: {
                    eventId: eventid,
                    memberId: teamMember.id
                }
            }
        )

        return createMember

    }

    static async removeMember(eventid: string, userid: string, request: NextRequest) {
        const admin = await getAuthUser(request)

        const teamMember = await prisma.teamMember.findFirst(
            {
                where: {
                    userId: userid,
                    adminId: admin.userId
                }
            }
        )

        if (!teamMember) {
            throw new Error("User is not Team member")
        }

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
                    memberId: teamMember.id
                }
            }
        })


        return removeMember

    }

    static async countEvent(request: NextRequest) {
        const admin = await getAuthUser(request)

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

        const [totalEvent, totalProjectMeeting, totalDeadLine, totalPersonalMeeting] = await Promise.all([
            prisma.event.count(
                {
                    where: {
                        adminId: admin.userId
                    }
                }
            )
            ,
            prisma.event.count(
                { where: { type: 'PROJECT_MEETING', adminId: admin.userId } }
            ),
            prisma.event.count(
                { where: { type: 'DEADLINE', adminId: admin.userId } }
            ),
            prisma.event.count(
                { where: { type: "PERSONAL_MEETING", adminId: admin.userId } }
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
                            },
                            adminId: admin.userId
                        }
                    }
                ),

                prisma.event.count(
                    {
                        where: {
                            createdAt: {
                                gte: newthisMonth
                            },
                            type: 'PROJECT_MEETING',
                            adminId: admin.userId
                        }
                    }
                ),
                prisma.event.count(
                    {
                        where: {
                            createdAt: {
                                gte: newthisMonth
                            },
                            type: "DEADLINE",
                            adminId: admin.userId
                        }
                    }
                ),
                prisma.event.count(
                    {
                        where: {
                            createdAt: {
                                gte: newthisMonth
                            },
                            type: 'PERSONAL_MEETING',
                            adminId: admin.userId
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
                    id: eventid
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
                            id: true,
                            member: {
                                select: {
                                    user: {
                                        select: {
                                            id: true,
                                            email: true,
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
        return event
    }

}
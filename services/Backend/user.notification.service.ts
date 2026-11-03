import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { NextRequest } from "next/server";

export default class UserNotificationService {

    static async MarkAllRead(request: NextRequest) {
        const user = await getAuthUser(request)

        const markAllRead = await prisma.notification.updateMany(
            {
                where: {
                    userId: user.userId,
                    isRead: false
                },
                data: {
                    isRead: true
                }
            }
        )

        return markAllRead
    }

    static async SingleMark(request: NextRequest, id: string) {
        const user = await getAuthUser(request)

        const singleMark = await prisma.notification.update(
            {
                where: {
                    id: id,
                    isRead: false,
                    userId: user.userId
                },
                data: {
                    isRead: true
                }
            }
        )

        return singleMark
    }

    static async DeleteSingle(request: NextRequest, id: string) {
        const user = await getAuthUser(request)

        const deleteSingle = await prisma.notification.delete(
            {
                where: {
                    id: id,
                    userId: user.userId
                },
            }
        )

        return deleteSingle
    }

}
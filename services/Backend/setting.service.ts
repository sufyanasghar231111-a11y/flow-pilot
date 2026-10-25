import { getAuthUser } from "@/libs/auth/auth";
import prisma from "@/libs/db";
import { AppError } from "@/utils/AppError";
import { NextRequest } from "next/server";

export class SettingService {

    static async timeZoneSetting(request: NextRequest, timeZone?: string, dateFormat?: string) {
        const admin = await getAuthUser(request)
        const allowedTimeZone = new Set([
            "Asia/Karachi",
            "UTC",
            "Europe/London",
            "America/New_York",
            "Asia/Dubai",
            "Asia/Tokyo",
            "Asia/Kolkata",
            "Europe/Paris",
            "America/Los_Angeles",
            "Australia/Sydney"
        ]);

        const allowedDateFormat = new Set([
            'YYYY-MM-DD',
            'MM-DD-YYYY',
            'DD-MM-YYYY',
            'DD-MMM-YYYY',
            'MMM DD, YYYY'
        ])

        if (timeZone !== undefined) {
            if (typeof timeZone !== 'string' || !allowedTimeZone.has(timeZone)) {
                throw new AppError('Invalid Time zone', 400)
            }
        }

        if (dateFormat !== undefined) {
            if (typeof dateFormat !== 'string' || !allowedDateFormat.has(dateFormat)) {
                throw new AppError('Invalid Date Format', 400)
            }
        }


        const user = await prisma.user.update(
            {
                where: {
                    id: admin.userId
                },
                data: {
                    ...(timeZone !== undefined && { timeZone }),
                    ...(dateFormat !== undefined && { dateFormat }),
                },
                select: {
                    id: true, username: true, email: true, timeZone: true, dateFormat: true
                }
            }
        )

        return user

    }
}
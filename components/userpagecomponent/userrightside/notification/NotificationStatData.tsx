"use client"
import { useAppSelector } from "@/hooks/reduxhooks";
import { RiCalendarCheckFill, RiMailCheckFill, RiMailUnreadFill, RiNotification3Fill } from "@remixicon/react";

export default function NotificationStatData() {
    const { userNotification } = useAppSelector((state) => state.userNotification)



    const data = [
        {
            name: 'Total Notifications',
            total: userNotification?.totalNotification,
            icon: RiNotification3Fill,
            new: userNotification?.totalPercentage,
            text: 'text-blue-500',
            hover: 'hover:border-blue-500/30 hover:bg-blue-500/5',
            compare: 'last week'
        },
        {
            name: 'Unread Notifications',
            total: userNotification?.notRead,
            icon: RiMailUnreadFill,
            new: userNotification?.totalUnReadPercentage,
            text: 'text-indigo-500',
            hover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
            compare: 'last week'
        },
        {
            name: 'Read Notifications',
            total: userNotification?.read,
            icon: RiMailCheckFill,
            new: userNotification?.totalReadPercentage,
            text: 'text-emerald-500',
            hover: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
            compare: 'last week'
        },
        {
            name: 'Today',
            total: userNotification?.todayData,
            icon: RiCalendarCheckFill,
            new: userNotification?.totalTodayPercentage,
            text: 'text-amber-500',
            hover: 'hover:border-amber-500/30 hover:bg-amber-500/5',
            compare: 'yesterday'
        },
    ]

    return data
}
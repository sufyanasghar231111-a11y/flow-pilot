"use client"
import {  useAppSelector } from "@/hooks/reduxhooks";
import { RiCalendarCheckFill, RiMailCheckFill, RiMailUnreadFill, RiNotification3Fill } from "@remixicon/react";

export default function NotificationStatData() {
    
    const { notificationStat } = useAppSelector((state) => state.notificationStat)

    const data = [
        {
            name: 'Total Notifications',
            total: notificationStat.totalNotification,
            icon: RiNotification3Fill,
            new: notificationStat.totalComparePercentage,
            text: 'text-blue-500',
            hover: 'hover:border-blue-500/30 hover:bg-blue-500/5',
            compare:'last week'
        },
        {
            name: 'Unread Notifications',
            total: notificationStat.totalunread,
            icon: RiMailUnreadFill,
            new: notificationStat.totalUnReadComparePercentage,
            text: 'text-indigo-500',
            hover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
            compare:'last week'
        },
        {
            name: 'Read Notifications',
            total: notificationStat.totalread,
            icon: RiMailCheckFill,
            new: notificationStat.totalReadComparePercentage,
            text: 'text-emerald-500',
            hover: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
            compare:'last week'
        },
        {
            name: 'Today',
            total: notificationStat.totaltoday,
            icon: RiCalendarCheckFill,
            new: notificationStat.totalTodayPercentage,
            text: 'text-amber-500',
            hover: 'hover:border-amber-500/30 hover:bg-amber-500/5',
            compare:'yesterday'
        },
    ]

    return data
}
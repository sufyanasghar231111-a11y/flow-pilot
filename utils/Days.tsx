"use client"
import { useAuth } from '@/contexts/authContext/AuthContext'
import { useEventUi } from '@/contexts/eventcontext/EventContext'
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'
import { TZDate } from "@date-fns/tz";

export default function Days() {
    const { months } = useEventUi()
    const { user } = useAuth()
    const now = new Date(months)
    const timeZone = user?.timeZone ?? 'Asia/Karachi'
    const dateTimeZone = new TZDate(
        now.getFullYear(),
        now.getMonth(),
        1,
        timeZone
    )

    const monthStart = startOfMonth(dateTimeZone)
    const monthEnd = endOfMonth(dateTimeZone)

    const firstDay = getDay(monthStart)

    const emptyDay = Array(firstDay).fill(null)

    const monthDays = eachDayOfInterval({
        start: monthStart,
        end: monthEnd
    })

    const days = [...emptyDay, ...monthDays]

    return days
}
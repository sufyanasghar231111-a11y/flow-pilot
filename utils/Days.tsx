"use client"
import { useEventUi, useEventUi2 } from '@/contexts/eventcontext/EventContext'
import { startOfMonth, endOfMonth, eachDayOfInterval, getDay } from 'date-fns'

export default function Days() {
    const { months } = useEventUi()

    const monthStart = startOfMonth(months)
    const monthEnd = endOfMonth(months)

    const firstDay = getDay(monthStart)

    const emptyDay = Array(firstDay).fill(null)

    const monthDays = eachDayOfInterval({
        start: monthStart,
        end: monthEnd
    })

    const days = [...emptyDay, ...monthDays]

    return days
}

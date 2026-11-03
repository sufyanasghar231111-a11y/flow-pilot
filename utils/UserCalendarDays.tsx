"use client"
import { useAuth } from "@/contexts/authContext/AuthContext";
import { useEventUi2 } from "@/contexts/eventcontext/EventContext";
import { TZDate } from "@date-fns/tz";
import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";

export default function UserCalendarDays() {

    const { user } = useAuth()
    const { minCalendarMonths } = useEventUi2()

    const now = new Date(minCalendarMonths)
    const timeZone = user?.timeZone ?? 'Asia/Karachi'
    const timeZoneDay = new TZDate(
        now.getFullYear(),
        now.getMonth(),
        1,
        timeZone
    )

    const monthStart = startOfMonth(timeZoneDay)
    const monthEnd = endOfMonth(timeZoneDay)

    const firstDay = getDay(monthStart)
    const emptyDay = Array(firstDay).fill(null)

    const monthDay = eachDayOfInterval({
        start:monthStart,
        end:monthEnd
    })

    return [...emptyDay, ...monthDay]

}
import { useEventUi2 } from "@/contexts/eventcontext/EventContext";
import { eachDayOfInterval, endOfMonth, getDay, startOfMonth } from "date-fns";

export default function MinCalendarDays() {
    const { minCalendarMonths } = useEventUi2()

    const monthStart = startOfMonth(minCalendarMonths)
    const monthEnd = endOfMonth(minCalendarMonths)

    const firstDay = getDay(monthStart)

    const emptyIndex = Array(firstDay).fill(null)

    const monthDays = eachDayOfInterval({
        start: monthStart,
        end: monthEnd
    })

    const dates = [...emptyIndex, ...monthDays]
    return dates
}
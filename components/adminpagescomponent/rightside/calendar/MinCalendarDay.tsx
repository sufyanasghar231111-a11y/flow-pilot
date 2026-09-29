import { format, isToday } from "date-fns";

export default function MinCalendarDay({ day }: { day: Date }) {

    return (
        <div>
            <div className={`text-sm  rounded-full w-7 h-7 ${isToday(day) ? 'bg-blue-500':''} flex items-center justify-center font-semibold`}>{format(day, "d")}</div>
        </div>
    )
}
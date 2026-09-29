import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import MinCalendarDay from "./MinCalendarDay";
import { useEventUi2 } from "@/contexts/eventcontext/EventContext";
import MinCalendarDays from "@/utils/MinCalendarDays";
import { format } from "date-fns";

export default function MinCalendar() {
    const {minCalendarMonths, setMinCalendarMonths } = useEventUi2()

    function handleMonthNext() {
        setMinCalendarMonths(prev =>
            new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        )
    }

    function handleMonthPrev() {
        setMinCalendarMonths(prev =>
            new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        )
    }

    const days = MinCalendarDays()

    return (
        <div className="bg-[#252938] w-full px-2 py-2 rounded-md">
            <div className=" flex items-center justify-between">
                <h1 className="text-sm font-semibold">{format(minCalendarMonths, 'MMMM yyyy')}</h1>
                <div className=" flex gap-2">
                    <div onClick={() => { handleMonthPrev() }} className="border rounded border-gray-400 hover:border-gray-500">
                        <RiArrowLeftSLine className="w-5 h-5 text-gray-400" />
                    </div>
                    <div onClick={() => { handleMonthNext() }} className="border rounded border-gray-400 hover:border-gray-500">
                        <RiArrowRightSLine className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((elem, index) => (
                    <div
                        key={index}
                        className="py-3 text-center text-[11px] sm:text-xs  tracking-wider text-gray-400"
                    >
                        {elem}
                    </div>
                ))}
            </div>
            <div className=" grid grid-cols-7 gap-2 pr-2">
                {
                    days.map((day, index: number) => {
                        return <div key={day ? day.toISOString() : `empty-${index}`}>
                            {day && <MinCalendarDay day={day} />}
                        </div>
                    })
                }
            </div>
        </div>
    )
}
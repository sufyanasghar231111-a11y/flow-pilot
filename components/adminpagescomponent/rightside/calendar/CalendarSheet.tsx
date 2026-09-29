"use client"
import Days from "@/utils/Days";
import CalendarDay from "./CalendarDay";
import MonthChange from "./MonthChange";
import { useProject } from "@/hooks/useProject";
import { useEvent } from "@/contexts/eventcontext/EventContext";
import MinCalendar from "./MinCalendar";
import EventDetail from "./EventDetail.";
import EventSummary from "./EventSummary";


export default function CalendarSheet() {
    const { getProject } = useProject()
    const { eventData } = useEvent()

    const data = [
        ...eventData.map((elem) => ({
            ...elem,
            types: 'event',
            calendarDate: elem.date
        })),
        ...getProject.map((elem) => ({
            ...elem,
            types: 'project',
            calendarDate: elem.deadline,
        }))
        ,
        ...getProject.map((elem) => ({
            ...elem,
            types: 'projects',
            calendarDate: elem.completedAt,
        }))
    ]
    const days = Days()


    return (
        <div className="px-3 w-full pt-4 pb-5 flex gap-2 bg-[#11131D]">
            <div className=" w-[76%] bg-[#171A26] border border-[#252938] rounded-xl px-3 py-3 shadow-lg shadow-black/20">
                <MonthChange />

                {/* Weekday header */}
                <div className="grid grid-cols-7 overflow-hidden rounded-t-xl border border-[#252938] bg-[#0F111A]">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((elem, index) => (
                        <div
                            key={index}
                            className="py-3 text-center text-[11px] sm:text-xs font-semibold  tracking-wider text-gray-500"
                        >
                            {elem}
                        </div>
                    ))}
                </div>

                {/* Days grid */}
                <div className="grid grid-cols-7 overflow-hidden rounded-b-xl border-x border-b border-[#252938] bg-[#171A26]">
                    {days.map((day, index) => (
                        <div
                            key={day ? day.toISOString() : `empty-${index}`}
                            className="min-w-0 min-h-[80px] sm:min-h-[110px]  border-[#252938] nth-[7n]:border-r-0"
                        >
                            {day && <CalendarDay data={data} day={day} />}
                        </div>
                    ))}
                </div>
            </div>
            <div className="w-[24%] flex flex-col gap-3">
                <MinCalendar />
                <EventDetail data={data} />
                <EventSummary />
            </div>
        </div>
    );
}
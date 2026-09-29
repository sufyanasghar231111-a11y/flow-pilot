"use client"
import {  useEventUi2 } from "@/contexts/eventcontext/EventContext";
import { format, isToday } from "date-fns";
import CalendarEvent from "./CalendarEvent";

export default function CalendarDay({ day, data }: { day: Date }) {

    const dayEvent = data.filter((elem: { calendarDate: string | number | Date; }) => {
        if (!elem.calendarDate) return false

        return (
            format(new Date(elem.calendarDate), "yyyy-MM-dd") === format(day, 'yyyy-MM-dd')
        )
    })

    const { setSingleDayModal, setDayDate, setDayData } = useEventUi2()

    const dayItems = data.filter((elem: { calendarDate: string | number | Date; }) => {
        const date = new Date(elem.calendarDate)

        return (
            date.getFullYear() === day.getFullYear() &&
            date.getMonth() === day.getMonth() &&
            date.getDate() === day.getDate()
        )
    })

    function openDayModal(day: Date, items: typeof data) {
        setDayDate(day)
        setDayData(items)
        setSingleDayModal(true)
    }

    return (

        <div
            className={` lg:min-h-[160px] h-full min-w-0 border-r border-b py-2 px-0.5 transition-colors border-[#252938] hover:bg-[#1A1D2B] bg-[#0e101d]`}
        >
            <div className={`text-sm px-4 ${isToday(day)? 'text-blue-500':''} py-1 font-semibold mb-1`}>{format(day, "d")}</div>

            <div className="flex flex-col gap-2 min-w-0">
                {dayEvent.slice(0, 1).map((elem) => {
                    return (
                        <>
                            {elem.types === "event" && (
                                <CalendarEvent elem={elem} />
                            )}

                            {elem.types === "project" && (
                                <div className="w-full min-w-0 border bg-red-600/10 border-red-500/20 rounded-md px-1 py-1.5 text-red-300">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-red-600"></span>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[10px] opacity-80">Project Deadline</div>
                                            <h1 className="text-xs font-medium truncate">{elem.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {elem.types === "projects" && (
                                <div className="w-full min-w-0 border bg-green-600/10 border-green-500/20 rounded-md px-2 py-1.5 text-green-300">
                                    <div className="flex items-center gap-2 min-w-0">
                                        <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-green-600"></span>
                                        <div className="min-w-0 flex-1">
                                            <div className="text-[10px] opacity-80">Complete</div>
                                            <h1 className="text-xs font-medium truncate">{elem.name}</h1>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    );
                })}
            </div>

            {dayEvent.length > 1 ? (
                <div
                    onClick={() => {

                        openDayModal(day, dayItems);
                    }}
                    className="text-xs text-gray-400 hover:text-gray-200 pt-2 cursor-pointer transition-colors"
                >
                    see more {dayEvent.length - 1}+
                </div>
            ) : null}
        </div>
    )
}
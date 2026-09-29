"use client"
import { useEventUi } from "@/contexts/eventcontext/EventContext"
import { RiAddLine, RiCalendar2Line } from "@remixicon/react"

export default function CalendarHeader() {
    const { setEvenCreationModal }= useEventUi()
    return (
        <div className="pt-23 px-3 flex items-center justify-between">
            <div className=" flex items-center gap-4">
                <RiCalendar2Line className="text-blue-500 w-7 h-7" />
                <div>
                    <h1 className="text-2xl text-[#f5f4f4]">Calendar</h1>
                    <h1 className="text-sm text-[#bebebe]">Manage Your Projects, tasks and team activities all in one place</h1>
                </div>
            </div>
            <button onClick={()=>{setEvenCreationModal(true)}} className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
                <RiAddLine className="h-5 w-5" />
                <span className="text-sm font-medium">Add Event</span>
            </button>
        </div>
    )
}
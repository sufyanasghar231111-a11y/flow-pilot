import { RiCalendar2Line } from "@remixicon/react"

export default function CalendarHeader() {
    return (
        <div className="pt-23 px-3 flex items-center justify-between">
            <div className=" flex items-center gap-4">
                <RiCalendar2Line className="text-blue-500 w-7 h-7" />
                <div>
                    <h1 className="text-2xl text-[#f5f4f4]">Calendar</h1>
                    <h1 className="text-sm text-[#bebebe]">Manage Your Projects, tasks and team activities all in one place</h1>
                </div>
            </div>
        </div>
    )
}
import { TimeAgo } from "@/utils/TimeAgo"
import { format } from "date-fns"


type Calendar = { calendarDate: string | number | Date }

export default function EventDetail({ data }) {
    const today = new Date()
    today.setHours(0, 0, 0, 0)


    const upcomingEvent = data.filter((elem: Calendar) => {
        const upComingDate = new Date(elem.calendarDate)
        upComingDate.setHours(0, 0, 0, 0)
        return (upComingDate >= today)

    }).sort((a: Calendar, b: Calendar) => new Date(a.calendarDate).getTime() - new Date(b.calendarDate).getTime())


    return (
        <div className="bg-[#252938] w-full    rounded-md">
            <header className="flex items-center px-4 justify-between">
                <h1 className="text-sm font-semibold py-3">Upcoming Event</h1>
                <h1 className="text-xs text-blue-400">View All</h1>
            </header>
            <div className="h-85 overflow-auto custom-scrollbar">
                {
                    upcomingEvent.map((elem) => {
                        return <>
                            {elem.types === 'event' && (
                                <div key={`${elem.types}-${elem.id}`} className=" flex items-center justify-between  hover mt-3 px-3 py-1">
                                    <div className="flex items-center gap-2">
                                        <div className={`p-1.25 rounded-full ${elem.type === "PROJECT_MEETING" && "bg-purple-500"}
                                            ${elem.type === "DEADLINE" && "bg-red-700"}
                                             ${elem.type === "PERSONAL_MEETING" && "bg-blue-600"}`}></div>
                                        <div>
                                            <div className="text-sm w-35 truncate">{elem.name}</div>
                                            <div className="text-[10px] font-semibold "> {format(new Date(elem.startTime), 'hh-mm a')} - {format(new Date(elem.endTime), 'hh-mm a')}</div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-semibold "><TimeAgo time={elem.date} /></div>
                                    
                                </div>
                            )}
                            {elem.types === 'project' && (
                                <div key={`${elem.types}-${elem.id}`} className=" flex items-center justify-between  hover mt-3 px-3 py-1">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.25 rounded-full bg-red-500"></div>
                                        <div>
                                            <div className="text-sm font-semibold ">project deadline</div>
                                            <div className="text-sm w-35 truncate">{elem.name}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-300"><TimeAgo time={elem.deadline} /></div>
                                    </div>

                                </div>
                            )}
                            {elem.types === 'projects' && (
                                <div key={`${elem.types}-${elem.id}`} className=" flex items-center justify-between  hover mt-3 px-3 py-1">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.25 rounded-full bg-green-500"></div>
                                        <div>
                                            <div className="text-sm font-semibold ">project completion</div>
                                            <div className="text-sm w-35 truncate">{elem.name}</div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-[10px] text-gray-300"><TimeAgo time={elem.completedAt} /></div>
                                    </div>

                                </div>
                            )}
                        </>
                    })
                }
            </div>

        </div>

    )
}
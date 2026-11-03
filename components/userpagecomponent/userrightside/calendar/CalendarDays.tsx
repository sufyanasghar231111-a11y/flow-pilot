import { useAuth } from "@/contexts/authContext/AuthContext"
import { isToday } from "date-fns"
import { CalendarData } from "./AllCalendarDay"
import { IsEventOnDay, TimeInHour, TimeZone } from "@/utils/TimeAgo"
import { Names } from "@/components/nameComponent/Names"
import { useModalEvent } from "@/contexts/userMemberContext/UserMemberContext"

type PropCalendar = {
    day: Date,
    data: CalendarData[]
}


export default function CalendarDays({ day, data }: PropCalendar) {
    const { user } = useAuth()
    const format = new Date(day)
    const timeZone = user?.timeZone ?? 'Asia/Karachi'
    const { setAllDataModal, setDayData, setDayDate } = useModalEvent()

    const eventDaysData = data.filter((elem) => {
        if (!elem.date) return false
        return IsEventOnDay(elem.date, format, timeZone)
    })


    const days = new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        timeZone: user?.timeZone ?? 'Asia/Karachi'
    }).format(format)

    function openModal(day: Date, eventData: typeof data) {
        setDayDate(day)
        setDayData(eventData)
        setAllDataModal(true)
    }


    return (
        <div className=" w-full h-full border border-b p-2  border-[#2f354d]">
            <div className={`font-semibold ${isToday(day) && 'text-blue-700'} mb-1`}>
                {days}
            </div>
            <div className="flex flex-col gap-2">
                {
                    eventDaysData.slice(0, 2)?.map((elem) => {
                        return <div className=" " key={elem.id}>
                            {
                                elem.types === 'complete-project' && (
                                    <div className="border rounded border-green-500 bg-red-500/10 px-2 py-1  ">
                                        <div className=" flex items-center gap-2 text-xs">
                                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                            <h1 className="w-27 truncate">{elem.name}</h1>
                                        </div>
                                        <div className="text-xs ">
                                            <TimeZone timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} time={elem.completedAt} />
                                        </div>
                                    </div>
                                )
                            }
                            {
                                elem.types === 'deadline-project' && (
                                    <div className="border rounded border-red-500 bg-red-500/10 px-2 py-1  ">
                                        <div className=" flex items-center gap-2 text-xs">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            <h1 className="w-27 truncate">{elem.name}</h1>
                                        </div>
                                        <div className="text-xs ">
                                            <TimeZone timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} time={elem.deadline} />
                                        </div>
                                    </div>
                                )
                            }
                            {
                                elem.types === 'due-task' && (
                                    <>
                                        <div className=" border rounded border-amber-500 bg-amber-500/10 px-2 py-1 ">
                                            <div className="flex items-center gap-2 text-xs ">
                                                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                                                <h1 className="w-27 truncate">{elem.name}</h1>
                                            </div>
                                            <div className="text-xs ">
                                                <TimeZone timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} time={elem.dueDate} />
                                            </div>
                                        </div>
                                    </>
                                )
                            }
                            {
                                elem.types === 'event' && (
                                    <>
                                        <div className={` border rounded  px-2 py-1  ${elem.type === 'PERSONAL_MEETING' && 'bg-purple-500/10 border-purple-500'} ${elem.type === 'DEADLINE' && 'bg-red-500/10 border-red-500'} ${elem.type === 'PROJECT_MEETING' && 'bg-blue-500/10 border-blue-500'}`}>
                                            <div className={`text-xs flex items-center gap-2 `}>
                                                <span className={`w-2 h-2 rounded-full ${elem.type === 'PERSONAL_MEETING' && ' bg-purple-500'} ${elem.type === 'DEADLINE' && 'bg-red-500'} ${elem.type === 'PROJECT_MEETING' && 'bg-blue-500'} `}></span>
                                                <h1 className="w-27 truncate">{elem.name}</h1>
                                            </div>
                                            <div className="text-xs ">
                                                <TimeInHour time={elem.startTime} timeZone={user?.timeZone ?? 'Asia/Karachi'} /> - <TimeInHour time={elem.endTime} timeZone={user?.timeZone ?? 'Asia/Karachi'} />
                                            </div>
                                        </div>
                                        <div className="flex items-center py-1.5 -space-x-1">
                                            {
                                                elem.eventMember?.slice(0, 3)?.map((elem) => {
                                                    return <div key={elem.member.user.id} className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                                                        <Names userName={elem.member.user.username} />
                                                    </div>
                                                })
                                            }
                                            {
                                                (elem.eventMember?.length || 0) > 3 && (
                                                    <div className="w-5 h-5 rounded-full bg-gray-600 flex items-center justify-center text-xs">
                                                        +{(elem.eventMember?.length || 0) - 3}
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </>
                                )
                            }
                        </div>
                    })
                }
            </div>
            {
                eventDaysData.length > 2 && (
                    <div onClick={() => { openModal(day, eventDaysData) }} className="pt-2 text-xs text-gray-400 hover:text-gray-300 cursor-pointer">
                        see more +{eventDaysData.length - 2}
                    </div>
                )
            }
        </div>
    )
}
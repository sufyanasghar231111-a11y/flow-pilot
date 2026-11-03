"use client"
import { useAuth } from "@/contexts/authContext/AuthContext"
import { useModalEvent } from "@/contexts/userMemberContext/UserMemberContext"
import { TimeInHour, TimeZone } from "@/utils/TimeAgo"

export default function CalendarDataByDay() {

    const { dayDate, dayData, allDataModal, setAllDataModal } = useModalEvent()
    const { user } = useAuth()
    return (
        <>
            {
                allDataModal && (
                    <>
                        <div onClick={() => { setAllDataModal(false) }}
                            className="fixed inset-0 z-[299] bg-black/60 backdrop-blur-sm"
                        />

                        <div className="fixed top-1/2 left-1/2 z-[300] flex w-[380px]  max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-white/10 bg-[#171A26] p-5 text-white shadow-2xl">
                            <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                        Schedule
                                    </p>

                                    <h1 className="mt-1 text-xl font-semibold">
                                        <TimeZone time={dayDate} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} />
                                    </h1>
                                </div>

                                <button
                                    onClick={() => setAllDataModal(false)}
                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                                >
                                    ✕
                                </button>

                            </div>
                            <div className="flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1">
                                {dayData.map((elem) => {
                                    return <div key={elem.id}>
                                        {
                                            elem.types === 'deadline-project' && (
                                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 transition hover:border-red-500/40 hover:bg-red-500/15">

                                                    <div className="flex items-start gap-3">

                                                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />

                                                        <div className="min-w-0">

                                                            <span className="text-[11px] font-semibold uppercase tracking-wide text-red-400">
                                                                Project Deadline
                                                            </span>

                                                            <div className=" flex items-center justify-between w-full gap-5">

                                                                <p className="mt-1 truncate w-50 text-sm font-medium text-white">
                                                                    {elem.name}
                                                                </p>
                                                                <div className="text-[10px]">
                                                                    <TimeZone time={elem?.deadline} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} />
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        }
                                        {
                                            elem.types === 'complete-project' && (
                                                <div className="rounded-xl border border-green-500/20 bg-green-500/10 p-3 transition hover:border-green-500/40 hover:bg-green-500/15">

                                                    <div className="flex items-start gap-3">

                                                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-green-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />

                                                        <div className="min-w-0">

                                                            <span className="text-[11px] font-semibold uppercase tracking-wide text-red-400">
                                                                Project Completion
                                                            </span>

                                                            <div className=" flex items-center justify-between w-full gap-5">

                                                                <p className="mt-1 truncate w-50 text-sm font-medium text-white">
                                                                    {elem.name}
                                                                </p>
                                                                <div className="text-[10px]">
                                                                    <TimeZone time={elem?.completedAt} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} />
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        }
                                        {
                                            elem.types === 'due-task' && (
                                                <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 transition hover:border-amber-500/40 hover:bg-amber-500/15">

                                                    <div className="flex items-start gap-3">

                                                        <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />

                                                        <div className="min-w-0">

                                                            <span className="text-[11px] font-semibold uppercase tracking-wide text-amber-400">
                                                                Task Deadline
                                                            </span>

                                                            <div className=" flex items-center justify-between w-full gap-5">

                                                                <p className="mt-1 truncate w-50 text-sm font-medium text-white">
                                                                    {elem.name}
                                                                </p>
                                                                <div className="text-[10px]">
                                                                    <TimeZone time={elem?.dueDate} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} />
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        }
                                        {
                                            elem.types === 'event' && (
                                                <div className={`rounded-xl border p-3 transition ${elem.type === 'PERSONAL_MEETING' && 'border-purple-500/20 bg-purple-500/10  hover:border-purple-500/40 hover:bg-purple-500/15'} ${elem.type === 'DEADLINE' && 'border-red-500/20 bg-red-500/10 hover:border-red-500/40 hover:bg-red-500/15'} ${elem.type === 'PROJECT_MEETING' && 'border-blue-500/20 bg-blue-500/10 hover:border-blue-500/40 hover:bg-blue-500/15'} `}>

                                                    <div className="flex items-start gap-3">

                                                        <div className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${elem.type === 'PERSONAL_MEETING' && 'bg-purple-500'} ${elem.type === 'DEADLINE' && 'bg-red-500'} ${elem.type === 'PROJECT_MEETING' && 'bg-blue-500'} `} />

                                                        <div className="min-w-0">

                                                            <span className={`text-[11px] font-semibold uppercase tracking-wide ${elem.type === 'PERSONAL_MEETING' && 'text-purple-500'} ${elem.type === 'DEADLINE' && 'text-red-500'} ${elem.type === 'PROJECT_MEETING' && 'text-blue-500'}   `}>
                                                                {
                                                                    elem.type === 'DEADLINE' && (
                                                                        <div>Deadline Event</div>
                                                                    )
                                                                }
                                                                {
                                                                    elem.type === 'PERSONAL_MEETING' && (
                                                                        <div>Personal Meeting Event</div>
                                                                    )
                                                                }
                                                                {
                                                                    elem.type === 'PROJECT_MEETING' && (
                                                                        <div>Project Meeting Event</div>
                                                                    )
                                                                }
                                                            </span>

                                                            <div className=" flex items-center justify-between w-full gap-5">

                                                                <p className="mt-1 truncate w-50 text-sm font-medium text-white">
                                                                    {elem.name}
                                                                </p>
                                                                <div className="text-[10px] flex flex-col ">
                                                                    <div>
                                                                    <TimeZone time={elem?.date} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} />
                                                                    </div>
                                                                    <div className="text-[9px] w-20 truncate">
                                                                    <TimeInHour time={elem.startTime} timeZone={user?.timeZone ?? 'Asia/Karachi'} />-<TimeInHour time={elem.endTime} timeZone={user?.timeZone ?? 'Asia/Karachi'} />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        }
                                    </div>
                                })}
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
"use client"

import { useEventUi2 } from "@/contexts/eventcontext/EventContext"
import { TimeAgo } from "@/utils/TimeAgo"
import { format } from "date-fns"

export default function ParticularEventModal() {
    const {
        singleDayModal,
        setSingleDayModal,
        dayDate,
        dayData
    } = useEventUi2()

    return (
        <>
            {singleDayModal && (
                <>
                    <div
                        onClick={() => setSingleDayModal(false)}
                        className="fixed inset-0 z-[300] bg-black/60 backdrop-blur-sm"
                    />

                    <div className="fixed top-1/2 left-1/2 z-[301] flex w-[380px]  max-w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 flex-col rounded-2xl border border-white/10 bg-[#171A26] p-5 text-white shadow-2xl">

                        <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-4">

                            <div>
                                <p className="text-xs font-medium uppercase tracking-wider text-gray-500">
                                    Schedule
                                </p>

                                <h1 className="mt-1 text-xl font-semibold">
                                    {format(dayDate, "d MMMM yyyy")}
                                </h1>
                            </div>

                            <button
                                onClick={() => setSingleDayModal(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-white/10 hover:text-white"
                            >
                                ✕
                            </button>

                        </div>

                        <div className="flex max-h-[360px] flex-col gap-3 overflow-y-auto pr-1">

                            {dayData.length === 0 ? (
                                <div className="py-8 text-center text-sm text-gray-500">
                                    No events for this day
                                </div>
                            ) : (
                                dayData.map((elem, index) => (

                                    <div key={index}>

                                        {/* ================= EVENT ================= */}
                                        {elem.types === "event" && (
                                            <div
                                                className={`
                                                    group rounded-xl border p-3 transition
                                                    ${elem.type === "PROJECT_MEETING"
                                                        ? "border-purple-500/20 bg-purple-600/10 hover:border-purple-500/40 hover:bg-purple-600/15"
                                                        : ""
                                                    }
                                                    ${elem.type === "DEADLINE"
                                                        ? "border-red-500/20 bg-red-600/10 hover:border-red-500/40 hover:bg-red-600/15"
                                                        : ""
                                                    }
                                                    ${elem.type === "PERSONAL_MEETING"
                                                        ? "border-blue-500/20 bg-blue-600/10 hover:border-blue-500/40 hover:bg-blue-600/15"
                                                        : ""
                                                    }
                                                `}
                                            >

                                                <div className="flex items-start gap-3">

                                                    <div
                                                        className={`
                                                            mt-1 h-2.5 w-2.5 shrink-0 rounded-full
                                                            ${elem.type === "PROJECT_MEETING"
                                                                ? "bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.7)]"
                                                                : ""
                                                            }
                                                            ${elem.type === "DEADLINE"
                                                                ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]"
                                                                : ""
                                                            }
                                                            ${elem.type === "PERSONAL_MEETING"
                                                                ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.7)]"
                                                                : ""
                                                            }
                                                        `}
                                                    />

                                                    <div className="min-w-0">

                                                        <span
                                                            className={`
                                                                text-[11px] font-semibold uppercase tracking-wide
                                                                ${elem.type === "PROJECT_MEETING"
                                                                    ? "text-purple-400"
                                                                    : ""
                                                                }
                                                                ${elem.type === "DEADLINE"
                                                                    ? "text-red-400"
                                                                    : ""
                                                                }
                                                                ${elem.type === "PERSONAL_MEETING"
                                                                    ? "text-blue-400"
                                                                    : ""
                                                                }
                                                            `}
                                                        >
                                                            {elem.type === "PROJECT_MEETING"
                                                                ? "Project Meeting"
                                                                : elem.type === "DEADLINE"
                                                                    ? "Deadline"
                                                                    : "Personal Meeting"}
                                                        </span>

                                                        <div className=" flex items-center justify-between">

                                                            <p className="mt-1 truncate w-40 text-sm font-medium text-white">
                                                                {elem.name}
                                                            </p>
                                                            <div className="text-[10px]">
                                                                {format(new Date(elem.startTime), 'hh:mm a')} - {format(new Date(elem.endTime), 'hh:mm a')}
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        )}

                                        {/* ================= PROJECT DEADLINE ================= */}
                                        {elem.types === "project" && (
                                            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 transition hover:border-red-500/40 hover:bg-red-500/15">

                                                <div className="flex items-start gap-3">

                                                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />

                                                    <div className="min-w-0">

                                                        <span className="text-[11px] font-semibold uppercase tracking-wide text-red-400">
                                                            Project Deadline
                                                        </span>

                                                        <div className=" flex items-center justify-between gap-5">

                                                            <p className="mt-1 truncate w-40 text-sm font-medium text-white">
                                                                {elem.name}
                                                            </p>
                                                            <div className="text-[10px]">
                                                                <TimeAgo time={elem.deadline} />
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        )}

                                        {/* ================= PROJECT COMPLETED ================= */}
                                        {elem.types === "projects" && (
                                            <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/10 p-3 transition hover:border-emerald-400/40 hover:bg-emerald-500/15">

                                                <div className="flex items-start gap-3">

                                                    <div className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />

                                                    <div className="min-w-0">

                                                        <span className="text-[11px] font-semibold uppercase tracking-wide text-emerald-400">
                                                            Project Completed
                                                        </span>
                                                        <div className=" flex items-center justify-between gap-5">

                                                            <p className="mt-1 truncate w-45 text-sm font-medium text-white">
                                                                {elem.name}
                                                            </p>
                                                            <div className="text-[10px]">
                                                                <TimeAgo time={elem.completedAt} />
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        )}

                                    </div>
                                ))
                            )}

                        </div>

                    </div>
                </>
            )}
        </>
    )
}
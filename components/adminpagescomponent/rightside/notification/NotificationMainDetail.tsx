"use client"
import { useAppSelector } from "@/hooks/reduxhooks"

import { RiCalendarEventFill, RiCheckboxCircleFill, RiErrorWarningFill, RiMoreLine, RiNotification3Line, RiTimeFill } from "@remixicon/react"
import { formatDistanceToNowStrict } from "date-fns"
import NotificationPagination from "./NotificationPagination"
import NotificationMoreModal from "@/modals/NotificationMoreModal"
import { useState } from "react"

const notificationType = {
    EVENT_REMINDER: {
        style: 'bg-purple-500/10 text-purple-400',
        icon: RiCalendarEventFill
    },
    TASK_COMPLETED: {
        style: 'bg-emerald-500/10 text-emerald-400',
        icon: RiCheckboxCircleFill
    },
    TASK_OVERDUE: {
        style: 'bg-red-500/10 text-red-400',
        icon: RiErrorWarningFill
    },
    PROJECT_DEADLINE: {
        style: 'bg-amber-500/10 text-amber-400',
        icon: RiTimeFill
    },
}

export default function NotificationMainDetail() {

    const { notificationDetail } = useAppSelector((state) => state.notificationDetail)
    const { notificationTab } = useAppSelector((state) => state.notificationTab)
    const [moreModal, setMoreModal] = useState<string | null>(null)

    const filter = notificationDetail.filter(elem => {
        if (notificationTab === 'UnRead') return !elem.isRead
        if (notificationTab === 'Read') return elem.isRead
        return true
    }
    )

    function handleModal(id: string) {
        setMoreModal(prev => prev === id ? null : id)
    }

    return (
        <div>
            {filter?.map((elem) => {
                const type = notificationType[
                    elem.type as keyof typeof notificationType
                ]
                const Icon = type.icon

                return <div
                    key={elem.id}
                    className="grid min-h-16 grid-cols-[40px_minmax(0,4fr)_1.5fr_1fr_30px] items-center gap-3 border-b border-[#252938] px-4 py-3 text-sm text-gray-300 relative"
                >
                    <div className={`flex h-9 w-9 items-center justify-center rounded-lg  border ${type.style ?? 'border-[#303548] bg-[#191D2A]'}`}>
                        {Icon ? <Icon size={18} /> : <RiNotification3Line className="" />}
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate font-medium text-white">
                            {elem.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-xs text-gray-400">
                            {elem.message}
                        </p>
                    </div>

                    <div className="text-xs text-gray-400">
                        {elem.createdAt
                            ? formatDistanceToNowStrict(
                                new Date(elem.createdAt),
                                { addSuffix: true }
                            )
                            : "N/A"}
                    </div>

                    <div>
                        <span
                            className={`rounded-full px-2.5 py-1 text-xs font-medium ${elem.isRead
                                ? "bg-gray-500/10 text-gray-400"
                                : "bg-indigo-500/10 text-indigo-400"
                                } `}
                        >
                            {elem.isRead ? "Read" : "Unread"}
                        </span>
                    </div>

                    <button onClick={() => { handleModal(elem.id) }}
                        type="button"
                        aria-label="Notification options"
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-[#252938] hover:text-white"
                    >
                        <RiMoreLine size={20} />
                    </button>
                    <NotificationMoreModal moreModal={moreModal} id={elem.id} />
                </div>
            })}
            <NotificationPagination filter={filter} />
        </div>
    )
}
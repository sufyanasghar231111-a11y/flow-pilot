"use client"
import { useAppSelector } from "@/hooks/reduxhooks"
import { RiAlarmWarningLine, RiCheckboxCircleFill, RiEdit2Line, RiFolderSettingsLine, RiMoreLine, RiNotification3Line, RiTeamLine, RiUserAddLine, RiUserSharedLine } from "@remixicon/react"
import { formatDistanceToNowStrict } from "date-fns"
import NotificationTab from "./NotificationTab"
import NotificationUpdateAndDelete from "./NotificationUpdateAndDelete"
import { useUser } from "@/hooks/useUser"
import AllNotificationPagination from "./AllNotificationPagination"

const notificationType = {
    TASK_UPDATED: {
        style: 'bg-blue-500/10 text-blue-400',
        icon: RiEdit2Line,
    },
    PROJECT_UPDATED: {
        style: 'bg-violet-500/10 text-violet-400',
        icon: RiFolderSettingsLine,
    },
    TASK_ASSIGNED: {
        style: 'bg-indigo-500/10 text-indigo-400',
        icon: RiUserAddLine,
    },
    TASK_OVERDUE: {
        style: 'bg-red-500/10 text-red-400',
        icon: RiAlarmWarningLine,
    },
    TEAM_MEMBER_ADDED: {
        style: 'bg-emerald-500/10 text-emerald-400',
        icon: RiTeamLine,
    },
    ADD_PROJECT_MEMBER: {
        style: 'bg-amber-500/10 text-amber-400',
        icon: RiUserSharedLine,
    },
    TASK_COMPLETED: {
        style: 'bg-emerald-500/10 text-emerald-400',
        icon: RiCheckboxCircleFill,
    },
}

export default function AllNotificationDetail() {
    const { userNotification } = useAppSelector((state) => state.userNotification)
    const { notificationCustomTab } = useAppSelector((state) => state.notificationCustomTab)
    const { setNotificationModal } = useUser()
    const filterData = userNotification?.getNotification.filter((elem) => {
        if (notificationCustomTab === 'unread') return !elem.isRead
        if (notificationCustomTab === 'read') return elem.isRead

        return true
    })

    function OpenModal(id: string) {
        setNotificationModal(prev => prev === id ? null : id)
    }

    return (
        <div className="px-4 py-2 pb-3 bg-[#11131D]">
            <div className="card rounded-md px-4 py-3">
                <NotificationTab />
                {
                    filterData?.map((elem, index) => {
                        const status = notificationType[elem.type as keyof typeof notificationType]
                        const Icon = status.icon
                        return <div key={elem.id}
                            className={`grid min-h-16 grid-cols-[40px_minmax(0,4fr)_1.5fr_1fr_30px] items-center gap-3 border-t border-[#252938] px-4 py-3.5 text-sm text-gray-300 relative ${index === filterData.length - 1 ? 'border-b' : ''}`}
                        >
                            <div className={`flex h-9 w-9 items-center justify-center ${status.style} rounded-lg  border `}>
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

                            <button onClick={() => { OpenModal(elem.id) }}
                                type="button"
                                aria-label="Notification options"
                                className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition hover:bg-[#252938] hover:text-white"
                            >
                                <RiMoreLine size={20} />
                            </button>
                            <NotificationUpdateAndDelete elem={elem} />
                        </div>
                    })
                }

                <AllNotificationPagination />
            </div>
        </div>
    )
}
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setNotificationCustomTab } from "@/store/slices/userNotificationSlice"
import { getAllUserNotificationThunk } from "@/store/thunks/userNotificationThunk"
import { RiArrowDownSLine, RiCalendarLine, RiCloseLine } from "@remixicon/react"
import { useEffect, useState } from "react"

export default function NotificationTab() {
    const { notificationCustomTab } = useAppSelector((state) => state.notificationCustomTab)
    const dispatch = useAppDispatch()
    const { userNotification } = useAppSelector((state) => state.userNotification)
    const totalUnRead = userNotification?.getNotification.filter(elem => !elem.isRead).length
    const totalRead = userNotification?.getNotification.filter(elem => elem.isRead).length
    const { authReady } = useLogin()
    const { user } = useAuth()
    const [type, setType] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')


    useEffect(() => {
        if (user?.role !== 'USER' || !authReady) return

        dispatch(getAllUserNotificationThunk({
            type,
            startDate,
            endDate,
            page: 1
        }))

    }, [authReady, dispatch, endDate, startDate, type, user?.role])


    return (
        <div className="flex  justify-between">
            <div className="flex items-center gap-4 pt-3">
                <button onClick={() => { dispatch(setNotificationCustomTab('All')) }} className={` px-6 pb-2 text-sm rounded-md  ${notificationCustomTab === 'All' ? 'border-blue-600 border-b-2' : ""} flex items-center gap-3 cursor-pointer`}>
                    <span className="pb-2">All</span>
                    <div className={`px-3 mb-2 py-0.5 rounded-full ${notificationCustomTab === 'All' ? 'bg-blue-600' : 'bg-gray-700'}  text-[10px]`}>
                        {userNotification?.getNotification.length}
                    </div>
                </button>
                <button onClick={() => { dispatch(setNotificationCustomTab('unread')) }} className={` px-6 pb-2 text-sm rounded-md  ${notificationCustomTab === 'unread' ? 'border-blue-600 border-b-2' : ""} flex items-center gap-3 cursor-pointer`}>
                    <span className="pb-2">Unread</span>
                    <div className={`px-3 mb-2 py-0.5 rounded-full ${notificationCustomTab === 'unread' ? 'bg-blue-600' : 'bg-gray-700'}  text-[10px]`}>
                        {totalUnRead}
                    </div>
                </button>
                <button onClick={() => { dispatch(setNotificationCustomTab('read')) }} className={` px-6 pb-2 text-sm rounded-md  ${notificationCustomTab === 'read' ? 'border-blue-600 border-b-2' : ""} flex items-center gap-3 cursor-pointer`}>
                    <span className="pb-2">Read</span>
                    <div className={`px-3 mb-2 py-0.5 rounded-full ${notificationCustomTab === 'read' ? 'bg-blue-600' : 'bg-gray-700'}  text-[10px]`}>
                        {totalRead}
                    </div>
                </button>
            </div>
            <div className="flex items-center gap-4 pb-3">

                {
                    (type !== '' || startDate !== '' || endDate !== '') && (
                        <button onClick={() => {
                            setType('')
                            setStartDate('')
                            setEndDate('')
                        }} className="flex items-center gap-2 px-3 py-2 rounded card text-sm text-gray-400">
                            <span>Reset</span> <RiCloseLine className="w-5 h-5" />
                        </button>
                    )
                }

                <button className="w-55 "><select

                    onChange={(elem) => setType(elem.target.value)}
                    value={type}
                    className="w-full appearance-none rounded-lg border border-[#303548] bg-[#111E34] px-3 py-2.5 text-sm text-gray-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                >
                    <option value="All">All Types</option>
                    <option value="TASK_UPDATED">Task Update</option>
                    <option value="PROJECT_UPDATED">Project Update</option>
                    <option value="TASK_ASSIGNED">Task Assigned</option>
                    <option value="TASK_OVERDUE">Task OverDue</option>
                    <option value="TEAM_MEMBER_ADDED">Team Member Add</option>
                    <option value="ADD_PROJECT_MEMBER">Add Project Member</option>
                </select></button>

                <div className="group relative w-55">
                    <button
                        type="button"
                        className="flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-[#303548] bg-[#111E34] px-3 text-left transition hover:border-indigo-500/60 focus:border-indigo-500 focus:outline-none"
                    >
                        <div className="flex min-w-0 items-center gap-2">
                            <RiCalendarLine className="h-4 w-4 shrink-0 text-indigo-400" />

                            <span className="truncate text-xs text-gray-200">
                                {startDate && endDate
                                    ? `${startDate} - ${endDate}`
                                    : startDate
                                        ? `${startDate} - Select end date`
                                        : endDate
                                            ? `Select start date - ${endDate}`
                                            : "Select date range"}
                            </span>
                        </div>

                        <RiArrowDownSLine className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-focus-within:rotate-180" />
                    </button>

                    <div className="absolute left-0 top-full z-50 mt-2 hidden w-full rounded-xl border border-[#303548] bg-[#1B2030] p-4 shadow-xl shadow-black/30 group-focus-within:block">
                        <p className="mb-3 text-xs font-semibold text-gray-200">
                            Custom Date Range
                        </p>

                        <div className="flex flex-col gap-3">
                            <div>
                                <label className="mb-1.5 block text-xs text-gray-400">
                                    Start Date
                                </label>
                                <input
                                    onChange={(elem) =>
                                        setStartDate(elem.target.value)
                                    }
                                    value={startDate}
                                    name="startDate"
                                    type="date"
                                    max={endDate || undefined}
                                    className="w-full rounded-lg border border-[#303548] bg-[#171A26] px-3 py-2.5 text-sm text-gray-200 outline-none transition focus:border-indigo-500 [color-scheme:dark]"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs text-gray-400">
                                    End Date
                                </label>
                                <input
                                    onChange={(elem) =>
                                        setEndDate(elem.target.value)
                                    }
                                    value={endDate}
                                    name="endDate"
                                    type="date"
                                    min={startDate || undefined}
                                    className="w-full rounded-lg border border-[#303548] bg-[#171A26] px-3 py-2.5 text-sm text-gray-200 outline-none transition focus:border-indigo-500 [color-scheme:dark]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
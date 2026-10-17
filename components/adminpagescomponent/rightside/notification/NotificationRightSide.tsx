"use client"
import { useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { notificationAdmin } from "@/store/thunks/thunks";
import { RiFilter2Line, RiCalendarLine, RiArrowDownSLine, RiCloseLine } from "@remixicon/react";
import { useState } from "react";
import NotificationTypes from "./NotificationTypes";

export default function NotificationRightSide() {

    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [type, setType] = useState('All')
    const { authReady } = useLogin()
    const dispatch = useAppDispatch()


    function handleApplyFilter() {
        if (!authReady) return
        dispatch(notificationAdmin({
            type, startDate, endDate,
            page: 0
        }))
    }

    function RemoveFilter() {
        if (!authReady) return

        dispatch(notificationAdmin({
            type: "All",
            startDate: '',
            endDate: "",
            page: 0
        }))
    }

    const filterRemove = type !== 'All' || startDate !== '' || endDate !== ''

    return (
        <div className="w-[29%] flex flex-col gap-2">
            <div className="h-fit rounded-xl border border-[#252938] bg-[#171A26] p-4 sm:p-5">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 text-gray-200">
                        <RiFilter2Line size={17} className="text-indigo-400" />
                        <h2 className="text-sm font-semibold">
                            Filter Notifications
                        </h2>
                    </div>

                    {filterRemove && (
                        <button
                            type="button"
                            onClick={() => {
                                RemoveFilter();
                                setType("ALL");
                                setStartDate("");
                                setEndDate("");
                            }}
                            className="flex shrink-0 items-center gap-1 rounded-md border border-gray-700 px-2 py-1 text-xs text-gray-400 transition hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400"
                        >
                            <RiCloseLine size={15} />
                            Clear
                        </button>
                    )}
                </div>

                <div className="mt-6">
                    <label
                        htmlFor="notificationType"
                        className="mb-2 block text-xs font-medium text-gray-400"
                    >
                        Notification Type
                    </label>

                    <select
                        id="notificationType"
                        onChange={(elem) => setType(elem.target.value)}
                        value={type}
                        className="w-full appearance-none rounded-lg border border-[#303548] bg-[#111E34] px-3 py-2.5 text-sm text-gray-200 outline-none transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30"
                    >
                        <option value="ALL">All Types</option>
                        <option value="PROJECT_DEADLINE">Project Deadline</option>
                        <option value="TASK_OVERDUE">Task Overdue</option>
                        <option value="EVENT_REMINDER">Event Reminder</option>
                        <option value="TASK_COMPLETED">Task Completed</option>
                    </select>
                </div>

                <div className="mt-5">
                    <label className="mb-2 block text-xs font-medium text-gray-400">
                        Date Range
                    </label>

                    <div className="group relative">
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

                <button
                    type="button"
                    onClick={handleApplyFilter}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-600/20 transition hover:bg-indigo-500 active:scale-[0.98]"
                >
                    <RiFilter2Line size={16} />
                    Apply Filters
                </button>
            </div>
            
            <NotificationTypes />
        </div>
    );
}
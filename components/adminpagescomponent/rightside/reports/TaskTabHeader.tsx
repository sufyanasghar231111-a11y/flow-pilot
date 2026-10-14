import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setEndTaskDate, setPriority, setStartTaskDate, setTaskStatus } from "@/store/slices/reportSlice"
import { RiArrowDownSLine, RiCalendarLine, RiCloseLine, RiFilter3Line, RiKanbanView, RiLoader4Line, RiPlayMiniLine } from "@remixicon/react"

export default function TaskTabHeader({ handleTaskReport, taskReportLoader }: { handleTaskReport: () => void, taskReportLoader: boolean }) {
    const dispatch = useAppDispatch()
    const { priority, taskStatus, endTaskDate, startTaskDate } = useAppSelector((state) => state.filterTask)
    const clearFilter = priority !== 'All' || taskStatus !== 'All' || startTaskDate !== '' || startTaskDate !== ''

    return (
        <div className=" rounded-xl border border-[#252938] bg-[#171A26] p-3 shadow-lg shadow-black/10">
            <div className={`flex flex-col ${clearFilter ? 'gap-3' : 'gap-26'}  lg:flex-row lg:items-end`}>

                <div className="grid flex-1 grid-cols-2 gap-3 lg:grid-cols-4">

                    <div className="flex min-w-0 flex-col gap-1 group">
                        <label className="text-[11px] font-medium tracking-wide text-gray-400">
                            Report Type
                        </label>

                        <div className="relative">
                            <RiKanbanView className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />

                            <select
                                className="h-9 w-full appearance-none rounded-md border border-[#303548] bg-[#1D2231] pl-8 pr-7 text-xs text-gray-200 outline-none transition-all hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                            >
                                <option value="projects">Task Report</option>
                            </select>
                            <RiArrowDownSLine className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 transition-transform group-focus-within:rotate-180" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                        <label className="text-[11px] font-medium tracking-wide text-gray-400">
                            Task Status
                        </label>

                        <div className="relative group">
                            <RiFilter3Line className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />

                            <select
                                onChange={(elem) => { dispatch(setTaskStatus(elem.target.value)) }}
                                value={taskStatus}
                                name='taskStatus'
                                className="h-9 w-full appearance-none rounded-md border border-[#303548] bg-[#1D2231] pl-8 pr-7 text-xs text-gray-200 outline-none transition-all hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            >
                                <option value="All">All Statuses</option>
                                <option value="TODO">TODO</option>
                                <option value="IN_PROGRESS">IN_PROGRESS</option>
                                <option value="REVIEW">REVIEW</option>
                                <option value="DONE">DONE</option>
                            </select>

                            <RiArrowDownSLine className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 group-focus-within:rotate-180 transition-transform" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                        <label className="text-[11px] font-medium tracking-wide text-gray-400">
                            Priority
                        </label>

                        <div className="relative group">
                            <RiFilter3Line className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-indigo-400" />

                            <select
                                onChange={(elem) => { dispatch(setPriority(elem.target.value)) }}
                                value={priority}
                                name='priority'
                                className="h-9 w-full appearance-none rounded-md border border-[#303548] bg-[#1D2231] pl-8 pr-7 text-xs text-gray-200 outline-none transition-all hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            >
                                <option value="All">All Priorities</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>

                            <RiArrowDownSLine className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 group-focus-within:rotate-180 transition-transform" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1">
                        <label className="text-[11px] font-medium tracking-wide text-gray-400">
                            Date Range
                        </label>

                        <div className="group relative">
                            <button

                                type="button"
                                className="flex h-9 w-full items-center justify-between gap-2 rounded-md border border-[#303548] bg-[#1D2231] px-2.5 text-left transition-all hover:border-emerald-500/50 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                            >
                                <div className="flex min-w-0 items-center gap-2">
                                    <RiCalendarLine className="h-4 w-4 shrink-0 text-emerald-400" />
                                    <span className="truncate text-xs text-gray-200">
                                        {startTaskDate} - {endTaskDate}
                                    </span>
                                </div>

                                <RiArrowDownSLine className="h-4 w-4 shrink-0 text-gray-500 transition-transform group-focus-within:rotate-180" />
                            </button>

                            <div className="absolute left-0 top-full z-50 mt-2 hidden w-full min-w-[240px] rounded-xl border border-[#303548] bg-[#1B2030] p-2 shadow-xl shadow-black/30 group-focus-within:block">
                                <div className="px-2 py-1.5">
                                    <p className="mb-2 text-xs font-medium text-gray-200">
                                        Custom Range
                                    </p>

                                    <div className="space-y-2">
                                        <input
                                            onChange={(elem) => { dispatch(setStartTaskDate(elem.target.value)) }}
                                            value={startTaskDate ?? ""}
                                            name='startTaskDate'
                                            type="date"
                                            className="w-full rounded-md border border-[#303548] bg-[#171A26] px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-emerald-500 [color-scheme:dark]"
                                        />
                                        <input
                                            onChange={(elem) => { dispatch(setEndTaskDate(elem.target.value)) }}
                                            value={endTaskDate ?? ""}
                                            name='endTaskDate'
                                            type="date"
                                            className="w-full rounded-md border border-[#303548] bg-[#171A26] px-2.5 py-1.5 text-xs text-gray-200 outline-none focus:border-emerald-500 [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">

                    {
                        clearFilter ? (<button
                            onClick={() => {
                                dispatch(setTaskStatus('All'))
                                dispatch(setPriority('All'))
                                dispatch(setStartTaskDate(''))
                                dispatch(setEndTaskDate(''))
                            }}
                            type="button"
                            className="flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-md border border-[#303548] bg-[#1D2231] px-3 text-xs font-medium text-gray-300 transition hover:border-gray-500 hover:bg-[#252B3C] hover:text-white active:scale-[0.98]"
                        >
                            <RiCloseLine className="h-3.5 w-3.5" />
                            Clear All
                        </button>) : null
                    }

                    <button onClick={handleTaskReport}
                        type="button"
                        disabled={taskReportLoader}
                        className={"flex h-9 items-center disabled:cursor-not-allowed disabled:opacity-65 justify-center gap-1.5 whitespace-nowrap rounded-md border border-blue-500/40 bg-gradient-to-r from-blue-600 to-indigo-600 px-3 text-xs font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20 active:scale-[0.98]"}
                    >
                        {taskReportLoader ? (<>
                            <RiLoader4Line className="w-5 h-5 animate-spin" />
                            Generating Report
                        </>) : (
                            <>
                                <RiPlayMiniLine className="h-5 w-5" />
                                Generate Report
                            </>
                        )}
                    </button>
                    
                </div>
            </div>
        </div>
    )
}
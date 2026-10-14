import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { useProject } from "@/hooks/useProject";
import { setEndDate, setShowReport, setStartDate, setStatus } from "@/store/slices/reportSlice";
import { TimeAgo } from "@/utils/TimeAgo";
import {
    RiKanbanView,
    RiArrowDownSLine,
    RiFilter3Line,
    RiCalendarLine,
    RiPlayMiniLine,
    RiLoader4Line,
    RiCloseLine,
} from "@remixicon/react";
import { useState } from "react";

export default function ProjectTabHeader() {

    const { status, startDate, endDate } = useAppSelector((state) => state.filterData)
    const dispatch = useAppDispatch()
    const { getAllProject } = useProject()
    const [reportLoading, setReportLoading] = useState(false)
    async function generateReport() {
        try {
            setReportLoading(true)
            await getAllProject()
            dispatch(setShowReport(true))
        }
        catch (err) {
            console.log(err);
        }
        finally {
            setReportLoading(false)
        }
    }

    const clearFilter = status !== 'All' || startDate !== '' || endDate !== ''

    return (
        <header className=" rounded-xl border border-[#252938] bg-[#171A26] p-5 shadow-lg shadow-black/10">
            <div className={`flex flex-col  ${clearFilter ? 'gap-4':'gap-30'} xl:flex-row xl:items-end`}>

                <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="flex min-w-0 flex-col gap-2 group">
                        <label className="text-xs font-medium tracking-wide text-gray-400">
                            Report Type
                        </label>

                        <div className="relative">
                            <RiKanbanView className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-blue-400" />

                            <select
                                className="h-11 w-full appearance-none rounded-lg border border-[#303548] bg-[#1D2231] pl-10 pr-9 text-sm text-gray-200 outline-none transition-all hover:border-blue-500/50 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10"
                                defaultValue="projects"
                            >
                                <option value="projects">Project Report</option>
                            </select>
                            <RiArrowDownSLine className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 transition-transform group-focus-within:rotate-180" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-2">
                        <label className="text-xs font-medium tracking-wide text-gray-400">
                            Status
                        </label>

                        <div className="relative group">
                            <RiFilter3Line className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-400" />

                            <select
                                onChange={(elem) => { dispatch(setStatus(elem.target.value)) }}
                                value={status}
                                name='status'
                                className="h-11 w-full appearance-none rounded-lg border border-[#303548] bg-[#1D2231] pl-10 pr-9 text-sm text-gray-200 outline-none transition-all hover:border-indigo-500/50 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
                            >
                                <option value="All">All Statuses</option>
                                <option value="PENDING">PENDING</option>
                                <option value="ACTIVE">ACTIVE</option>
                                <option value="COMPLETE">COMPLETE</option>
                                <option value="CANCELLED">CANCELLED</option>
                            </select>

                            <RiArrowDownSLine className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500 group-focus-within:rotate-180 transition-transform" />
                        </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-2 sm:col-span-2 lg:col-span-1">
                        <label className="text-xs font-medium tracking-wide text-gray-400">
                            Date Range
                        </label>

                        <div className="group relative">
                            <button
                                type="button"
                                className="flex h-11 w-full items-center justify-between gap-3 rounded-lg border border-[#303548] bg-[#1D2231] px-3 text-left transition-all hover:border-emerald-500/50 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/10"
                            >
                                <div className="flex min-w-0 items-center gap-3">
                                    <RiCalendarLine className="h-5 w-5 shrink-0 text-emerald-400" />
                                    <span className="truncate text-sm text-gray-200">
                                        <TimeAgo time={startDate} /> - <TimeAgo time={endDate} />
                                    </span>
                                </div>

                                <RiArrowDownSLine className="h-5 w-5 shrink-0 text-gray-500 transition-transform group-focus-within:rotate-180" />
                            </button>

                            <div className="absolute left-0 top-full z-50 mt-2 hidden w-full min-w-[280px] rounded-xl border border-[#303548] bg-[#1B2030] p-2 shadow-xl shadow-black/30 group-focus-within:block">
                                <div className="px-3 py-2">
                                    <p className="mb-3 text-sm font-medium text-gray-200">
                                        Custom Range
                                    </p>

                                    <div className="space-y-3">
                                        <input
                                            onChange={(elem) => { dispatch(setStartDate(elem.target.value)) }}
                                            value={startDate}
                                            name='startDate'
                                            type="date"
                                            className="w-full rounded-lg border border-[#303548] bg-[#171A26] px-3 py-2 text-sm text-gray-200 outline-none focus:border-emerald-500 [color-scheme:dark]"
                                        />
                                        <input
                                            onChange={(elem) => { dispatch(setEndDate(elem.target.value)) }}
                                            value={endDate}
                                            name='endDate'
                                            type="date"
                                            className="w-full rounded-lg border border-[#303548] bg-[#171A26] px-3 py-2 text-sm text-gray-200 outline-none focus:border-emerald-500 [color-scheme:dark]"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                    {
                        clearFilter ? (
                            <button onClick={() => {
                                dispatch(setStatus('All'))
                                dispatch(setEndDate(''))
                                dispatch(setStartDate(''))
                            }}
                                type="button"
                                className="flex h-11 items-center justify-center gap-2 rounded-lg border border-[#303548] bg-[#1D2231] px-4 text-sm font-medium text-gray-300 transition hover:border-gray-500 hover:bg-[#252B3C] hover:text-white active:scale-[0.98]"
                            >
                                <RiCloseLine className="h-4 w-4" />
                                Clear All
                            </button>
                        ):null
                    }


                    <button onClick={generateReport}
                        type="button"
                        disabled={reportLoading}
                        className={"flex h-11 items-center disabled:cursor-not-allowed disabled:opacity-65  justify-center gap-2 rounded-lg border border-blue-500/40 bg-gradient-to-r from-blue-600 to-indigo-600 px-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/20 transition duration-200 hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/20 active:scale-[0.98]"}
                    >

                        {reportLoading ? (<>
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
        </header>
    )
}
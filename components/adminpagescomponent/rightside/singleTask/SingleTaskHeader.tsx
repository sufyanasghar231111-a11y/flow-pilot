"use client"
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext"
import { useProject } from "@/hooks/useProject"
import { useTask } from "@/hooks/useTask"
import { singleTaskApi } from "@/services/Frontend/taskApi"
import { tryCatch } from "@/utils/tryCatch"
import { RiArrowDownLine, RiArrowUpLine, RiCalendarCheckLine, RiCalendarLine, RiCheckboxCircleLine, RiCheckLine, RiEdit2Line, RiEqualLine, RiFileTextLine, RiFlagLine, RiHistoryLine, RiInformationLine, RiListCheck2, RiTaskLine, RiTimeLine, RiUserLine } from "@remixicon/react"
import { useParams } from "next/navigation"
import { useEffect } from "react"
import { taskStatus } from "../search/TaskSearch"
import { Names } from "@/components/nameComponent/Names"
import { TimeZone } from "@/utils/TimeAgo"
import { useTaskUi2 } from "@/contexts/taskContext/TaskContext"

export default function SingleTaskHeader() {
    const params = useParams()
    const id = String(params.id)
    const { setSingleTaskData, singleTaskData, singleTaskById } = useTask()
    const { getAllProject } = useProject()
    const { authReady } = useLogin()
    const { setTaskDetailModal, setTaskUpdateModal } = useTaskUi2()

    useEffect(() => {
        if (!authReady) return
        async function singleTaskById() {
            if (!id) return
            const [res, error] = await tryCatch(singleTaskApi(id))
            if (error) {
                console.log(error);
                return
            }
            setSingleTaskData(res?.data.task)
            await getAllProject()
        }

        singleTaskById()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReady, id, setSingleTaskData])
    const { user } = useAuth()

    const status = taskStatus[singleTaskData?.status ?? 'TODO']
    const StatusIcon = status.icon

    return (

        <div className="min-h-screen w-full bg-[#11131D] px-5 text-gray-200 lg:px-7">

            <div className="relative flex flex-col justify-between gap-5 overflow-hidden rounded-xl border border-[#252938] bg-gradient-to-br from-[#1B1F30] to-[#171A26] p-6 sm:flex-row sm:items-center">
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-blue-500 to-blue-700" />

                <div className="min-w-0 pl-2">
                    <p className="text-xs font-medium uppercase tracking-widest text-gray-500">
                        Task Details
                    </p>

                    <h1 className="mt-2 break-words text-2xl font-semibold text-white">
                        {singleTaskData?.name}
                    </h1>

                    <div className="mt-4 flex flex-wrap items-center gap-3">
                        <span className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset ring-white/5 ${status.style}`}>
                            <StatusIcon className="h-4 w-4" />
                            {singleTaskData?.status}
                        </span>

                        <span className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium ring-1 ring-inset ring-white/5 ${singleTaskData?.priority === 'HIGH'
                            ? 'bg-red-500/10 text-red-400'
                            : singleTaskData?.priority === 'MEDIUM'
                                ? 'bg-amber-500/10 text-amber-400'
                                : 'bg-blue-500/10 text-blue-400'
                            }`}>
                            {singleTaskData?.priority === 'HIGH' && <RiArrowUpLine className="h-4 w-4" />}
                            {singleTaskData?.priority === 'MEDIUM' && <RiEqualLine className="h-4 w-4" />}
                            {singleTaskData?.priority === 'LOW' && <RiArrowDownLine className="h-4 w-4" />}
                            {singleTaskData?.priority}
                        </span>
                    </div>
                </div>

                <button
                    onClick={() => {
                        if (!singleTaskData?.id) return
                        setTaskDetailModal(false)
                        setTaskUpdateModal(true)
                        singleTaskById(singleTaskData?.id)
                    }}
                    className="flex shrink-0 items-center justify-center gap-2 self-start rounded-lg border border-blue-500/30 bg-blue-600/15 px-4 py-2.5 text-sm font-medium text-blue-300 transition hover:border-blue-400/50 hover:bg-blue-600/25 sm:self-center">
                    <RiEdit2Line className="h-4 w-4" />
                    Edit Task
                </button>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">

                <div className="flex min-w-0 flex-col gap-5">

                    <div className="min-h-44 rounded-xl border border-[#252938] bg-[#171A26] p-6">
                        <div className="mb-4 flex items-center gap-3 border-b border-[#252938] pb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <RiFileTextLine className="h-4 w-4" />
                            </span>
                            <h2 className="text-sm font-semibold tracking-wide text-gray-300">DESCRIPTION</h2>
                        </div>
                        <p className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-300">
                            {singleTaskData?.description || 'No description added yet.'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-[#252938] bg-[#171A26] p-6">
                        <div className="mb-5 flex items-center gap-3 border-b border-[#252938] pb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <RiListCheck2 className="h-4 w-4" />
                            </span>
                            <h2 className="text-sm font-semibold tracking-wide text-gray-300">TASK DETAILS</h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="rounded-lg border border-[#252938] bg-[#11131D]/60 p-4 transition hover:border-[#32384d]">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <RiInformationLine className="h-4 w-4" />
                                    Status
                                </div>
                                <p className="mt-3 text-sm font-medium text-white">
                                    {singleTaskData?.status ?? '—'}
                                </p>
                            </div>

                            <div className="rounded-lg border border-[#252938] bg-[#11131D]/60 p-4 transition hover:border-[#32384d]">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <RiFlagLine className="h-4 w-4" />
                                    Priority
                                </div>
                                <p className={`mt-3 text-sm font-medium ${singleTaskData?.priority === 'HIGH'
                                    ? 'text-red-400'
                                    : singleTaskData?.priority === 'MEDIUM'
                                        ? 'text-amber-400'
                                        : 'text-blue-400'
                                    }`}>
                                    {singleTaskData?.priority ?? '—'}
                                </p>
                            </div>

                            <div className="rounded-lg border border-[#252938] bg-[#11131D]/60 p-4 transition hover:border-[#32384d]">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <RiTimeLine className="h-4 w-4 text-blue-400" />
                                    Due Date
                                </div>
                                <div className="mt-3 text-sm font-medium text-gray-200">
                                    {singleTaskData?.dueDate ? (
                                        <TimeZone
                                            time={singleTaskData.dueDate}
                                            timeZone={user?.timeZone ?? 'Asia/Karachi'}
                                            dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'}
                                        />
                                    ) : <span className="text-gray-500">Not set</span>}
                                </div>
                            </div>

                            <div className="rounded-lg border border-[#252938] bg-[#11131D]/60 p-4 transition hover:border-[#32384d]">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <RiCheckboxCircleLine className="h-4 w-4 text-emerald-400" />
                                    Completed At
                                </div>
                                <div className="mt-3 text-sm font-medium text-gray-200">
                                    {singleTaskData?.completedAt ? (
                                        <TimeZone
                                            time={singleTaskData.completedAt}
                                            timeZone={user?.timeZone ?? 'Asia/Karachi'}
                                            dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'}
                                        />
                                    ) : <span className="text-gray-500">Not completed yet</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-5">

                    <div className="rounded-xl border border-[#252938] bg-[#171A26] p-5">
                        <div className="mb-4 flex items-center gap-3 border-b border-[#252938] pb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <RiUserLine className="h-4 w-4" />
                            </span>
                            <h2 className="text-sm font-semibold tracking-wide text-gray-300">ASSIGNED TO</h2>
                        </div>

                        {singleTaskData?.assignedTo?.user ? (
                            <div className="flex items-center gap-3 rounded-lg border border-[#252938] bg-[#11131D]/60 p-3">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-600/20 font-medium text-blue-300 ring-2 ring-blue-500/20">
                                    <Names userName={singleTaskData.assignedTo.user.username} />
                                </div>

                                <div className="min-w-0">
                                    <p className="truncate text-sm font-medium text-white">
                                        {singleTaskData.assignedTo.user.username}
                                    </p>
                                    <p className="mt-1 break-all text-xs text-gray-500">
                                        {singleTaskData.assignedTo.user.email}
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <p className="rounded-lg border border-dashed border-[#252938] p-4 text-center text-sm text-gray-500">
                                No assignee assigned
                            </p>
                        )}
                    </div>

                    <div className="flex-1 rounded-xl border border-[#252938] bg-[#171A26] p-5">
                        <div className="mb-4 flex items-center gap-3 border-b border-[#252938] pb-4">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                                <RiListCheck2 className="h-4 w-4" />
                            </span>
                            <h2 className="text-sm font-semibold tracking-wide text-gray-300">TASK SUMMARY</h2>
                        </div>

                        <div className="divide-y divide-[#252938]">
                            <div className="flex items-center justify-between gap-3 py-3 first:pt-0">
                                <span className="text-sm text-gray-500">Task Status</span>
                                <span className="rounded-md bg-white/5 px-2.5 py-1 text-right text-xs font-medium text-gray-200">
                                    {singleTaskData?.status ?? '—'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 py-3">
                                <span className="text-sm text-gray-500">Priority</span>
                                <span className={`rounded-md px-2.5 py-1 text-xs font-medium ${singleTaskData?.priority === 'HIGH'
                                    ? 'bg-red-500/10 text-red-400'
                                    : singleTaskData?.priority === 'MEDIUM'
                                        ? 'bg-amber-500/10 text-amber-400'
                                        : 'bg-blue-500/10 text-blue-400'
                                    }`}>
                                    {singleTaskData?.priority ?? '—'}
                                </span>
                            </div>

                            <div className="flex items-center justify-between gap-3 py-3">
                                <span className="text-sm text-gray-500">Assignee</span>
                                <span className="max-w-[60%] truncate text-right text-sm font-medium text-gray-200">
                                    {singleTaskData?.assignedTo?.user.username ?? 'Unassigned'}
                                </span>
                            </div>

                            <div className="pt-4">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <RiCalendarLine className="h-4 w-4" />
                                    Due Date
                                </div>
                                <p className="mt-2 rounded-lg border border-[#252938] bg-[#11131D]/60 px-3 py-2.5 text-sm text-gray-200">
                                    {singleTaskData?.dueDate ? (
                                        <TimeZone
                                            time={singleTaskData.dueDate}
                                            timeZone={user?.timeZone ?? 'Asia/Karachi'}
                                            dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'}
                                        />
                                    ) : <span className="text-gray-500">No due date</span>}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
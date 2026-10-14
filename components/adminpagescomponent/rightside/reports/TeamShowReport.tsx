import {
    RiCloseLine,
    RiTeamLine,
    RiUser3Line,
    RiTaskLine,
    RiCheckLine,
    RiFilePdf2Line,
} from "@remixicon/react"

import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from "recharts"

import { useTeam, useTeamReport } from "@/contexts/teamContext/TeamContext"
import { Names } from "@/components/nameComponent/Names"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setShowTeamReport } from "@/store/slices/reportSlice"
import { TimeAgo } from "@/utils/TimeAgo"
import { currentMonth } from "./TaskShowReport"
import TeamExportCSV from "./TeamExportCsv"
import { useTaskReport } from "@/contexts/taskContext/TaskContext"

export default function TeamShowReport() {
    const { memberData } = useTeam()
    const { teamReport } = useTeamReport()
    const { handlePdf, printRef } = useTaskReport()
    const dispatch = useAppDispatch()
    const totalMembers = memberData?.member.length
    const { teamStartDate, teamEndDate } = useAppSelector((state) => state.filterTeam)

    const data = [
        {
            label: "With Tasks",
            value: teamReport.memberWithTask,
            color: "#00B8DB",
        },
        {
            label: "Without Tasks",
            value: teamReport.memberWithOutTask,
            color: "#8B5CF6",
        },
    ]


    const stats = [
        {
            title: "Total Members",
            value: teamReport.totalMember,
            icon: RiTeamLine,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10",
        },
        {
            title: "Members With Tasks",
            value: teamReport.memberWithTask,
            icon: RiTaskLine,
            color: "text-purple-400",
            bg: "bg-purple-500/10",
        },
        {
            title: "Members Without Tasks",
            value: teamReport.memberWithOutTask,
            icon: RiUser3Line,
            color: "text-amber-400",
            bg: "bg-amber-500/10",
        },
        {
            title: "Assigned Tasks",
            value: teamReport.totalTask,
            icon: RiCheckLine,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10",
        },
    ]

    return (
        <>
            <div ref={printRef} className="mx-4 my-3  rounded-xl border border-[#252938] bg-[#171A26] text-gray-100">

                <div className="flex items-center justify-between border-b  border-[#303548] px-5 py-4">
                    <div>
                        <h1 className="text-lg font-semibold">Team Report</h1>
                        <p className="mt-1 text-xs text-gray-400">
                            {teamStartDate || teamEndDate ? (<><TimeAgo time={teamStartDate} /> - <TimeAgo time={teamEndDate} /></>) : (<><TimeAgo time={currentMonth} /> - Onward</>)}
                        </p>
                    </div>

                    <button
                        type="button"
                        aria-label="Close report"
                        onClick={() => { dispatch(setShowTeamReport(false)) }}
                        className="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 hover:bg-gray-700 hover:text-white"
                    >
                        <RiCloseLine className="h-5 w-5" />
                    </button>
                </div>

                <div className="space-y-6 p-5">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        {stats.map((item) => {
                            const Icon = item.icon

                            return (
                                <div
                                    key={item.title}
                                    className="rounded-lg border border-[#303548] hover:border-[#252976] bg-[#1D2130] p-4"
                                >
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">{item.title}</p>
                                        <div className={`rounded - lg p - 2 ${item.bg} `}>
                                            <Icon className={`h - 5 w - 5 ${item.color} `} />
                                        </div>
                                    </div>

                                    <h2 className="mt-4 text-2xl font-semibold">
                                        {item.value}
                                    </h2>
                                </div>
                            )
                        })}
                    </div>

                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                        <div className="rounded-lg border border-[#303548] hover:border-[#252976] bg-[#1D2130] p-4">
                            <h2 className="font-semibold">Member Workload</h2>
                            <p className="mt-1 text-xs text-gray-400">
                                Members with and without assigned tasks
                            </p>

                            {totalMembers === 0 ? (
                                <div className="flex h-56 items-center justify-center text-sm text-gray-500">
                                    No team members to display
                                </div>
                            ) : (
                                <div className="flex flex-col items-center sm:flex-row">
                                    <div className="relative h-56 w-full sm:w-1/2">
                                        <ResponsiveContainer width="100%" height="100%">
                                            <PieChart>
                                                <Pie
                                                    data={data}
                                                    dataKey="value"
                                                    nameKey="label"
                                                    innerRadius="62%"
                                                    outerRadius="85%"
                                                    paddingAngle={3}
                                                >
                                                    {data.map((item) => (
                                                        <Cell
                                                            key={item.label}
                                                            fill={item.color}
                                                            stroke="none"
                                                        />
                                                    ))}
                                                </Pie>

                                                <Tooltip contentStyle={{
                                                    background: "#1f2335",
                                                    border: "1px solid #252938",
                                                    borderRadius: 6,
                                                    fontSize: "12px",
                                                }}
                                                    labelStyle={{ color: "#fff" }}
                                                    wrapperStyle={{ zIndex: 1000 }}
                                                />
                                            </PieChart>
                                        </ResponsiveContainer>

                                        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                            <p className="text-2xl font-semibold">{totalMembers}</p>
                                            <p className="text-xs text-gray-400">Members</p>
                                        </div>
                                    </div>

                                    <div className="w-full space-y-4 sm:w-1/2">
                                        {data.map((item) => (
                                            <div key={item.label} className="flex items-center gap-3">
                                                <span
                                                    className="h-3 w-3 rounded-sm"
                                                    style={{ backgroundColor: item.color }}
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-300">{item.label}</p>
                                                </div>
                                                <p className="text-sm font-semibold">{item.value}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="rounded-lg border border-[#303548] hover:border-[#252976] bg-[#1D2130] p-4">
                            <h2 className="font-semibold">Team Members</h2>
                            <p className="mt-1 text-xs text-gray-400">
                                Current team and task assignment status
                            </p>

                            {memberData?.member.length === 0 ? (
                                <div className="flex h-56 items-center justify-center text-sm text-gray-500">
                                    No team members found
                                </div>
                            ) : (
                                <div className="mt-4 max-h-64 space-y-1 overflow-y-auto custom-scrollbar">
                                    {memberData?.member.map((member, index) => {
                                        const taskCount = member.assignedTask?.length ?? 0

                                        return (
                                            <div
                                                key={member.id ?? index}
                                                className="flex items-center justify-between gap-3 rounded-lg px-3 py-3 hover:bg-[#252A3B]"
                                            >
                                                <div className="flex min-w-0 items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-cyan-500/10 text-sm font-semibold text-cyan-400">
                                                        <Names userName={member.username} />
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="truncate text-sm font-medium">
                                                            {member.username ?? "Team Member"}
                                                        </p>
                                                        <p className="text-xs text-gray-400">
                                                            {taskCount} assigned{" "}
                                                            {taskCount === 1 ? "task" : "tasks"}
                                                        </p>
                                                    </div>
                                                </div>

                                                <span
                                                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs ${taskCount > 0
                                                        ? "bg-cyan-500/10 text-cyan-400"
                                                        : "bg-gray-500/10 text-gray-400"
                                                        } `}
                                                >
                                                    {taskCount > 0 ? "Assigned" : "No tasks"}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-2 border-t border-[#303548] pt-4 text-xs text-gray-500 sm:flex-row">
                        <p>FlowPilot · Team Report</p>
                        <p>Total members: {totalMembers} · Assigned tasks: {teamReport.totalTask}</p>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-3">
                <TeamExportCSV />
                <button onClick={()=>{handlePdf('team')}} className="flex items-center gap-3 border hover:border-[#252976] border-[#252938] rounded text-sm text-gray-300 w-[40%] py-2.5 justify-center">
                    <RiFilePdf2Line className="w-4 h-4 text-gray-400" />
                    Export PDF
                </button>
            </div>
        </>
    )
}
import {  useAppSelector } from "@/hooks/reduxhooks"
import { RiCheckboxCircleFill, RiFolderFill, RiTaskLine, RiTimeLine } from "@remixicon/react"

export default function AllProjectStatUserData() {
    const { totalStat } = useAppSelector((state) => state.totalStat)

    const data = [
        {
            name: 'Total Projects',
            total: totalStat.totalProject,
            icon: RiFolderFill,
            new: totalStat.newMonthProject,
            text: 'text-indigo-400',
            hover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
            month: 'new this month',
        },
        {
            name: 'Assigned Tasks',
            total: totalStat.taskAssign,
            icon: RiTaskLine,
            new: totalStat.newTask,
            text: 'text-blue-400',
            hover: 'hover:border-blue-500/30 hover:bg-blue-500/5',
            month: 'new this month',
        },
        {
            name: 'Pending Tasks',
            total: totalStat.pendingTask,
            icon: RiTimeLine,
            new: totalStat.newPendingTask,
            text: 'text-amber-400',
            hover: 'hover:border-amber-500/30 hover:bg-amber-500/5',
            month: 'new this month',
        },
        {
            name: 'Completed Tasks',
            total: totalStat.taskCompleted,
            icon: RiCheckboxCircleFill,
            new: totalStat.newCompletedTask,
            text: 'text-emerald-400',
            hover: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
            month: 'completed this month',
        },
    ]

    return data
}
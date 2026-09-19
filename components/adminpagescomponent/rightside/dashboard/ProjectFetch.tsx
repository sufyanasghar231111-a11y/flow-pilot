import { useProject } from "@/hooks/useProject";
import { useTask } from "@/hooks/useTask";
import { useUser } from "@/hooks/useUser";
import { RiCheckboxCircleFill, RiFolderFill, RiFolderOpenFill, RiTaskFill, RiTeamFill, RiTodoFill, RiTodoLine } from "@remixicon/react";

export default function ProjectData() {
    const { projectStats } = useProject()
    const { userStats } = useUser()
    const { taskStats } = useTask()

    const data = [
        {
            name: 'Total Projects',
            total: projectStats.totalCounts,
            icon: RiFolderFill,
            new: projectStats.newProject,
            text: 'text-indigo-500',
            hover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5',
            month: 'new this month'
        },
        {
            name: 'Active Projects',
            total: projectStats.totalActive,
            icon: RiFolderOpenFill,
            new: projectStats.newActiveTask,
            text: 'text-amber-500',
            hover: 'hover:border-amber-500/30 hover:bg-amber-500/5',
            month: 'new this month'
        },
        {
            name: 'Completed Projects',
            total: projectStats.totalComplete,
            icon: RiCheckboxCircleFill,
            new: projectStats.newCompleted,
            text: 'text-green-500',
            hover: 'hover:border-green-500/30 hover:bg-green-500/5',
            month: 'new this month'
        },
        {
            name: 'Total Users',
            total: userStats.totalUser,
            icon: RiTeamFill,
            new: userStats.newThisMonth,
            text: 'text-purple-500',
            hover: 'hover:border-purple-500/30 hover:bg-purple-500/5',
            month: 'new this month'
        },
        {
            name: 'Pending Tasks',
            total: taskStats.pendingTask,
            icon: RiTodoFill,
            new: taskStats.newPending,
            text: 'text-orange-500',
            hover: 'hover:border-orange-500/30 hover:bg-orange-500/5',
            month: 'new this Week'
        },
        {
            name: 'Completed Tasks',
            total: taskStats.completedTask,
            icon: RiTaskFill,
            new: taskStats.newCompleted,
            text: 'text-cyan-500',
            hover: 'hover:border-cyan-500/30 hover:bg-cyan-500/5',
            month: 'new this Week'
        }
    ]

    return data
}
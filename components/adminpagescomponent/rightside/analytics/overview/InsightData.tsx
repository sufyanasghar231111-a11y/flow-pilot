"use client"
import { useProjectStat } from "@/hooks/useProject";
import { useTask } from "@/hooks/useTask";
import { RiKanbanView, RiTaskLine, RiTimelineView } from "@remixicon/react";

export default function InsightData() {
    const { projectStats } = useProjectStat()
    const { taskStats } = useTask()
    const total = Math.round((projectStats.newCompleted / projectStats.totalCounts) * 100)
    const taskTotal = Math.round((taskStats.newCompleted / taskStats.completedTask) * 100)
    const taskCount = taskStats.activeTask + taskStats.completedTask + taskStats.pendingTask
    const overDue = Math.round((taskStats.overDue / taskCount) * 100)

    const data = [
        {
            name: 'Projects Completion this month',
            total: projectStats.newCompleted,
            icon: RiKanbanView,
            color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
            percent: total,
            type: 'project'
        },
        {
            name: 'Tasks Completion this Week',
            total: taskStats.newCompleted,
            icon: RiTaskLine,
            color: 'bg-green-500/15 text-green-400 border-green-500/30',
            percent: taskTotal,
            type: 'task'
        },
        {
            name: 'OverDue Tasks',
            total: taskStats.overDue,
            icon: RiTimelineView,
            color: 'bg-red-500/15 text-red-400 border-red-500/30',
            percent: overDue,
            type: 'overDue'
        },
    ]

    return data
}
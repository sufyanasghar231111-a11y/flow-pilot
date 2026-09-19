
import { useProject } from "@/hooks/useProject";
import { RiCheckboxCircleFill, RiFolderFill, RiFolderOpenFill, RiTimeFill } from "@remixicon/react";

export default function ProjectData() {
    const { projectStats } = useProject()

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
            name: 'Pending Projects',
            total: projectStats.totalPending,
            icon: RiTimeFill,
            new: projectStats.newPending,
            text: 'text-yellow-500',
            hover: 'hover:border-yellow-500/30 hover:bg-yellow-500/5',
            month: 'new this month'   
        }
    ]
return data
}
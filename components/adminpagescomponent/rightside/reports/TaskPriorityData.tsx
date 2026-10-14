import { useTaskReport } from "@/contexts/taskContext/TaskContext"

export default function TaskPriorityData() {
    const { taskReport } = useTaskReport()
    const priorityData = [
        { label: 'High', value: taskReport.totalHigh, color: 'text-red-500', percentage: taskReport.totalHighPercentage, bg: 'bg-red-600', bg2: '#C11F2B' },
        { label: 'Low', value: taskReport.totalLow, color: 'text-red-500', percentage: taskReport.totalLowPercentage, bg: 'bg-red-600', bg2: '#3C82F5' },
        { label: 'Medium', value: taskReport.totalMedium, color: 'text-red-500', percentage: taskReport.totalMediumPercentage, bg: 'bg-red-600', bg2: '#F77415' },
    ]

    return priorityData
}
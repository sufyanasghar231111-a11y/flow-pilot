import { useTaskReport } from "@/contexts/taskContext/TaskContext"

export default function TaskReportData() {
    const { taskReport } = useTaskReport()
    const data = [
        { label: 'Done', value: taskReport.totalDone, color: 'text-green-500', percentage: taskReport.totalDonePercentage, bg: 'bg-green-600', bg2: '#0C9488' },
        { label: 'Todo', value: taskReport.totalTodo, color: 'text-amber-500', percentage: taskReport.totalTodoPercentage, bg: 'bg-amber-600', bg2: '#F77415' },
        { label: 'Review', value: taskReport.totalReview, color: 'text-purple-500', percentage: taskReport.totalReviewPercentage, bg: 'bg-purple-600', bg2: '#8B5CF4' },
        { label: 'In progress', value: taskReport.totalInProgress, color: 'text-blue-500', percentage: taskReport.totalInProgressPercentage, bg: 'bg-blue-600', bg2: '#3C82F5' },
    ]

    return data

}
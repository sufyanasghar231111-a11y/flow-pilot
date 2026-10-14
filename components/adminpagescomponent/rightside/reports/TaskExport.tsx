import { useTaskReport } from "@/contexts/taskContext/TaskContext";
import { useAppSelector } from "@/hooks/reduxhooks";
import { RiFileExcel2Line } from "@remixicon/react";
import { currentMonth } from "./TaskShowReport";

export default function TaskExport() {
    const { endTaskDate, startTaskDate } = useAppSelector((state) => state.filterTask)
    const { taskReport } = useTaskReport()
    const exportCsv = () => {

        if (!taskReport) return
        const dateRange = startTaskDate || endTaskDate ? `${startTaskDate} - ${endTaskDate}` : `${currentMonth} - Onward`

        const row = [
            [dateRange, '', ''],
            ['Todo', taskReport.totalTodo, `${taskReport.totalTodoPercentage}%`],
            ['In Progress', taskReport.totalInProgress, `${taskReport.totalInProgressPercentage}%`],
            ['Review', taskReport.totalReview, `${taskReport.totalReviewPercentage}%`],
            ['Done', taskReport.totalDone, `${taskReport.totalDonePercentage}%`],
            ['High', taskReport.totalHigh, `${taskReport.totalHighPercentage}%`],
            ['Medium', taskReport.totalMedium, `${taskReport.totalMediumPercentage}%`],
            ['Low', taskReport.totalLow, `${taskReport.totalLowPercentage}%`],
        ]

        const csvContent = row.map((elem) =>
            elem.map((value) => {
                const text = String(value ?? '')
                return `"${text.replace(/"/g, '""')}"`
            }).join(',')
        )
            .join("\r\n")

        const blob = new Blob(['\uFEFF', csvContent], {
            type: "text/csv;charset=utf-8;",
        })

        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')

        link.href = url
        link.download = "flowpilot-task-report.csv"
        link.click();

        URL.revokeObjectURL(url);

    }

    return (
        <button onClick={exportCsv} className="flex items-center gap-3 border border-[#252938] hover:border-[#252976] rounded text-sm text-gray-300 w-[40%] py-2.5 justify-center">
            <RiFileExcel2Line className="w-4 h-4 text-gray-400" />
            Export CSV
        </button>
    )
}
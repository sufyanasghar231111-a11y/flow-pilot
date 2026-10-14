import { useReport } from "@/contexts/projectContext/ProjectContext";
import { useAppSelector } from "@/hooks/reduxhooks";
import { RiFileExcel2Line } from "@remixicon/react";

export default function ExportCSV() {

    const { report } = useReport()
    const { startDate, endDate } = useAppSelector((state) => state.filterData)
    const now = new Date()
    const currentMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    )

    const exportCsv = () => {

        if (!report) return;

        const dateRange = startDate || endDate ? `${startDate} - ${endDate}` : `${currentMonth} - Onward`

        const rows = [
            [dateRange],
            ['Metric', 'Count', 'Percentage'],
            ["Total Projects", report.totalProject, ''],
            ["Active", report.totalActive, `${report.totalActivePercentage}%`],
            ["Completed", report.totalCompleted, `${report.totalCompletePercentage}%`],
            ["Pending", report.totalPending, `${report.totalPendingPercentage}%`],
            ["Cancelled", report.totalCancelled, `${report.totalCancelledPercentage}`],
        ]

        const csvContext = rows
            .map((elem) =>
                elem.map((value) => {
                    const text = String(value ?? "");
                    return `"${text.replace(/"/g, '""')}"`;
                })
                    .join(",")
            )
            .join("\r\n");

        const blob = new Blob(["\uFEFF" + csvContext], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob)
        const link = document.createElement("a")

        link.href = url;
        link.download = "flowpilot-project-report.csv"
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
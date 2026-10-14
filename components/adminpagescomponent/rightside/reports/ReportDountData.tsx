import { useReport } from "@/contexts/projectContext/ProjectContext"

export default function ReportDountData() {
    const { report } = useReport()
    const data = [
        { label: "Active", value: report.totalActive, color: "#3b82f6", percentage: report.totalActivePercentage },
        { label: "Completed", value: report.totalCompleted, color: "#10b981", percentage: report.totalCompletePercentage },
        { label: "Pending", value: report.totalPending, color: "#f59e0b", percentage: report.totalPendingPercentage },
        { label: "Cancelled", value: report.totalCancelled, color: "#ef4444", percentage: report.totalCancelledPercentage },
    ];
    return data
}
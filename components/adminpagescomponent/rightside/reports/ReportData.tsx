import { useReport } from "@/contexts/projectContext/ProjectContext"
import {
    RiFolder2Line,
    RiPlayCircleLine,
    RiCheckboxCircleLine,
    RiTimeLine,
    RiCloseCircleLine,
} from "@remixicon/react";

export default function ReportData() {
    const { report } = useReport()
    const data = [
        { label: 'Total', value: report.withOutPagination, color: `#4E2A79`, percentage: '', hover: 'border-purple-500/30 bg-purple-500/10', text: 'text-purple-400', icon: RiFolder2Line },
        { label: "Completed", value: report.totalCompleted, color: "#1BAF7A", percentage: report.totalCompletePercentage, hover: 'border-green-500/30 bg-green-500/10', text: 'text-green-400', icon: RiCheckboxCircleLine },
        { label: "Active", value: report.totalActive, color: "#2A78D6", percentage: report.totalActivePercentage, hover: 'border-blue-500/30 bg-blue-500/10', text: 'text-blue-400', icon: RiPlayCircleLine },
        { label: "Pending", value: report.totalPending, color: "#EDA100", percentage: report.totalPendingPercentage, hover: 'border-amber-500/30 bg-amber-500/10', text: 'text-amber-400', icon: RiTimeLine },
        { label: "Cancelled", value: report.totalCancelled, color: "#ef4444", percentage: report.totalCancelledPercentage, hover: 'border-red-500/30 bg-red-500/10', text: 'text-red-400', icon: RiCloseCircleLine },
    ]
    return data
}
import { useProjectStatus } from "@/contexts/analyticsContext/AnalyticsContext"
import { useProjectStat } from "@/hooks/useProject"
import { Segment } from "./ProjectStatusDistribution"

export default function ProjectStatDistribution() {
    const { overDueStats } = useProjectStatus()
    const { projectStats } = useProjectStat()


    const data: Segment[] = [
        { label: "Completed", value: projectStats.totalComplete, color: "#22c55e" },
        { label: "Active", value: projectStats.totalActive, color: "#3b82f6" },
        { label: "Pending", value: projectStats.totalPending, color: "#f7d800" },
        { label: "Cancelled", value: projectStats.totalCancelled, color: "#ef4444" },
        { label: "Overdue", value: overDueStats, color: "#f97316" },
    ]

    return data
}
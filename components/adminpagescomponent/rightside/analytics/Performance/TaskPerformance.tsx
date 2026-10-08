"use client"
import { usePriority } from "@/contexts/analyticsContext/AnalyticsContext";

export default function TaskPerformance() {
    const { priorityStats } = usePriority()

    const priorities = [
        { label: "High", count: priorityStats.high, color: "bg-red-500" },
        { label: "Medium", count: priorityStats.medium, color: "bg-amber-500" },
        { label: "Low", count: priorityStats.low, color: "bg-emerald-500" },
    ];

    const total = priorities.reduce((acc, task) => acc + task.count, 0)

    return (
        <div className="w-[27%] rounded-md border border-[#252938] bg-[#171A26] text-gray-100">
            <div className="px-3 py-2.5">
                <h2 className="text-sm font-semibold">Task Priority Analysis</h2>
                <p className="text-xs text-gray-500">Breakdown of tasks by priority level.</p>
            </div>

            <div className="flex flex-col gap-3 px-3 pb-3 pt-4">
                {priorities.map(({ label, count, color }) => {
                    const percent = total > 0 ? (Math.round((count / total) * 100)) : 0
                    return <div key={label} className="flex flex-col gap-1.5">
                        <div className="flex items-center justify-between text-sm">
                            <span>{label}</span>
                            <span className="font-medium tabular-nums">{count}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#252938]">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ${color} `}
                                    style={{ width: `${percent}%` }}
                                />
                            </div>
                            <span className="w-8 text-right text-xs tabular-nums text-gray-400">
                                {percent}%
                            </span>
                        </div>
                    </div>
                })}
            </div>
        </div>
    );
}
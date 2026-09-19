"use client";

import { useProject } from "@/hooks/useProject";
import { useTask } from "@/hooks/useTask";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    TooltipProps,
} from "recharts";

type Segment = {
    label: string;
    value: number;
    color: string;
};

export default function DonutChart() {
    const { projectStats } = useProject()

    const data: Segment[] = [
        { label: "Completed", value: projectStats.totalComplete, color: "#22c55e" },
        { label: "Active", value: projectStats.totalActive, color: "#3b82f6" },
        { label: "Pending", value: projectStats.totalPending, color: "#F7D800" },
    ];

    const total = data.reduce((sum, d) => sum + d.value, 0);

    const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
        if (active && payload && payload.length) {
            const d = payload[0].payload as Segment;
            const pct = total > 0 ? Math.round((d.value / total) * 100) : 0;
            return (
                <div className="rounded-lg bg-gray-900 px-4  absolute left-20 top-12 z-100   py-1.5 text-xs text-white shadow-lg ">
                    <div className="font-semibold">{d.label}</div>
                    <div className="text-gray-300">
                        {d.value} of {total} ({pct}%)
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="w-full sm:w-[48%] h-full lg:w-[490px] shrink-0 rounded-xl border border-[#252938] bg-[#171A26] px-4 py-3 group transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#1A1D2B] hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]">
            <h1 className="font-semibold">Project Completion</h1>

            <div className=" flex h-[90%] gap-4 items-center">

                <div className="relative h-[90%] group w-[50%] shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                dataKey="value"
                                nameKey="label"
                                innerRadius="65%"
                                outerRadius="88%"
                                paddingAngle={3}
                                cornerRadius={8}
                                startAngle={90}
                                endAngle={-270}
                            >
                                {data.map((d, i) => (
                                    <Cell
                                        key={i}
                                        fill={d.color}
                                        stroke="none"
                                    />
                                ))}
                            </Pie>

                            <Tooltip content={<CustomTooltip />} />
                        </PieChart>
                    </ResponsiveContainer>

                    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                        <span className="text-3xl font-bold text-white">
                            {total}
                        </span>
                        <span className="text-sm text-gray-400">
                            Total
                        </span>
                    </div>
                </div>


                <div className="flex flex-1 flex-col justify-center gap-5">

                    {data.map((item) => {
                        const percentage =
                            total > 0
                                ? Math.round((item.value / total) * 100)
                                : 0;

                        return (
                            <div
                                key={item.label}
                                className="flex items-center justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <span
                                        className="h-2 w-2 rounded-full shrink-0"
                                        style={{
                                            backgroundColor: item.color,
                                        }}
                                    />

                                    <span className="text-sm text-gray-400">
                                        {item.label}
                                    </span>
                                </div>

                                <div className="text-right">
                                    <span className="text-sm font-semibold text-white">
                                        {item.value}
                                    </span>

                                    <span className="ml-2 text-xs text-gray-500">
                                        {percentage}%
                                    </span>
                                </div>
                            </div>
                        );
                    })}

                </div>
            </div>
        </div>
    );
}
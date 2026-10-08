"use client"

import { useTaskAnalytic } from "@/contexts/analyticsContext/AnalyticsContext"
import { useMemo } from "react"
import { ResponsiveContainer, XAxis, YAxis, AreaChart, Area, CartesianGrid, Tooltip } from "recharts"
export default function TaskCompletionTrend() {

    const { taskCreation, taskCompletion } = useTaskAnalytic()

    const chartData = useMemo(() => {
        return Object.keys(taskCreation).map((day) => ({
            day,
            created: taskCreation[day] ?? 0,
            completed: taskCompletion[day] ?? 0
        }))
    }, [taskCompletion, taskCreation])

    return (
        <div className="w-[49%] rounded-md border border-[#252938] bg-[#171A26]">
            <div className="flex items-center justify-between px-3 py-2">
                <div>
                    <h1 className="text-base font-semibold text-white">Task Completion Trend</h1>
                    <h1 className=" text-xs text-slate-400">Daily Task Completion and creation trend.</h1>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-green-500" />
                        Completed
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-[#60A5FA]" />
                        Created
                    </div>
                </div>
            </div>

            <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={chartData}
                        margin={{ top: 8, right: 12, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient
                                id="gCompletedTask"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#60A5FA"
                                    stopOpacity={0.40}
                                />
                                <stop
                                    offset="60%"
                                    stopColor="#60A5FA"
                                    stopOpacity={0.18}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#60A5FA"
                                    stopOpacity={0.04}
                                />
                            </linearGradient>

                            <linearGradient
                                id="gCreatedTask"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#10B981"
                                    stopOpacity={0.40}
                                />
                                <stop
                                    offset="60%"
                                    stopColor="#10B981"
                                    stopOpacity={0.18}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#10B981"
                                    stopOpacity={0.04}
                                />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            stroke="#ffffff14"
                            vertical={false}
                        />

                        <XAxis
                            dataKey="day"
                            stroke="#94a3b8"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />

                        <YAxis
                            allowDecimals={false}
                            stroke="#94a3b8"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />

                        <Tooltip
                            contentStyle={{
                                background: "#1f2335",
                                border: "1px solid #252938",
                                borderRadius: 6,
                                fontSize: "12px",
                            }}
                            labelStyle={{
                                color: "#fff",
                            }}
                        />

                        <Area
                            type="monotone"
                            dataKey="completed"
                            name="Completed"
                            stroke="#60A5FA"
                            strokeWidth={2}
                            fill="url(#gCompletedTask)"
                            dot={{ r: 2 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="created"
                            name="Created"
                            stroke="#10B981"
                            strokeWidth={2}
                            fill="url(#gCreatedTask)"
                            dot={{ r: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
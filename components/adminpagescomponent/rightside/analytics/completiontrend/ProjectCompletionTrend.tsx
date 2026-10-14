"use client"
import { useAnalytic } from "@/contexts/analyticsContext/AnalyticsContext"
import { useMemo } from "react"

import { AreaChart, Area, Tooltip, ResponsiveContainer, CartesianGrid, Legend, XAxis, YAxis } from 'recharts'

export default function ProjectCompletionTrend() {
    const { projectCompletion, projectCreation } = useAnalytic()
    

    const chartData = useMemo(() => {
        return Object.keys(projectCreation).map((day) => ({
            day,
            created: projectCreation[day] ?? 0,
            completed: projectCompletion[day] ?? 0
        }))
    }, [projectCompletion, projectCreation])
    
    return (
        <div className="w-[49%] rounded-md border border-[#252938] bg-[#171A26]">

            <div className="flex items-start justify-between px-4 pb-3 pt-2">
                <div>
                    <h3 className="text-base font-semibold text-white">
                        Project Completion Trend
                    </h3>

                    <p className=" text-xs text-slate-400">
                        Shows how many projects were completed over time.
                    </p>
                </div>

                <div className="flex items-center gap-5 pt-1">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-[#2a79f7]" />
                        Completed
                    </div>

                    <div className="flex items-center gap-2 text-xs text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-[#a855f7]" />
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
                                id="gCompleted"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.45}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#3b82f6"
                                    stopOpacity={0.02}
                                />
                            </linearGradient>

                            <linearGradient
                                id="gCreated"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0%"
                                    stopColor="#a855f7"
                                    stopOpacity={0.45}
                                />
                                <stop
                                    offset="100%"
                                    stopColor="#a855f7"
                                    stopOpacity={0.02}
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
                            labelStyle={{ color: "#fff" }}
                        />

                        <Area
                            type="monotone"
                            dataKey="completed"
                            name="Completed"
                            stroke="#3b82f6"
                            strokeWidth={2}
                            fill="url(#gCompleted)"
                            dot={{ r: 2 }}
                        />

                        <Area
                            type="monotone"
                            dataKey="created"
                            name="Created"
                            stroke="#a855f7"
                            strokeWidth={2}
                            fill="url(#gCreated)"
                            dot={{ r: 2 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
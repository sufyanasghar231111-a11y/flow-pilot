"use client"
import { useLogin } from '@/contexts/authContext/AuthContext'
import { useAppDispatch, useAppSelector } from '@/hooks/reduxhooks'
import { weeklyThunks } from '@/store/thunks/weeklyThunk'
import { useEffect } from 'react'
import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from 'recharts'


export default function TeamActivity() {
    const { authReady } = useLogin()
    const dispatch = useAppDispatch()
    const { weekly, loading, error } = useAppSelector((state) => state.weekly)

        useEffect(() => {
            if (!authReady) return
            dispatch(weeklyThunks())
        }, [dispatch, authReady])

    const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const chartData = DAYS.map((day) => ({
        day,
        created: weekly.createdResult?.[day] ?? 0,
        completed: weekly.completedResult?.[day] ?? 0,
    }))

    return (
        <div className="w-[45%] border border-[#252938] bg-[#171A26] rounded-md">

            <div className="flex items-start justify-between px-4 pb-3 pt-2">
                <div>
                    <h3 className="text-base font-semibold text-white">
                        Team Activity
                    </h3>

                    <p className=" text-xs text-slate-400">
                        Number of tasks completed by team members
                    </p>
                </div>

                <div className="flex items-center gap-3 pt-1">
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

            <div className="w-full h-[190px]">
                <ResponsiveContainer width='100%' height='100%'>
                    <BarChart
                        data={chartData}
                        margin={{ top: 8, right: 16, left: -16, bottom: 0 }}
                        barGap={2}
                        barCategoryGap="28%"
                    >
                        <defs>
                            <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.95} />
                                <stop offset="100%" stopColor="#2a79f7" stopOpacity={0.75} />
                            </linearGradient>
                            <linearGradient id="createdGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#a855f7" stopOpacity={0.95} />
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.75} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid stroke='#252938' vertical={false} />

                        <XAxis
                            dataKey="day"
                            axisLine={{ stroke: "#252938" }}
                            tickLine={false}
                            tick={{ fill: "#cbd5e1", fontSize: 12 }}
                        />

                        <YAxis
                            tickLine={false}
                            axisLine={false}
                            allowDecimals={false}
                            tickCount={5}
                            domain={[0, (dataMax: number) => Math.max(4, Math.ceil(dataMax / 4) * 4)]}
                            tick={{ fill: "#94a3b8", fontSize: 12 }}
                        />
                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.04)" }}
                            contentStyle={{
                                background: "#0f1220",
                                border: "1px solid #252938",
                                borderRadius: 6,
                                fontSize: 12,
                                color: "#fff",
                            }}
                            labelStyle={{ color: "#cbd5e1" }}
                        />
                        <Bar
                            dataKey="completed"
                            name="Completed"
                            fill="url(#completedGradient)"
                            radius={[2, 2, 0, 0]}
                            maxBarSize={22}
                        />
                        <Bar
                            dataKey="created"
                            name="Created"
                            fill="url(#createdGradient)"
                            radius={[2, 2, 0, 0]}
                            maxBarSize={22}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}
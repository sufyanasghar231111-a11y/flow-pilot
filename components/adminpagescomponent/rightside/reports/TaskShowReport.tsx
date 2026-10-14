import { useTaskReport } from "@/contexts/taskContext/TaskContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setShowTaskReport } from "@/store/slices/reportSlice";
import { TimeAgo } from "@/utils/TimeAgo";
import { RiCloseLine, RiFilePdf2Line } from "@remixicon/react";
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import TaskExport from "./TaskExport";
import TaskReportData from "./TaskReportDate";
import TaskPriorityData from "./TaskPriorityData";


const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null;

    const { label, value, bg2 } = payload[0].payload;
    return (
        <div className="px-3 py-2 rounded-md border border-[#252938] bg-[#222635] shadow-lg">
            <div className="flex items-center gap-2">
                <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: bg2 }}
                />
                <span className="text-sm text-gray-300">{label}</span>
            </div>
            <div className="pt-1 text-lg font-semibold text-white">
                {value} <span className="text-xs font-normal text-gray-400">projects</span>
            </div>
        </div>
    );
};

const now = new Date()
export const currentMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
)

export default function TaskShowReport() {
    const { handlePdf, printRef } = useTaskReport()
    const dispatch = useAppDispatch()
    const data = TaskReportData()

    const priorityData = TaskPriorityData()

    const total = data.reduce((acc, reduce) => acc + reduce.value, 0)
    const totalPriority = priorityData.reduce((acc, reduce) => acc + reduce.value, 0)

    const { endTaskDate, startTaskDate } = useAppSelector((state) => state.filterTask)
    return (
        <div className="border-[#252938]  bg-[#171A26] border my-3 rounded-md">
            <div className="px-4 py-4 " ref={printRef}>
                <div className="flex items-center justify-between px-3">
                    <div>
                        <h1 className="text-xl font-semibold">Task Filter</h1>
                        <h1 className="text-xs text-gray-400">{endTaskDate || startTaskDate ? (<><TimeAgo time={startTaskDate} /> - <TimeAgo time={endTaskDate} /></>) : (<><TimeAgo time={currentMonth} /> - Onward</>)}</h1>
                    </div>
                    <div className="flex items-center gap-6">
                        <h1 className="text-sm text-gray-400">Total Task: {total}</h1>
                        <div onClick={() => { dispatch(setShowTaskReport(false)) }} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-gray-700">
                            <RiCloseLine className="text-gray-400 w-5 h-5" />
                        </div>
                    </div>
                </div>
                <div className="pt-7 pb-5 px-4 flex items-center gap-1">
                    {
                        data.map((elem, index) => {
                            return <>
                                {
                                    elem.value !== 0 && (<div style={{ width: `${elem.percentage}%` }} key={index} title={`${elem.label}: ${elem.percentage}%`} className={`w-full h-5 ${elem.bg} rounded-full transition-all duration-700`} />)
                                }
                            </>
                        })
                    }
                </div>
                <div className=" border-t border-[#3B4157]">
                    <div className="flex pt-6 gap-2 items-center">
                        <div className="w-[27%] px-3 pb-5 pt-3 border border-[#252938] hover:border-[#252976] bg-[#171A26] rounded-md">
                            <div className="flex items-center flex-wrap gap-14">
                                {
                                    data.map((elem, index) => {
                                        return <div key={index} className="">
                                            <div className="flex items-center gap-3 text-sm text-gray-400 pt-5"><span className={`p-1.5 rounded-full ${elem.bg}`}></span>{elem.label}</div>
                                            <div className="flex items-center justify-center gap-5">
                                                <h1 className="text-xl px-3">{elem.value}</h1>
                                                <h1 className={`text-sm pt-3 ${elem.color} `}>{elem.percentage}%</h1>
                                            </div>
                                        </div>
                                    })
                                }

                            </div>
                        </div>
                        <div className="w-[72%] border border-[#252938] hover:border-[#252976] bg-[#171A26] rounded-md px-3 py-3 flex items-center gap-2">
                            <div className="w-[40%] flex flex-col gap-2">
                                <h1 className="text-sm text-gray-400 flex items-center justify-center">Priority share</h1>
                                <div className="w-full h-[220px] relative">
                                    <ResponsiveContainer width='100%' height='100%'>
                                        <PieChart>
                                            <Pie data={priorityData} dataKey='value' nameKey='label' innerRadius='65%' outerRadius='88%' startAngle={90} endAngle={-270}>
                                                {priorityData.map((d, i) => (
                                                    <Cell
                                                        key={i}
                                                        fill={d.bg2}
                                                        stroke="none"
                                                    />
                                                ))}

                                            </Pie>
                                            <Tooltip contentStyle={{
                                                background: "#1f2335",
                                                border: "1px solid #252938",
                                                borderRadius: 6,
                                                fontSize: "12px",
                                            }}
                                                labelStyle={{ color: "#fff" }}
                                                wrapperStyle={{ zIndex: 1000 }}
                                            />
                                        </PieChart>

                                    </ResponsiveContainer>
                                    <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                        <h1 className="text-xl">{totalPriority}</h1>
                                        <h1 className="text-xs text-gray-300">Total Priority</h1>
                                    </div>
                                </div>
                            </div>
                            <div className="w-[60%]">
                                <div className="w-full h-[220px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#252938" vertical={false} />
                                            <XAxis
                                                dataKey="label"
                                                stroke="#9ca3af"
                                                tickLine={false}
                                                axisLine={false}
                                                fontSize={12}
                                            />
                                            <YAxis
                                                stroke="#9ca3af"
                                                tickLine={false}
                                                axisLine={false}
                                                allowDecimals={false}
                                                fontSize={12}
                                            />
                                            <Tooltip
                                                cursor={{ fill: "rgba(255,255,255,0.05)" }}
                                                content={<CustomTooltip />}
                                            />
                                            <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={56}>
                                                {data.map((item) => (
                                                    <Cell key={item.label} fill={item.bg2} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-3 px-5 py-3 pb-4 pt-5">
                <TaskExport />
                <button onClick={()=>{handlePdf('task')}} className="flex items-center gap-3 border border-[#252938] hover:border-[#252976] rounded text-sm text-gray-300 w-[40%] py-2.5 justify-center">
                    <RiFilePdf2Line className="w-4 h-4 text-gray-400" />
                    Export PDF
                </button>
            </div>
        </div>
    )
}
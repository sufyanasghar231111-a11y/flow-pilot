"use client"
import { useTask } from "@/hooks/useTask";
import TaskDonut from "./TaskDonut";

export type Segment = {
    label: string,
    value: number,
    color: string,
}


export default function TaskStatusDistribution() {

    const { taskStats } = useTask()

    const data: Segment[] = [
        { label: "Done", value: taskStats.completedTask, color: "#22c55e" },
        { label: "In Progress", value: taskStats.activeTask, color: "#3b82f6" },
        { label: "To Do", value: taskStats.pendingTask, color: "#f7d800" },
        { label: "Overdue", value: taskStats.overDue, color: "#ef4444" },
    ]

    const total = data.reduce((acc, current) => {
        return acc + current.value
    }, 0)
    
    return (
        <div className="w-[33%] border rounded-md border-[#252938] bg-[#171A26]">
            <div className="px-3 py-2">
                <h1 className='text-sm font-semibold'>Task Status Distribution</h1>
                <h1 className="text-xs text-gray-500">Current status of all Tasks.</h1>
            </div>
            <div className="flex items-center justify-between gap-3 px-1 py-4">
                <div className="w-[45%] h-40  relative">
                    <TaskDonut data={data} total={total} />
                </div>
                <div className="w-[55%] h-40 flex flex-col gap-3 pt-3">
                    {
                        data.map((elem, index) => {
                            const percentage = total > 0 ? Math.floor((elem.value / total) * 100) : 0
                            return <div key={index} className="flex items-center justify-between border-b  pb-1 border-gray-600">
                                <div className="flex items-center gap-2 text-xs">
                                    <span style={{ backgroundColor: elem.color }} className={`w-2 h-2 rounded-full`} />
                                    <span>{elem.label}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[11px]">{elem.value}</span>
                                    <span className="text-xs text-gray-500">{percentage}%</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
"use client"
import { Names } from "@/components/nameComponent/Names"
import { useProject } from "@/hooks/useProject"
import { UpdatePropType } from "@/types/projectType"
import { format } from "date-fns"


const statusStyles: Record<string, string> = {
    "COMPLETE": "bg-green-500/15 text-green-400 border-green-500/30",
    "PENDING": "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    "CANCELLED": "bg-red-500/15 text-red-400 border-red-500/30",
    "ACTIVE": "bg-blue-500/15 text-blue-400 border-blue-500/30",
}


export default function ProjectPerformance() {

    const { getProject } = useProject()
    return (
        <div className="w-[27%] border border-[#252938] bg-[#171A26] rounded-md pb-3 text-white">
            <div className="px-3 py-2">
                <h1 className="text-sm font-semibold">Project Performance</h1>
                <p className="text-xs text-gray-500">Completion rate of your projects.</p>
            </div>

            <div className="grid grid-cols-[1fr_40px_68px] gap-3 px-3 pb-1 text-xs text-gray-400">
                <div>Project</div>
                <div className="text-right">Progress</div>
                <div className="text-right">Status</div>
            </div>

            {getProject.slice(0, 4).map((p: UpdatePropType) => {

                const total = p.tasks.length > 0 ? p.tasks.filter((elem) => elem.status === 'DONE').length : 0
                const totalTask = p.tasks?.length
                const progress = totalTask ? Math.round((total / totalTask) * 100) : 0
                const overDue = (format(p.deadline, 'yyyy-MM-dd') < format(new Date(), 'yyyy-MM-dd')) && p.status !== 'COMPLETE'

                return <div
                    key={p.id}
                    className="mx-2 grid grid-cols-[1fr_40px_68px]  gap-3 border-t border-[#252938] px-1 py-2 text-xs"
                >
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px]  bg-blue-600 text-white`}>
                                {p.name[0]}
                            </span>
                            <span className="truncate">{p.name}</span>
                        </div>
                        <div className="ml-6 w-35 mt-1.5 h-1.5 rounded-full bg-[#252938]">
                            <div
                                className="h-full rounded-full transition-all duration-500 bg-blue-500"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>

                    <div className="text-right text-gray-400">{progress}%</div>

                    <div className="flex justify-end">
                        <span className={`rounded-full border h-fit px-2 py-0.5 text-[10px] font-medium  ${overDue ? 'bg-amber-700/15 text-amber-600 border-amber-700/30' : `${statusStyles[p.status]}`}`}>
                            {
                                overDue ? 'OVERDUE' : (p.status)
                            }
                        </span>
                    </div>
                </div>
            })}
        </div>
    )
}
import { Names } from "@/components/nameComponent/Names";
import { TaskState } from "@/contexts/taskContext/TaskContext";
import { TimeAgo } from "@/utils/TimeAgo";

export const data: Record<string, string> = {
    'TODO': "bg-amber-500/15 text-amber-400 border-amber-500/30",
    'IN_PROGRESS': "bg-blue-500/15 text-blue-400 border-blue-500/30",
    'REVIEW': "bg-purple-500/15 text-purple-400 border-purple-500/30",
    'DONE': "bg-green-500/15 text-green-400 border-green-500/30"
}

export const priorityData: Record<string, string> = {
    'HIGH': "bg-red-500/15 text-red-400 border-red-500/30",
    'MEDIUM': "bg-amber-500/15 text-amber-400 border-amber-500/30",
    'LOW': "bg-blue-500/15 text-blue-400 border-blue-500/30",
}

export const priorityDot: Record<string, string> = {
    'HIGH': "bg-red-400 ",
    'MEDIUM': "bg-amber-400 ",
    'LOW': "bg-blue-400",
}

export const dataDot: Record<string, string> = {
    'TODO': "bg-amber-400 ",
    'IN_PROGRESS': "bg-blue-400",
    'REVIEW': "bg-purple-400",
    'DONE': "bg-green-400"
}


export default function TaskMainDetail({ elem, index }: { elem: TaskState, index: number }) {

    return (
        <div className={`min-h-14 grid grid-cols-[0.5fr_1.5fr_2.5fr_1.2fr_1.3fr_1.6fr_1.6fr_1fr] items-center border-b border-[#252938]  px-4 text-sm text-gray-300`}>

            <div className="text-gray-500">
                {index + 1}
            </div>

            <div className="font-medium text-xs text-white truncate pr-4">
                {elem.name}
            </div>

            <div className="text-gray-400 truncate pr-4">
                {elem.description}
            </div>

            <div>
                <span className={`inline-flex items-center gap-1.5  rounded-full ${elem.status && data[elem.status]}  px-2.5 py-1 text-[10px] font-medium  `}>
                    <span className={`h-1.5 w-1.5 rounded-full ${elem.status && dataDot[elem.status]}`}></span>
                    {elem.status}
                </span>
            </div>

            <div>
                <span className={`inline-flex items-center gap-1.5  rounded-full ${elem.status && priorityData[elem.priority]}  px-2.5 py-1 text-[10px] font-medium `}>
                    <span className={`h-1.5 w-1.5 rounded-full ${priorityDot[elem.priority]}`}></span>
                    {elem.priority}
                </span>
            </div>

            <div className="text-gray-400 text-[11px]">
                <TimeAgo time={elem.dueDate} />
            </div>

            <div className="text-gray-400 text-[11px]">
                {
                    elem.completedAt ? <TimeAgo time={elem.completedAt} /> : "Not Yet"
                }
            </div>

            <div className="flex items-center pl-4">
                <div className="w-5 h-5 bg-gray-600 text-[10px] flex items-center justify-center rounded-full">
                    {
                        elem.assignedTo?.user.username ? <Names userName={elem.assignedTo?.user.username} /> : ''
                    }
                </div>
            </div>



        </div>
    )
}
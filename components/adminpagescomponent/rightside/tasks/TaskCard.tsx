import { Names } from "@/components/nameComponent/Names";
import { TimeAgo } from "@/utils/TimeAgo";
import { RiFileCheckFill, RiKanbanView, RiMoreLine, RiTimeLine } from "@remixicon/react";
import { CSS } from '@dnd-kit/utilities'
import { useDraggable } from "@dnd-kit/core";
import TaskDetail from "@/modals/TaskDetail";
import { useTaskUi2 } from "@/contexts/taskContext/TaskContext";
import { useTask } from "@/hooks/useTask";



export default function TaskCard({ elem }) {

    const { setTaskDetailModal } = useTaskUi2()

    const id = elem.id
    const canDrag = elem.status === 'REVIEW'

    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
        id,
        disabled: !canDrag
    })

    const style = {
        transform: CSS.Translate.toString(transform)
    }

    function handleOpen(id: string) {

        setTaskDetailModal(prev => prev === id ? null : id)
    }

    console.log(elem.completedAt);


    return (

        <div ref={setNodeRef} style={style} {...(canDrag ? listeners : {})} {...attributes} key={elem.id} className={`border shrink-0 border-gray-800 rounded-md px-2 py-3 bg-[#1B1E2B] hover:border-gray-700 hover:bg-[#1D2130] ${canDrag ? 'cursor-grab active:cursor-grabbing ' : 'opacity-70 cursor-not-allowed'}  ${isDragging ? 'opacity-0' : ''}  transition-all  duration-200 `}>

            <div className="flex items-start justify-between gap-2 relative">
                <div className="text-sm font-medium text-gray-100 leading-5">
                    {elem.name}
                </div>

                <div onClick={() => { handleOpen(elem.id) }} className="text-gray-500 hover:text-gray-200 transition-colors cursor-pointer p-1.5 ">
                    <RiMoreLine className="w-4 h-4 rotate-90" />
                </div>

                <TaskDetail elem={elem} />
            </div>

            <div className="pt-2 flex items-center gap-2 text-gray-400">
                <RiKanbanView className="w-4 h-4 text-gray-500" />

                <div className="text-xs truncate">
                    {elem.description}
                </div>
            </div>

            <div className={`border rounded ${elem.priority === 'LOW' && "border-green-500/40 bg-green-500/10 text-green-400"} ${elem.priority === 'MEDIUM' && "border-amber-500/40 bg-amber-500/10 text-amber-400"} ${elem.priority === 'HIGH' && "border-red-500/40 bg-red-500/10 text-red-400"}  w-fit px-2 py-0.5 mt-2.5 text-[11px] font-medium`}>
                {elem.priority}
            </div>

            <div className="flex items-center justify-between mt-3">
                <div className="flex flex-col gap-1">

                    <div className="flex items-center gap-1.5 text-gray-500">
                        <RiTimeLine className="w-4 h-4" />

                        <h1 className="text-[11px] text-gray-400">
                            <TimeAgo time={elem.dueDate} />
                        </h1>
                    </div>
                    {
                        elem.status === 'DONE' && (
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <RiFileCheckFill className="w-4 h-4" />

                                <h1 className="text-[11px] text-gray-400">
                                    <TimeAgo time={elem.completedAt} />
                                </h1>
                            </div>
                        )
                    }

                </div>

                <div className="w-6 h-6 rounded-full border border-gray-700 bg-gray-700/50 flex items-center justify-center">
                    <span className="text-[9px] text-gray-300">
                        <Names userName={elem.assignedTo?.username} />
                    </span>
                </div>

            </div>
        </div>

    )
}
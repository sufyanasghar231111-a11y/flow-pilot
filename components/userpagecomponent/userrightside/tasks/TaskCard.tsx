import { Names } from "@/components/nameComponent/Names";
import { useAuth } from "@/contexts/authContext/AuthContext";
import { TaskState, useTaskReport } from "@/contexts/taskContext/TaskContext";
import { TimeZone } from "@/utils/TimeAgo";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { RiFileCheckLine, RiKanbanView, RiMoreLine, RiTimeLine } from "@remixicon/react";
import TaskUpdateButton from "./TaskUpdateButton";
import React from "react";

type Prop = {
    elem: TaskState;
    handleOpen: (id: string) => void
}

export default function TaskCard({ elem, handleOpen }: Prop) {
    const { user } = useAuth()
    const id = elem.id || ''
    const isDraggable = elem.status !== 'DONE'
    const { updateUserTaskMore } = useTaskReport()


    const { isDragging, transform, setNodeRef, listeners, attributes } = useDraggable({
        id,
        disabled: !isDraggable
    })

    const style = {
        transform: CSS.Translate.toString(transform)
    }


    return (
        <div ref={setNodeRef} style={style} {...(isDraggable ? listeners : {})} {...attributes} key={elem.id} className={`border shrink-0 border-gray-800 rounded-md px-2 py-3 bg-[#1B1E2B] ${isDraggable ? 'cursor-grab active:cursor-grabbing' : ' opacity-50 cursor-not-allowed'} ${isDragging ? "opacity-0 cursor-grabbing" : ''} hover:border-gray-700 hover:bg-[#1D2130]  transition-all  duration-400  `}>
            <div className="flex items-center justify-between relative">
                <div className="text-sm text-gray-300">
                    {elem.name}
                </div>
                <button
                    type='button'
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={() => {
                        if (elem.id) {
                            handleOpen(elem.id)
                        }
                    }} className="p-1.5 ">
                    <RiMoreLine className="-rotate-90 w-4 h-4 text-gray-500 hover:text-gray-300 cursor-pointer" />
                </button>
                <TaskUpdateButton elem={elem} updateUserTaskMore={updateUserTaskMore} />
            </div>
            <div className="pt-3 flex items-center gap-2">
                <RiKanbanView className="w-4 h-4 text-gray-500" />
                <h1 className="text-gray-500 text-xs w-40 truncate">{elem.description}</h1>
            </div>
            <button className={`hidden rounded-md border mt-3 px-2 py-1 text-[10px] font-medium sm:inline-flex ${elem.priority === 'HIGH' && 'bg-red-500/10 text-red-400'} ${elem.priority === "MEDIUM" && 'bg-amber-500/10 text-amber-400'} ${elem.priority === "LOW" && 'bg-blue-500/10 text-blue-400'}`}>{elem.priority}</button>
            <div className="pt-4 flex items-center justify-between">
                <div className=" ">
                    <div className="flex items-center gap-1 ">
                        <RiTimeLine className="w-4 h-4 text-gray-500 " />
                        <h1 className="text-xs text-gray-500"><TimeZone time={elem.dueDate} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} /></h1>
                    </div>
                    <div className="flex items-center gap-1 pt-1">
                        {elem.completedAt && (
                            <>
                                <RiFileCheckLine className="w-4 h-4 text-gray-500" />
                                <h1 className="text-xs text-gray-500"><TimeZone time={elem.completedAt} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} /></h1>
                            </>
                        )}
                    </div>
                </div>
                <div className="w-6 h-6 bg-gray-700 rounded-full border border-neutral-600 flex items-center justify-center lowercase text-xs text-gray-400">
                    {
                        elem.assignedTo?.user.username && (
                            <Names userName={elem.assignedTo?.user.username} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}
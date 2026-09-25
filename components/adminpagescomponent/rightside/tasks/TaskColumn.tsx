"use client"

import { RiAddLine, RiInbox2Line, RiMoreLine } from "@remixicon/react"
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { TaskState } from "@/contexts/taskContext/TaskContext";
import NoTaskFound from "./NoTaskFound";

type GetTaskType = {
    id: string;
    title: string;
    getTask: TaskState[]
}

export default function TaskColumn({ id, title, getTask }: GetTaskType) {

    const filterData = getTask.filter(elem => elem.status === id).length

    const { setNodeRef, isOver } = useDroppable({
        id
    })

    const filterTask = getTask?.filter(elem => elem.status === id)

    return (
        <div
            ref={setNodeRef}
            className={`w-[25%]  h-[calc(100vh-180px)] flex flex-col rounded-lg ${isOver ? 'border-blue-500/50' : 'border-gray-800/80'} border  bg-[#171A26] overflow-hidden shadow-lg shadow-black/10 relative`}>

            <header className="border-l-2 shrink-0 border-blue-500 flex items-center px-3.5 py-2.5 justify-between bg-[#191C29]">
                <div className="font-semibold text-sm flex items-center gap-2 text-gray-100">
                    {title}
                    <span className="text-[11px] text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded-full">
                        ({filterData || 0})
                    </span>
                </div>

                <div className="text-gray-400 hover:text-gray-200 cursor-pointer">
                    <RiMoreLine className="w-5 h-5" />
                </div>
            </header>

            <main className="px-3 max-h-[500px] h-full overflow-y-auto py-3  custom-scrollbar overflow-x-hidden flex flex-col gap-2.5">

                {
                    filterTask.length > 0 ? (
                        filterTask?.map((elem) => (
                            <>
                                <TaskCard key={elem.id} elem={elem} />
                            </>
                        ))
                    ) : (
                        <NoTaskFound id={id} />
                    )
                }

            </main>

            {/* <footer className="flex items-center px-3.5 py-2 text-blue-400 gap-2 border-t border-gray-800/70 fixed bottom-4 hover:bg-[#1B1E2B] bg-[#171A26] rounded-bl-lg rounded-br-lg w-63 transition-colors cursor-pointer">
                <RiAddLine className="w-5 h-5" />

                <div className="text-sm font-medium">
                    Add Task
                </div>
            </footer> */}
        </div>
    )
}
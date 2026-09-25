"use client"
import { useTaskUi1 } from "@/contexts/taskContext/TaskContext"
import { RiAddFill } from "@remixicon/react"

export default function TaskCreationButton() {
    const { setProjectSelectionModal } = useTaskUi1()
    return (
        <button onClick={() => { setProjectSelectionModal(true) }} className="flex items-center text-sm gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
            <RiAddFill className="h-5 w-5" />
            <div>
                Add Task
            </div>
        </button>
    )
}

import { useTaskUi2 } from "@/contexts/taskContext/TaskContext"
import { useTask } from "@/hooks/useTask"
import { RiDeleteBinLine, RiEditLine } from "@remixicon/react"

export default function TaskDetail({ elem }) {
    const { taskDetailModal, setTaskDetailModal, setTaskDeletionModal, setTaskUpdateModal } = useTaskUi2()
    const { singleTaskById } = useTask()

    return (
        <>
            {
                taskDetailModal === elem.id && (
                    <div
                        className=" absolute top-7 right-0 z-[301] w-32 rounded-lg border border-white/10 bg-[#171A26] p-1.5 shadow-xl shadow-black/40 "
                    >
                        <button
                            type="button"
                            onClick={() => {
                                setTaskDetailModal(false)
                                setTaskUpdateModal(true)
                                singleTaskById(elem.id)
                            }}
                            className=" group flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs text-gray-300 transition-colors hover:bg-blue-500/10 hover:text-white cursor-pointer " >
                            <RiEditLine
                                className="
                        h-3.5 w-3.5
                        text-gray-400
                        transition-colors
                        group-hover:text-blue-400 "/>
                            <span>Update</span>
                        </button>

                        <button
                            type="button"
                            onClick={() => {
                                setTaskDetailModal(false)
                                setTaskDeletionModal(true)
                                singleTaskById(elem.id)
                            }}
                            className=" group flex w-full items-center gap-2 border-t border-white/10 rounded-md px-2.5 py-2 mt-1 text-xs text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 cursor-pointe "
                        >
                            <RiDeleteBinLine
                                className=" h-3.5 w-3.5 text-red-400 transition-colors group-hover:text-red-300 " />
                            <span>Delete</span>
                        </button>
                    </div>
                )
            }
        </>

    )
}
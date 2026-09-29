"use client"
import { useTaskUi2 } from "@/contexts/taskContext/TaskContext"
import { useTask } from "@/hooks/useTask"
import { RiDeleteBinLine } from "@remixicon/react"

export default function SureForTaskDelete() {
    const { taskDeletionModal, setTaskDeletionModal } = useTaskUi2()
    const { deleteTask, singleTaskData } = useTask()
    return (
        <>
            {
                taskDeletionModal && (
                    <>
                        <div onClick={() => { setTaskDeletionModal(false) }} className="w-full h-full inset-0 bg-black/50 backdrop-blur-sm absolute z-300" />
                        <div className="w-80 h-auto bg-[#171A26] rounded-2xl border border-white/10 shadow-2xl p-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-301 flex flex-col items-center text-center gap-4">

                            <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                <RiDeleteBinLine className=" text-red-500 text-2xl" />
                            </div>

                            <div className="flex flex-col gap-1">
                                <h2 className="text-white text-base font-semibold">Delete Task</h2>
                                <p className="text-gray-400 text-sm">
                                    Are you sure you want to delete this task <span className="text-red-500">{singleTaskData?.name}</span> ?
                                </p>
                            </div>

                            <div className="flex w-full gap-3 mt-2">
                                <button
                                    onClick={() => setTaskDeletionModal(false)}
                                    className="flex-1 py-2 rounded-lg text-sm text-gray-300 bg-white/5 hover:bg-white/10 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button onClick={() => { deleteTask(singleTaskData?.id) }}
                                    className="flex-1 py-2 rounded-lg text-sm text-white bg-red-500 hover:bg-red-600 transition-colors"
                                >
                                    Delete
                                </button>

                            </div>

                        </div>
                    </>
                )
            }
        </>
    )
}
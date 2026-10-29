"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setUpdateModal } from "@/store/slices/userSlice"
import { taskUpdate } from "@/store/thunks/userThunk"
import { useEffect, useState } from "react"

export default function UserUpdateStatus() {

    const { updateModal } = useAppSelector((state) => state.updateModal)
    const dispatch = useAppDispatch()
    const [statusName, setStatusName] = useState('')
    const { singleTaskData } = useAppSelector((state) => state.singleTask)

    useEffect(() => {
        if (!singleTaskData?.status) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setStatusName(singleTaskData?.status || 'TODO')
    }, [singleTaskData?.status])

    return (
        <>
            {
                updateModal && (
                    <>
                        <div onClick={() => { dispatch(setUpdateModal(false)) }} className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm" />

                        <div className="fixed left-1/2 top-1/2 z-[301] w-96 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#252938] bg-[#171A26] p-6 text-gray-200 shadow-xl shadow-black/40">
                            <h2 className="text-lg font-semibold text-white">
                                Update Task Status
                            </h2>

                            <p className="mt-1 text-sm text-gray-400">
                                Select a new status for this task.
                            </p>

                            <div className="mt-5">
                                <label
                                    htmlFor="taskStatus"
                                    className="mb-2 block text-sm font-medium text-gray-300"
                                >
                                    Status
                                </label>

                                <select
                                    onChange={(elem) => {
                                        setStatusName(elem.target.value)
                                    }}
                                    value={statusName}
                                    className="w-full cursor-pointer rounded-lg border border-[#303549] bg-[#11131D] px-3 py-2.5 text-sm text-gray-200 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"

                                >
                                    <option value="TODO">To Do</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="REVIEW">In Review</option>
                                    <option value="DONE">DONE</option>
                                </select>
                            </div>

                            <div className="mt-6 flex justify-end gap-3">
                                <button onClick={() => { dispatch(setUpdateModal(false)) }}
                                    type="button"
                                    className="rounded-lg border border-[#303549] px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5 hover:text-white"
                                >
                                    Cancel
                                </button>

                                <button onClick={() => {
                                    if (singleTaskData?.id) {
                                        dispatch(taskUpdate({ taskid: singleTaskData?.id, status: statusName }))
                                        dispatch(setUpdateModal(false))
                                    }
                                }}
                                    type="button"
                                    className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-500"
                                >
                                    Update Status
                                </button>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
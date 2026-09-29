"use client"
import { useTaskUi2 } from "@/contexts/taskContext/TaskContext"
import { useTask } from "@/hooks/useTask"

export default function TaskUpdationModal() {
    const { taskUpdateModal, setTaskUpdateModal } = useTaskUi2()
    const { singleTaskData, updateTask, taskUpdate, handleTaskUpdateChange } = useTask()
    return (
        <>
            {
                taskUpdateModal && (
                    <>
                        <div onClick={() => { setTaskUpdateModal(false) }} className="w-full h-full inset-0 fixed bg-black/50 z-300 backdrop-blur-sm"
                        />
                        <div className="w-96 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-301 bg-[#171A26] p-6 text-gray-200 border border-white/10 shadow-2xl">

                            <h2 className="text-base font-semibold text-white mb-5">Update Task</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs text-gray-400 mb-1.5">Name</label>
                                    <input
                                        onChange={handleTaskUpdateChange}
                                        value={taskUpdate.name}
                                        name='name'
                                        type="text"
                                        className="w-full bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:border-white/30 transition-colors"
                                        placeholder="Task name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-400 mb-1.5">Description</label>
                                    <textarea
                                        onChange={handleTaskUpdateChange}
                                        value={taskUpdate.description}
                                        name='description'
                                        rows={3}
                                        className="w-full bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:border-white/30 transition-colors resize-none"
                                        placeholder="Task description"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1.5">Priority</label>
                                        <select
                                            onChange={handleTaskUpdateChange}
                                            value={taskUpdate.priority}
                                            name='priority'
                                            className="w-full bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-white/30 transition-colors"
                                        >
                                            <option value='LOW'>LOW</option>
                                            <option value='MEDIUM'>MEDIUM</option>
                                            <option value='HIGH'>HIGH</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs text-gray-400 mb-1.5">Due Date</label>
                                        <input
                                            onChange={handleTaskUpdateChange}
                                            value={taskUpdate.dueDate}
                                            name='dueDate'
                                            type="date"
                                            className="w-full bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-white/30 transition-colors [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs text-gray-400 mb-1.5">Users</label>
                                    <select
                                        onChange={handleTaskUpdateChange}
                                        value={taskUpdate.assignedToId}
                                        name='assignedToId'
                                        className="w-full rounded-md border border-white/10 bg-[#1d2130] px-3 py-2 text-xs text-gray-300 outline-none focus:border-blue-500/50"
                                    >
                                        

                                        {
                                            singleTaskData?.project?.projectmembers.map((elem) => {
                                                return <option value={elem.user.id} key={elem.user.id}>{elem.user.username}</option>
                                            })
                                        }

                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button
                                    onClick={() => { setTaskUpdateModal(false) }}
                                    className="px-4 py-2 text-sm rounded-md border border-white/10 text-gray-300 hover:bg-white/5 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => { updateTask(singleTaskData?.id) }}
                                    className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                                >
                                    Update
                                </button>
                            </div>

                        </div>
                    </>
                )
            }
        </>
    )
}
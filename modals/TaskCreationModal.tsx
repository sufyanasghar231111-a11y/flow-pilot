
"use client"

import { useTaskUi1 } from "@/contexts/taskContext/TaskContext"
import { useProject } from "@/hooks/useProject"
import { useTask } from "@/hooks/useTask"
import { RiCloseLine } from "@remixicon/react"

export default function TaskCreationModal() {

    const { taskCreationModal, setTaskCreationModal } = useTaskUi1()
    const { singleProjectData } = useProject()
    const { task, handleTaskChange, taskCreation } = useTask()

    return (
        <>
            {
                taskCreationModal && (
                    <>
                        <div
                            onClick={() => { setTaskCreationModal(false) }}
                            className="fixed inset-0 z-400 bg-black/50 backdrop-blur-sm"
                        />

                        <div className="fixed top-1/2 left-1/2 z-401 w-[25rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-[#171A26] p-5 text-gray-200 shadow-2xl">

                            <div className="mb-5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-base font-semibold text-white">
                                        Create Task
                                    </h2>
                                    <p className="mt-1 text-xs text-gray-500">
                                        Add a new task to this project
                                    </p>
                                </div>

                                <button
                                    onClick={() => setTaskCreationModal(false)}
                                    className="rounded-md p-1.5 text-gray-500 hover:bg-white/5 hover:text-gray-300"
                                >
                                    <RiCloseLine size={19} />
                                </button>
                            </div>

                            <div className="mb-4 rounded-md border border-blue-500/20 bg-blue-500/[0.06] px-3 py-2.5">
                                <p className="text-[10px] uppercase tracking-wide text-gray-500">
                                    Project
                                </p>

                                <div className="mt-1 flex items-center justify-between">
                                    <span className="text-sm font-medium text-white">
                                        {singleProjectData?.name}
                                    </span>

                                    <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2 py-0.5 text-[10px] text-amber-300">
                                        {singleProjectData?.status}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-xs font-medium text-gray-300">
                                    Task Title
                                </label>

                                <input
                                    onChange={handleTaskChange}
                                    name='name'
                                    value={task.name}
                                    type="text"
                                    placeholder="e.g. Create login page"
                                    className="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500/50"
                                />
                            </div>

                            <div className="mt-4 space-y-1.5">
                                <label className="text-xs font-medium text-gray-300">
                                    Description
                                </label>

                                <textarea
                                    onChange={handleTaskChange}
                                    name='description'
                                    value={task.description}
                                    rows={3}
                                    placeholder="Describe the task..."
                                    className="w-full resize-none rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none placeholder:text-gray-600 focus:border-blue-500/50"
                                />
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-300">
                                        Priority
                                    </label>

                                    <select
                                        onChange={handleTaskChange}
                                        name='priority'
                                        value={task.priority}
                                        className="w-full rounded-md border border-white/10 bg-[#1d2130] px-3 py-2 text-xs text-gray-300 outline-none focus:border-blue-500/50"
                                    >
                                        <option value='LOW'>LOW</option>
                                        <option value='MEDIUM'>MEDIUM</option>
                                        <option value='HIGH'>HIGH</option>
                                    </select>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs font-medium text-gray-300">
                                        Due Date
                                    </label>

                                    <input
                                        onChange={handleTaskChange}
                                        name='dueDate'
                                        value={task.dueDate}
                                        type="date"
                                        className="w-full rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 text-xs text-gray-300 outline-none focus:border-blue-500/50"
                                    />
                                </div>
                            </div>

                            <div className="mt-4 space-y-1.5">
                                <label className="text-xs font-medium text-gray-300">
                                    Assign To
                                </label>

                                <select
                                    onChange={handleTaskChange}
                                    value={task.assignedToId}
                                    name='assignedToId'
                                    className="w-full rounded-md border border-white/10 bg-[#1d2130] px-3 py-2 text-xs text-gray-300 outline-none focus:border-blue-500/50"
                                >
                                    <option>Select A Member</option>
                                    {
                                        singleProjectData?.projectmembers.map((elem) => {
                                            return <option value={elem.user.id} key={elem.user.id} >
                                                {elem.user.username}
                                            </option>
                                        })
                                    }
                                </select>
                            </div>

                            <div className="mt-5 flex justify-end gap-2">
                                <button
                                    onClick={() => setTaskCreationModal(false)}
                                    className="rounded-md border border-white/10 px-4 py-2 text-xs text-gray-400 hover:bg-white/5 hover:text-gray-200"
                                >
                                    Cancel
                                </button>

                                <button
                                    onClick={() => {
                                        taskCreation(singleProjectData?.id)
                                    }}
                                    className="rounded-md bg-blue-600 px-4 py-2 text-xs font-medium text-white hover:bg-blue-500"
                                >
                                    Create Task
                                </button>
                            </div>

                        </div>
                    </>
                )
            }

        </>
    )
}



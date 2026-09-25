"use client"
import { useUpdateProject } from "@/contexts/projectContext/ProjectContext"
import { useProject } from "@/hooks/useProject"


export default function ProjectUpdateModal() {
    const { updateProjectModal, setUpdateProjectModal, update, handleUpdate, updateProject } = useUpdateProject()
    const { singleProjectData } = useProject()
    return (
        <>
            {
                updateProjectModal && (
                    <>
                        <div onClick={() => { setUpdateProjectModal(false) }} className="w-full h-full inset-0 fixed bg-black/50 z-300 backdrop-blur-sm" />
                        <div className=" w-96 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-301 bg-[#171A26] p-6 text-gray-200">
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="text-lg font-semibold text-white">Update Project</h2>
                                <button
                                    onClick={() => setUpdateProjectModal(false)}
                                    className="text-gray-400 hover:text-gray-200 transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm text-gray-400">
                                        Name
                                    </label>
                                    <input
                                        onChange={handleUpdate}
                                        value={update.name}
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="Project name"
                                        className="bg-[#0F111A] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="description" className="text-sm text-gray-400">
                                        Description
                                    </label>
                                    <textarea
                                        onChange={handleUpdate}
                                        value={update.description}
                                        id="description"
                                        name="description"
                                        rows={3}
                                        placeholder="Project description"
                                        className="bg-[#0F111A] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label htmlFor="startDate" className="text-sm text-gray-400">
                                            Start Date
                                        </label>
                                        <input
                                            onChange={handleUpdate}
                                            value={update.startDate}
                                            id="startDate"
                                            name="startDate"
                                            type="date"
                                            className="bg-[#0F111A] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 flex-1">
                                        <label htmlFor="deadline" className="text-sm text-gray-400">
                                            Deadline
                                        </label>
                                        <input
                                            onChange={handleUpdate}
                                            value={update.deadline}
                                            id="deadline"
                                            name="deadline"
                                            type="date"
                                            className="bg-[#0F111A] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="status" className="text-sm text-gray-400">
                                        Status
                                    </label>
                                    <select
                                        onChange={handleUpdate}
                                        value={update.status}
                                        id="status"
                                        name="status"
                                        className="bg-[#0F111A] border border-gray-700 rounded-md px-3 py-2 text-sm text-gray-200 outline-none focus:border-blue-500 transition-colors"
                                    >
                                        <option value="PENDING">PENDING</option>
                                        <option value="ACTIVE">ACTIVE</option>
                                        <option value="COMPLETE">COMPLETE</option>
                                        <option value="CANCELLED">CANCELLED</option>
                                    </select>
                                </div>

                                <div className="flex gap-3 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => setUpdateProjectModal(false)}
                                        className="flex-1 py-2 rounded-md border border-gray-700 text-gray-300 hover:bg-gray-800 transition-colors text-sm"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => { updateProject(singleProjectData?.id) }}
                                        className="flex-1 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-sm transition-colors"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}
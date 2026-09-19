"use client"
import { useProjectUi1 } from "@/contexts/projectContext/ProjectContext"
import { useProject } from "@/hooks/useProject"

export default function ProjectCreationModal() {
    const { projectCreationModal, setProjectCreationModal } = useProjectUi1()
    const { project, handleProjectChange, ProjectCreation } = useProject()
    return (
        <>
            {
                projectCreationModal && (
                    <>
                        <div onClick={() => { setProjectCreationModal(false) }} className="w-full h-full inset-0 fixed bg-black/50 z-300 backdrop-blur-sm" />
                        <div className="w-96 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-301 bg-[#171A26] p-6 text-gray-200">

                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-white">New Project</h2>
                                <button onClick={() => { setProjectCreationModal(false) }} className="text-gray-400 hover:text-white transition-colors">
                                    ✕
                                </button>
                            </div>

                            <form onSubmit={ProjectCreation} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-400">Name</label>
                                    <input
                                        onChange={handleProjectChange}
                                        name='name'
                                        value={project.name}
                                        type="text"
                                        placeholder="Project name"
                                        className="bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-sm text-gray-400">Description</label>
                                    <textarea
                                        onChange={handleProjectChange}
                                        name='description'
                                        value={project.description}
                                        placeholder="What's this project about?"
                                        rows={3}
                                        className="bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 transition-colors resize-none"
                                    />
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex flex-col gap-1 flex-1">
                                        <label className="text-sm text-gray-400">Start Date</label>
                                        <input
                                            onChange={handleProjectChange}
                                            name='startDate'
                                            value={project.startDate}
                                            type="date"
                                            className="bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-1 flex-1">
                                        <label className="text-sm text-gray-400">Deadline</label>
                                        <input
                                            onChange={handleProjectChange}
                                            name='deadline'
                                            value={project.deadline}
                                            type="date"
                                            className="bg-[#0F111A] border border-white/10 rounded-md px-3 py-2 text-sm text-white outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]"
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-2">
                                    <button
                                        type="button"
                                        onClick={() => { setProjectCreationModal(false) }}
                                        className="px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-white/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm rounded-md bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>

                        </div>
                    </>
                )
            }
        </>
    )
}
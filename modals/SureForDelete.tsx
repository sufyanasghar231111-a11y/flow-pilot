"use client"

import { useState } from "react"
import { useProjectUi1, useUpdateProject } from "@/contexts/projectContext/ProjectContext"
import { useProject } from "@/hooks/useProject"

export default function SureForDelete() {
    const { projectDeleteModal, setProjectDeleteModal } = useProjectUi1()
    const [confirmText, setConfirmText] = useState("")
    const { deleteProject } = useUpdateProject()
    const { singleProjectData } = useProject()

    // TODO: replace with the actual project name from context
    const projectName = singleProjectData?.name

    const isMatch = confirmText.trim() === projectName

    return (
        <>
            {
                projectDeleteModal && (
                    <>
                        <div
                            onClick={() => {
                                setProjectDeleteModal(false)
                                setConfirmText('')
                            }}
                            className="w-full h-full inset-0 fixed bg-black/50 z-300 backdrop-blur-sm"
                        />
                        <div className="w-96 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-301 bg-[#171A26] p-6 text-gray-200 border border-white/10 shadow-2xl">

                            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500/10 mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </div>

                            <h2 className="text-lg font-semibold text-white mb-1">
                                Delete project
                            </h2>

                            <p className="text-sm text-gray-400 mb-4 leading-relaxed">
                                Are you sure you want to delete{" "}
                                <span className="text-white font-medium">&quot;{projectName}&quot;</span>?
                                This action cannot be undone.
                            </p>

                            <label className="block text-xs text-gray-400 mb-1.5">
                                Type <span className="text-white font-medium">{projectName}</span> to confirm
                            </label>
                            <input
                                type="text"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                placeholder={projectName}
                                className="w-full bg-[#0D0F1A] border border-white/10 rounded-md px-3 py-2 text-sm text-white placeholder-gray-600 outline-none focus:border-red-500/50 mb-5"
                            />

                            <div className="flex justify-end gap-3">
                                <button
                                    onClick={() => setProjectDeleteModal(false)}
                                    className="px-4 py-2 text-sm rounded-md bg-white/5 hover:bg-white/10 text-gray-300 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button onClick={() => { deleteProject(singleProjectData?.id) }}
                                    disabled={!isMatch}
                                    className="px-4 py-2 text-sm rounded-md bg-red-600 hover:bg-red-500 disabled:bg-red-600/30 disabled:cursor-not-allowed disabled:hover:bg-red-600/30 text-white transition-colors"
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
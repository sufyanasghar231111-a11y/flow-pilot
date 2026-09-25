"use client"

import ProjectSelectionPagination from "@/components/adminpagescomponent/rightside/tasks/ProjectSelectionPagination"
import { useTaskUi1 } from "@/contexts/taskContext/TaskContext"
import { useProject } from "@/hooks/useProject"
import { UpdatePropType } from "@/types/projectType"
import {
    RiCloseLine,
    RiSearchLine,
    RiTaskLine,
} from "@remixicon/react"


export default function ProjectSelectionModal() {
    const {
        projectSelectionModal,
        setProjectSelectionModal,
        setTaskCreationModal
    } = useTaskUi1()

    const { getProject, getSingleProject } = useProject()

    return (
        <>
            {projectSelectionModal && (
                <>
                    <div
                        onClick={() => setProjectSelectionModal(false)}
                        className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm"
                    />

                    <div className="fixed top-1/2 left-1/2 z-[301] w-[25rem] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/10 bg-[#171A26] p-5 text-gray-200 shadow-2xl">

                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-white">
                                    Select Project
                                </h2>

                                <p className="mt-1 text-xs text-gray-500">
                                    Choose a project to create a task
                                </p>
                            </div>

                            <button
                                onClick={() => setProjectSelectionModal(false)}
                                className="rounded-md p-1 text-gray-500 transition hover:bg-white/5 hover:text-gray-300"
                            >
                                <RiCloseLine size={19} />
                            </button>
                        </div>

                        <div className="relative mt-5">
                            <RiSearchLine
                                size={16}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                            />

                            <input
                                type="text"
                                placeholder="Search projects..."
                                className="h-9 w-full rounded-md border border-white/10 bg-white/3 pl-9 pr-3 text-xs text-gray-200 outline-none placeholder:text-gray-600 focus:border-blue-500/40"
                            />
                        </div>

                        <div className="mt-4 max-h-88 space-y-2 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
                            {
                                getProject?.map((elem: UpdatePropType) => {
                                    return <button onClick={() => {
                                        getSingleProject(elem?.id)
                                        setTaskCreationModal(true)

                                    }} key={elem?.id} className="w-full rounded-md border border-white/10 bg-white/2.5 px-3 py-2.5 text-left transition hover:border-blue-500/30 hover:bg-blue-500/5">
                                        <div className="flex items-center justify-between gap-3">

                                            <span className="truncate text-sm font-medium text-gray-200">
                                                {elem.name}
                                            </span>

                                            <span className={`shrink-0 rounded-full border  px-2 py-0.5 text-[10px] ${elem.status === "PENDING" && 'text-amber-300 border-amber-400/20 bg-amber-400/10'}
                                    ${elem.status === "COMPLETE" && 'text-green-300 border-green-400/20 bg-green-400/10'}
                                    ${elem.status === "ACTIVE" && 'text-blue-300 border-blue-400/20 bg-blue-400/10'}
                                    ${elem.status === "ACTIVE" && 'text-red-300 border-red-400/20 bg-red-400/10'}
                                    `}>
                                                {elem.status}
                                            </span>

                                        </div>

                                        <div className="mt-1.5 flex items-center justify-between">

                                            <p className="truncate text-[11px] text-gray-500">
                                                {elem.description}
                                            </p>

                                            <span className="ml-3 flex shrink-0 items-center gap-1 text-[10px] text-gray-500">
                                                <RiTaskLine size={13} />
                                                {elem.tasks.length}
                                            </span>

                                        </div>
                                    </button>
                                })
                            }


                        </div>

                        <ProjectSelectionPagination />
                    </div>
                </>
            )}
        </>
    )
}

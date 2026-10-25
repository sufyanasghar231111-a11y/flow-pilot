"use client"

import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { singleProject } from "@/services/Frontend/projectApi";
import { tryCatch } from "@/utils/tryCatch";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { project } from "../search/ProjectSearch";
import { TimeZone } from "@/utils/TimeAgo";
import { RiAddLine, RiTeamLine, RiTimeLine } from "@remixicon/react";
import { useUpdateProject } from "@/contexts/projectContext/ProjectContext";
import { useProject } from "@/hooks/useProject";
import { useTaskUi1 } from "@/contexts/taskContext/TaskContext";
import ProjectTask from "./ProjectTask";


export default function SingleProjectDetail() {
    const { authReady } = useLogin()
    const { user } = useAuth()
    const params = useParams()
    const id = String(params.id)
    const { singleProjectData, setSingleProjectData } = useProject()
    const { setUpdateProjectModal } = useUpdateProject()
    const { getSingleProject } = useProject()
    const { setTaskCreationModal } = useTaskUi1()

    useEffect(() => {
        if (!authReady) return

        async function getSingleProject() {
            const [res, error] = await tryCatch(singleProject(id))

            if (error) {
                console.log(error);
            }

            setSingleProjectData(res?.data.singleProject)
        }

        getSingleProject()

    }, [authReady, id])

    const status = project[singleProjectData?.status ?? "PENDING"]
    const Statusicon = status.icon
    const total = singleProjectData?.tasks?.length
    const done = singleProjectData?.tasks?.filter(elem => elem.status === 'DONE').length
    const progress = Math.round(((done || 0) / (total || 0)) * 100)


    return (
        <div className=" px-4 bg-[#11131D] ">
            <div className="border border-[#252938] bg-[#171A26] px-4 py-4 rounded-md flex justify-between">
                <div className="flex items-center gap-4">
                    <div className={`border rounded-md w-19 h-19 flex items-center justify-center ${status.style}`}>
                        <Statusicon size={30} />
                    </div>
                    <div>
                        <div className="flex items-center gap-4 w-120 ">
                            <h1 className="text-2xl font-semibold  truncate">{singleProjectData?.name}</h1>
                            <button className={`px-2.5 py-1  rounded-full ${status.style} text-xs `}>{singleProjectData?.status}</button>
                        </div>
                        <div className="w-100 text-sm text-gray-400 pt-1">
                            {singleProjectData?.description}
                        </div>
                        <div className="flex items-center gap-8 text-xs text-gray-400 pt-2">
                            <div className="flex items-center gap-2">
                                <RiTimeLine size={18} />
                                {
                                    singleProjectData?.startDate && (
                                        <TimeZone time={singleProjectData?.startDate} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} />
                                    )
                                }

                                {" "} - {singleProjectData?.deadline && (
                                    <TimeZone time={singleProjectData?.deadline} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? "YYYY-MM-DD"} />
                                )}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-400">
                                <RiTeamLine size={17} />
                                {
                                    singleProjectData?.projectmembers?.length ?? 0
                                } Members
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border border-blue-700/10 bg-blue-700/10 px-3 py-4 rounded-md w-80">
                    <div className="flex items-center justify-between">
                        <h1 className="text-xs text-gray-400">Project Progress</h1>
                        <button onClick={() => {
                            if (!singleProjectData?.id) return
                            setUpdateProjectModal(true)
                            getSingleProject(singleProjectData?.id)
                        }} className="text-xs rounded bg-blue-600 px-3 py-1.5">Edit Project</button>
                    </div>
                    <div>
                        <h1 className="text-xl font-semibold">
                            {progress || 0}%
                        </h1>
                        <div className="w-full h-3 rounded-full overflow-hidden bg-[#252938] mt-2">
                            <div
                                style={{ width: `${progress || 0}%` }}
                                className="h-full bg-blue-600 transition-all duration-700"
                            />

                        </div>
                        <div className="pt-3 text-xs text-gray-400">
                            {done} Completed / {total} Total Tasks
                        </div>
                    </div>
                </div>
            </div>

            <div className='py-5 pb-2'>
                <div className="border border-[#252938] bg-[#171A26] rounded-md px-3 py-5 flex items-center justify-between">
                    <div className="">
                        <h1 className="text-lg">Project Tasks</h1>
                        <h1 className="text-xs text-gray-400">Manage and track all tasks for this project.</h1>
                    </div>
                    <button onClick={() => {
                        if (!singleProjectData?.id) return
                        setTaskCreationModal(true)
                        getSingleProject(singleProjectData?.id)
                    }} className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
                        <RiAddLine className="h-5 w-5" />
                        <span className="text-sm font-medium">Create Task</span>
                    </button>
                </div>
            </div>
            <div className="pb-3">
            <ProjectTask />
            </div>
        </div>
    )
}
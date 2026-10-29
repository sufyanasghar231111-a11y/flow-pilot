"use client"
import { project } from "@/components/adminpagescomponent/rightside/search/ProjectSearch";
import { Names } from "@/components/nameComponent/Names";
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { totalUserData } from "@/store/thunks/userThunk";
import { TimeZone } from "@/utils/TimeAgo";
import { RiArrowRightLongLine, RiTimeLine } from "@remixicon/react";
import { useEffect } from "react";

const data = project

export default function ProjectLittleDetail() {
    const { allDetail } = useAppSelector((state) => state.allData)
    const dispatch = useAppDispatch()
    const { user } = useAuth()
    const { authReady } = useLogin()

    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return
        dispatch(totalUserData(1))
    }, [authReady, dispatch, user?.role])

    return (
        <div className="card w-[65%] rounded-md px-4 py-2">
            <div className="flex items-center justify-between">
                <div className="text-xl font-semibold">
                    My projects
                </div>
                <div className="flex items-center gap-2 group text-gray-400 hover:text-white cursor-pointer">
                    <h1 className="text-sm">View All</h1>
                    <RiArrowRightLongLine className="w-5 h-5 group-hover:translate-x-0.5 transition-all duration-300" />
                </div>
            </div>
            <div className="flex flex-wrap gap-2 w-full pt-3">
                {
                    allDetail?.project?.slice(0, 4).map((elem) => {

                        const status = data[elem.project.status]
                        const StatusIcon = status.icon
                        const total = elem.project.tasks?.length
                        const done = elem.project.tasks?.filter(elem => elem.status === 'DONE').length
                        const progress = Math.round(((done || 0) / (total || 0)) * 100)
                        return <div
                            key={elem.project.id}
                            className="card group w-80.25 rounded-md border border-[#252938] bg-[#171A26] p-3 transition-all duration-300 hover:border-indigo-500/30 hover:bg-[#1A1E2C] hover:shadow-lg hover:shadow-indigo-500/5"
                        >
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex min-w-0 items-center gap-2.5">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-indigo-500/20">
                                        <StatusIcon className="h-4 w-4" />
                                    </div>

                                    <div className="min-w-0">
                                        <h1 className="truncate text-sm font-medium text-gray-200">
                                            {elem.project.name}
                                        </h1>
                                        <p className="mt-0.5 text-[11px] text-gray-500">
                                            Project
                                        </p>
                                    </div>
                                </div>

                                <span className={`shrink-0 rounded-md border px-2 py-1 text-[10px] font-medium ${status.style} `}>
                                    {elem.project.status}
                                </span>
                            </div>

                            <div className="mt-3">
                                <div className="mb-1.5 flex items-center justify-between">
                                    <span className="text-xs text-gray-400">
                                        Project Progress
                                    </span>
                                    <span className="text-xs font-semibold text-gray-200">
                                        {progress ?? 0}%
                                    </span>
                                </div>

                                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#252938]">
                                    <div
                                        style={{ width: `${progress ?? 0}%` }}
                                        className="h-full rounded-full bg-indigo-500 transition-all duration-700 group-hover:bg-indigo-400"
                                    />
                                </div>
                            </div>

                            <div className="mt-2.5 flex items-center gap-2 text-gray-400">
                                <RiTimeLine className="h-3.5 w-3.5 shrink-0 text-gray-500" />
                                <span className="text-[11px]">
                                    <TimeZone time={elem.project.startDate} timeZone={user?.timeZone ?? 'Asia/Karach'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} /> — <TimeZone time={elem.project.deadline} timeZone={user?.timeZone ?? 'Asia/Karach'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} />
                                </span>
                            </div>

                            <div className="mt-2.5 flex items-center justify-between border-t border-[#252938] pt-2">
                                <div className="flex -space-x-2">
                                    {
                                        elem.project?.projectmembers?.map((elem) => {
                                            return <div key={elem.user.user.id} className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#171A26] bg-indigo-500/20 text-[9px] font-medium text-indigo-300">
                                                <Names userName={elem.user.user.username} />
                                            </div>
                                        })
                                    }

                                </div>

                                <span className="text-[11px] text-gray-500">
                                    {elem.project?.projectmembers?.length} member{(elem.project?.projectmembers?.length ?? 0) > 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}
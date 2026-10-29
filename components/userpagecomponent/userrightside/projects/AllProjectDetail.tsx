"use client"
import { project } from "@/components/adminpagescomponent/rightside/search/ProjectSearch";
import { Names } from "@/components/nameComponent/Names";
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { totalUserData } from "@/store/thunks/userThunk";
import { TimeZone } from "@/utils/TimeAgo";
import { RiArrowRightLongLine, RiCalendarTodoFill, RiTimeLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import ProjectPagination from "./ProjectPagination";

export default function AllProjectDetail() {
    const { user } = useAuth()
    const { authReady } = useLogin()
    const { allDetail } = useAppSelector((state) => state.allData)
    const dispatch = useAppDispatch()
    const [pagination, setPagination] = useState(1)

    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return
        dispatch(totalUserData({ pagination, toDoPagination: 1, progressPagination: 1, reviewPagination: 1, donePagination: 1 }))
    }, [authReady, dispatch, user?.role, pagination])

    return (
        <div className="py-4 px-4 pr-1">
            <div className="flex items-center gap-1.5">
                {
                    allDetail?.project.map((elem) => {

                        const status = project[elem.project.status ?? 'PENDING']
                        const StatusIcon = status.icon
                        const total = elem.project.tasks?.length
                        const done = elem.project.tasks?.filter(elem => elem.status === 'DONE').length
                        const progress = Math.round(((done || 0) / (total || 0)) * 100)
                        return <div key={elem.project.id} className="card w-66 shrink-0 rounded-xl p-3 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/40 hover:shadow-lg hover:shadow-indigo-500/5">

                            <div className={`flex h-20 w-full items-center justify-center rounded-lg border border-[#252938] ${status.style}`}>
                                <StatusIcon className="text-3xl" />
                            </div>

                            <div className="flex items-center justify-between gap-2 px-2 py-3">
                                <h1 className="truncate text-sm font-semibold text-gray-100">
                                    {elem.project.name}
                                </h1>

                                <button className={`shrink-0 rounded-full border ${status.style} px-2 py-1 text-[10px] font-medium`}>
                                    {elem.project.status}
                                </button>
                            </div>

                            <div className="space-y-3 px-2">

                                <div>
                                    <div className="mb-2 flex items-center justify-between text-xs text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <RiCalendarTodoFill className="text-sm text-indigo-400" />
                                            <span>Project Progress</span>
                                        </div>
                                        <span>{progress || 0}%</span>
                                    </div>

                                    <div title={`${progress || 0}%`} className="h-1.5 w-full overflow-hidden rounded-full bg-[#252938]">
                                        <div style={{ width: `${progress || 0}%` }} className="h-full w-full rounded-full bg-indigo-500 transition-all duration-600"></div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-xs text-gray-400">
                                    <RiTimeLine className="shrink-0 w-5 h-5 text-gray-500" />
                                    <h1><TimeZone time={elem.project.startDate} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} /> - <TimeZone time={elem.project.deadline} timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} /></h1>
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="flex -space-x-2">
                                        {
                                            elem.project.projectmembers?.map((elem) => {
                                                return <div key={elem.user.user.id} className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#171A26] bg-indigo-500/20 text-[10px] font-semibold text-indigo-300">
                                                    <Names userName={elem.user.user.username} />
                                                </div>
                                            })
                                        }
                                    </div>

                                    <span className="text-xs text-gray-500">
                                        {elem.project.projectmembers?.length || 0} members
                                    </span>
                                </div>

                            </div>

                            <div className="pt-6 pb-4">
                                <button className="group flex w-full items-center justify-center gap-2 rounded-lg border border-indigo-500/30 bg-indigo-500/5 py-2 text-sm font-medium text-indigo-400 transition-all duration-200 hover:border-indigo-500 hover:bg-indigo-500 hover:text-white">
                                    <h1>View Project</h1>
                                    <RiArrowRightLongLine className="transition-transform duration-200 group-hover:translate-x-1" />
                                </button>
                            </div>

                        </div>
                    })
                }
            </div>
            <ProjectPagination setPagination={setPagination} pagination={pagination} />
        </div>
    )
}
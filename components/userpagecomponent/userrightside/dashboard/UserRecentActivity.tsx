"use client"
import { Names } from "@/components/nameComponent/Names";
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { recentActivity } from "@/store/thunks/userThunk";
import { TimeInHour } from "@/utils/TimeAgo";
import { RiCheckLine, RiFolder2Fill, RiFolder2Line, RiPulseLine, RiTaskLine, RiTimeLine, RiUserAddLine } from "@remixicon/react";
import { useEffect } from "react"

const data = recentActivity()

export default function UserRecentActivity() {
    const { recentActivity } = useAppSelector((state) => state.recentActivity)
    const dispatch = useAppDispatch();
    const { user } = useAuth()
    const { authReady } = useLogin()
    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return
        dispatch(data)
    }, [authReady, dispatch, user?.role])

    return (
        <div className="card w-[34%] rounded-md border border-[#252938] bg-[#171A26] p-4">
            <div className="flex items-center justify-between border-b border-[#252938] pb-3">
                <div>
                    <h2 className="text-sm font-semibold text-gray-200">
                        Recent Activity
                    </h2>
                    <p className="mt-1 text-xs text-gray-500">
                        Your latest updates
                    </p>
                </div>

                <RiPulseLine className="h-5 w-5 text-indigo-400" />
            </div>

            <div className="mt-3 flex flex-col">
                {recentActivity.slice(0, 5).map((elem) => {
                    const activityStyles = {
                        teamMember: {
                            icon: RiUserAddLine,
                            style: 'bg-blue-500/10 text-blue-400',
                            message: `added you to a team`,
                        },
                        project: {
                            icon: RiFolder2Fill,
                            style: 'bg-indigo-500/10 text-indigo-400',
                            message: `added you to a project`,
                        },
                        taskCompleted: {
                            icon: RiCheckLine,
                            style: 'bg-emerald-500/10 text-emerald-400',
                            message: `You completed a task`,
                        },
                        taskCreated: {
                            icon: RiTaskLine,
                            style: 'bg-amber-500/10 text-amber-400',
                            message: `assigned you a task`,
                        },
                    }

                    const activity = activityStyles[elem.types as keyof typeof activityStyles]

                    if (!activity) return null

                    const Icon = activity.icon

                    return (
                        <div
                            key={`${elem.types} -${elem.id} `}
                            className="group flex gap-3 rounded-md px-2 py-3 transition-colors duration-200 hover:bg-[#1D2130]"
                        >
                            <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${activity.style} transition-transform duration-300 group-hover:scale-110`}>
                                {elem.types === 'teamMember' ? (
                                    <Names userName={elem.name} />
                                ) : (
                                    <Icon className="h-4 w-4" />
                                )}
                            </div>

                            <div className="min-w-0 flex-1">
                                <p className="text-xs leading-5 text-gray-300">
                                    {elem.types === 'teamMember' && (
                                        <>
                                            <span className="font-medium text-gray-100">
                                                {elem.name}
                                            </span>{' '}
                                            added you to a team
                                        </>
                                    )}

                                    {elem.types === 'project' && (
                                        <>
                                            Admin added you to project{' '}
                                            <span className="font-medium text-gray-100">
                                                &quot;{elem.name}&quot;
                                            </span>
                                        </>
                                    )}

                                    {elem.types === 'taskCompleted' && (
                                        <>
                                            You completed task{' '}
                                            <span className="font-medium text-gray-100">
                                                &quot;{elem.name}&quot;
                                            </span>
                                        </>
                                    )}

                                    {elem.types === 'taskCreated' && (
                                        <>
                                            Admin assigned you task{' '}
                                            <span className="font-medium text-gray-100">
                                                &quot;{elem.name}&quot;
                                            </span>
                                        </>
                                    )}
                                </p>

                                <div className="mt-1 flex items-center gap-1.5 text-gray-500">
                                    <RiTimeLine className="h-3 w-3 shrink-0" />
                                    <span className="text-[11px]">
                                        <TimeInHour
                                            time={elem.date}
                                            timeZone={user?.timeZone ?? 'Asia/Karachi'}
                                        />
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
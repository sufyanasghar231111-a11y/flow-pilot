import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { recentActivity } from "@/store/thunks/userThunk";
import { TimeInHour } from "@/utils/TimeAgo";
import { RiArrowDownLine, RiArrowRightSLine, RiCheckFill, RiFolder2Fill, RiLoaderLine, RiPulseLine, RiTaskFill, RiTeamFill } from "@remixicon/react";
import { useEffect, useState } from "react";

const arrayData = recentActivity

const RecentType = {
    teamMember: {
        style: ' bg-amber-500/10',
        iconBg: 'bg-amber-500',
        icon: RiTeamFill,
        type: 'Joined a Team',
        status: 'Team',
        statusStyle: 'text-amber-400 bg-amber-500/10'
    },
    taskCompleted: {
        style: ' bg-green-500/10',
        iconBg: 'bg-green-500',
        icon: RiCheckFill,
        type: 'Complete Task',
        status: 'Complete',
        statusStyle: 'text-green-400 bg-green-500/10'
    },
    taskCreated: {
        style: 'bg-blue-500/10',
        icon: RiTaskFill,
        iconBg: 'bg-blue-500',
        type: 'Joined a Task',
        status: 'Task',
        statusStyle: 'text-blue-400 bg-blue-500/10'
    },
    project: {
        style: 'bg-indigo-500/10',
        icon: RiFolder2Fill,
        iconBg: 'bg-indigo-500',
        type: 'Joined a Project',
        status: 'Project',
        statusStyle: 'text-indigo-400 bg-indigo-500/10'
    },
}

export default function AllActivity() {
    const { recentActivity, recentLoading } = useAppSelector((state) => state.recentActivity)
    const { activityCustomTab } = useAppSelector((state) => state.activityCustomTab)
    const { user } = useAuth()
    const { authReady } = useLogin()
    const dispatch = useAppDispatch()
    const [loadMoreData, setLoadMoreData] = useState(1)
    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return
        dispatch(arrayData(loadMoreData))
    }, [authReady, dispatch, user?.role, loadMoreData])

    const filterData = recentActivity?.recentActivity.filter(elem => {
        if (activityCustomTab === '') return true
        if (Array.isArray(activityCustomTab)) {
            return activityCustomTab.includes(elem.types)
        }

        return elem.types === activityCustomTab
    }
    )

    return (
        <div className="card px-3 py-2 rounded">
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
            <div className="flex flex-col gap-2 pt-3">
                {
                    filterData?.map((elem) => {
                        const status = RecentType[elem.types as keyof typeof RecentType]
                        const TypeIcon = status.icon
                        return <div key={`${elem.id}-${elem.types}`} className="grid grid-cols-[1.5fr_7fr_2fr_2.5fr_0.5fr] items-center justify-center border-b pb-3 border-[#252938] group">
                            <div className={`w-13 h-13 rounded-full ${status.style} flex items-center justify-center`}>
                                <div className={`w-7 h-7 rounded-full ${status.iconBg} flex items-center justify-center`}>
                                    <TypeIcon className={`w-5 h-5 `} />
                                </div>
                            </div>
                            <div>
                                <div className=" text-md">
                                    {status.type}
                                </div>
                                <div className="text-gray-400 text-[13px] ">
                                    {elem.name}
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                <TimeInHour time={elem.date} timeZone={user?.timeZone ?? 'YYYY-MM-DD'} />
                            </div>
                            <div className={`text-xs px-3 py-1 w-fit rounded-full ${status.statusStyle} `}>
                                {status.status}
                            </div>
                            <div>
                                <RiArrowRightSLine className="text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
                            </div>
                        </div>
                    })
                }
            </div>
            <div className="flex items-center justify-center pb-3">
                <button disabled={recentLoading} onClick={() => { setLoadMoreData(prev => prev + 1) }} className="flex items-center justify-center gap-2 mt-4 text-blue-300 bg-blue-500/10 w-70 disabled:opacity-45 disabled:cursor-not-allowed py-2 rounded cursor-pointer">
                    {
                        recentLoading ? <RiLoaderLine className="w-4 h-4 animate-spin" /> : <RiArrowDownLine className="w-4 h-4" />
                    }

                    <h1 className="text-sm ">Load More Activity</h1>
                </button>
            </div>
        </div>
    )
}
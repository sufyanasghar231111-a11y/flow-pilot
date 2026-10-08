"use client"
import { Names } from "@/components/nameComponent/Names";
import { useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { DataType } from "@/store/slices/RecentSlice";
import { recentThunk } from "@/store/thunks/recentThunk";
import { RiArrowRightLongLine } from "@remixicon/react";
import { formatDistanceToNowStrict } from "date-fns";
import { useEffect } from "react";

export default function RecentActivity() {
    const { authReady } = useLogin()

    const dispatch = useAppDispatch();

    const { recentData, loading, error } = useAppSelector(
        (state) => state.recent
    )

    useEffect(() => {
        if (!authReady) return
        dispatch(recentThunk())
    }, [authReady, dispatch])


    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="w-[100%] border border-[#252938] bg-[#171A26] rounded-md">
            <div className="px-3 py-2">
                <div className="flex items-center justify-between">
                    <div> <h1 className="text-sm font-semibold">Recent Update</h1>
                        <p className="text-xs text-gray-500">Last update from your team.</p></div>
                    <div>
                        <h1 className="text-xs flex items-center gap-1 text-blue-500">View all <RiArrowRightLongLine className="w-4 h-4" /></h1>
                    </div>
                </div>
            </div>
            {
                recentData.slice(0, 5).map((elem: DataType, index: number) => {

                    return <div key={index} className="px-3 py-1.5 border-b border-[#252938]">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-7 h-7 rounded-full text-xs bg-blue-600 ${elem.types === 'project_Creation' && 'bg-amber-500'} ${elem.types === 'project_completed' && 'bg-green-500'} ${elem.types === 'taskCompletion' && 'bg-green-500'} flex items-center justify-center`}>
                                    {
                                        elem.types === 'project_Creation' && (<Names userName={elem.name} />)
                                    }
                                    {
                                        elem.types === 'project_completed' && (<Names userName={elem.name} />)
                                    }
                                    {
                                        elem.types === 'taskCompletion' && (<Names userName={elem.username.user.username} />)
                                    }
                                    {
                                        elem.types === 'taskCreation' && (<Names userName={elem.username.user.username} />)
                                    }
                                    {
                                        elem.types === 'Member_joined' && (<Names userName={elem.user} />)
                                    }
                                </div>

                                <div className="text-sm">
                                    {elem.types === 'project_Creation' && (elem.name)}
                                    {elem.types === 'project_completed' && (elem.name)}
                                    {elem.types === 'taskCompletion' && (elem.username.user.username)}
                                    {elem.types === 'taskCreation' && (elem.username.user.username)}
                                    {elem.types === 'Member_joined' && (elem.user)}{" "}

                                    <span className="text-[11px] text-gray-400">
                                        {elem.types === 'project_Creation' && "created -"}
                                        {elem.types === 'project_completed' && "completed -"}
                                        {elem.types === 'taskCompletion' && 'task completed -'}
                                        {elem.types === 'taskCreation' && 'task created -'}
                                        {elem.types === 'Member_joined' && 'Joined the team'}

                                    </span>{" "}
                                    <span className="text-sm text-gray-300">
                                        {elem.name}
                                    </span>
                                </div>
                            </div>

                            <div className="text-[11px] text-gray-500 whitespace-nowrap">
                                {formatDistanceToNowStrict(new Date(elem.data), { addSuffix: true })}
                            </div>
                        </div>
                    </div>

                })
            }
        </div>
    )
}
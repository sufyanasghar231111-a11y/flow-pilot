import { useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { NotificationDetailInter } from "@/store/slices/NotificationSlice";
import { notificationAdmin } from "@/store/thunks/thunks";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useEffect, useState } from "react";

export default function NotificationPagination({ filter }: { filter: NotificationDetailInter[] }) {

    const [page, setPage] = useState(1)

    const { authReady } = useLogin()
    const dispatch = useAppDispatch()

    const { notificationStat } = useAppSelector((state) => state.notificationStat)

    useEffect(() => {
        if (!authReady) return
        dispatch(notificationAdmin({
            page,
            type: "All",
            startDate: "",
            endDate: ""
        }))
    }, [authReady, dispatch, page])


    return (
        <div className="flex items-center justify-between border-t border-[#252938]  pt-3 px-2">
            <div className="text-sm text-[#7d8794]">
                Showing {filter.length} of {notificationStat.totalNotification} notifications
            </div>

            <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className={`flex h-8 w-8 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md border border-blue-500/25 bg-blue-800/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.08)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/40 hover:text-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95`}>
                    <RiArrowLeftSLine className="h-5 w-5" />
                </button>

                <button disabled={filter.length <= 8} onClick={() => setPage(page + 1)} className={`flex h-8 w-8 items-center justify-center disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer rounded-md border border-blue-500/25 bg-blue-800/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.08)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/40 hover:text-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95`}>
                    <RiArrowRightSLine className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
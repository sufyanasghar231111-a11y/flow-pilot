import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { getAllUserNotificationThunk } from "@/store/thunks/userNotificationThunk";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useEffect, useState } from "react";

export default function AllNotificationPagination() {

    const dispatch = useAppDispatch()
    const { user } = useAuth()
    const { authReady } = useLogin()
    const [page, setPage] = useState(1)
    useEffect(() => {
        if (!authReady || !user) return
        dispatch(getAllUserNotificationThunk({
            type: "",
            startDate: "",
            endDate: "",
            page
        }))
    }, [authReady, dispatch, page, user])
    const { userNotification } = useAppSelector((state) => state.userNotification)


    return (
        <div className="px-4 pt-4 ">
            <div className="flex items-center justify-between">
                <div className="text-sm text-gray-400">
                    Showing {userNotification?.getNotification.length} of {userNotification?.totalNotification}
                </div>
                <div className="flex items-center gap-3">
                    <button disabled={page === 1} onClick={() => { setPage(prev => prev - 1) }} className="border rounded disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:border-gray-800  hover:border-blue-500 hover:bg-blue-500/10 px-1 py-0.5 border-gray-500">
                        <RiArrowLeftSLine />
                    </button>
                    <button disabled={(userNotification?.getNotification.length || 0) < 8} onClick={() => { setPage(prev => prev + 1) }} className="border rounded disabled:opacity-45 disabled:cursor-not-allowed disabled:hover:border-gray-800  hover:border-blue-500 hover:bg-blue-500/10 px-1 py-0.5 border-gray-500">
                        <RiArrowRightSLine />
                    </button>
                </div>
            </div>
        </div>
    )
}
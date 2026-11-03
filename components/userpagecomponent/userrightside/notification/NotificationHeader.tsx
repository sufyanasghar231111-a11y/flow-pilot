"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { markAllNotificationThunk } from "@/store/thunks/userNotificationThunk"

export default function NotificationHeader() {
    const dispatch = useAppDispatch()
    const { markAllLoading } = useAppSelector((state) => state.markAllRead)
    const { userNotification } = useAppSelector((state) => state.userNotification)
    const checkRead = userNotification?.getNotification.filter(elem => !elem.isRead).length ?? 0
    return (
        <div className="pt-23 px-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-white">Notifications</h1>
                <p className=" text-sm text-[#7d8794]">Stay updated with latest activities and important alerts from your workspace</p>
            </div>
            <button disabled={markAllLoading || checkRead === 0} onClick={() => { dispatch(markAllNotificationThunk()) }} className="px-3 py-1.5 border disabled:opacity-50 disabled:cursor-not-allowed rounded border-gray-700 text-sm bg-gray-500/10">
                {markAllLoading ? 'Marking all as read' : 'Mark all as read'}
            </button>
        </div>
    )
}
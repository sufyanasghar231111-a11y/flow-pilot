"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { markAll } from "@/store/thunks/thunks"

export default function NotificationHeader() {
    const dispatch = useAppDispatch()
    const { markAllLoading } = useAppSelector((state) => state.allRead)

    return (
        <div className="pt-23 px-4 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold text-white">Notifications</h1>
                <p className="mt-1 text-sm text-[#7d8794]">Stay updated with latest activities and important alerts from your workspace</p>
            </div>
            <button disabled={markAllLoading} onClick={() => { dispatch(markAll()) }} className="px-3 py-1.5 border disabled:opacity-50 disabled:cursor-not-allowed rounded border-gray-700 text-sm bg-gray-500/10">
                {
                    markAllLoading ? 'Marking': 'Mark all as read'
                }
            </button>
        </div>
    )

}
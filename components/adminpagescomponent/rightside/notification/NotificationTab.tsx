"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setNotificationTab } from "@/store/slices/NotificationSlice"

export default function NotificationTab() {
    const dispatch = useAppDispatch()
    const { notificationTab } = useAppSelector((state) => state.notificationTab)
    const { notificationDetail } = useAppSelector((state) => state.notificationDetail)
    const total = notificationDetail.filter(elem => !elem.isRead).length
    const totalRead = notificationDetail.filter(elem => elem.isRead).length

    return (
        <>
            <h1 onClick={() => { dispatch(setNotificationTab('All')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${notificationTab === 'All' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>All</h1>
            <h1 onClick={() => { dispatch(setNotificationTab('UnRead')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${notificationTab === 'UnRead' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>Unread <span className="text-white"> ({total})</span></h1>
            <h1 onClick={() => { dispatch(setNotificationTab('Read')) }} className={` rounded w-20 flex items-center justify-center pb-2  ${notificationTab === 'Read' ? 'border-blue-500 text-white border-b-4' : "text-gray-400 border-0"} cursor-pointer `}>Read  <span className="text-white"> ({totalRead})</span></h1>
        </>
    )
}
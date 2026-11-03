import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { useUser } from "@/hooks/useUser"
import { NotificationDetailInter } from "@/store/slices/NotificationSlice"
import { deleteThunk, singleMarkThunk } from "@/store/thunks/userNotificationThunk"
import { RiDeleteBin6Line, RiMailOpenLine } from "@remixicon/react"

export default function NotificationUpdateAndDelete({ elem }: { elem: NotificationDetailInter }) {
    const { notificationModal } = useUser()
    const dispatch = useAppDispatch()
    const { marksingleLoading, marksingleError } = useAppSelector((state) => state.singleMark)
    const { singleDeleteError, singleDeleteLoading } = useAppSelector((state) => state.deleteSingleNotification)
    return (
        <>
            {
                notificationModal === elem.id && (
                    <div className="absolute right-12 -top-13 z-50 w-44 overflow-hidden rounded-xl border border-[#252938] bg-[#171A26] p-1.5 shadow-xl shadow-black/20">
                        <button disabled={marksingleLoading || elem.isRead} onClick={() => { dispatch(singleMarkThunk(elem.id)) }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 transition-colors duration-200 hover:bg-[#252938] hover:text-white"
                        >
                            <RiMailOpenLine className="w-5 h-5 text-indigo-400" />
                            {
                                marksingleLoading ? 'Marking as read' : 'Mark as read'
                            }
                        </button>

                        <div className="mx-2 border-t border-[#252938]" />

                        <button disabled={singleDeleteLoading} onClick={() => { dispatch(deleteThunk(elem.id)) }}
                            className="flex w-full items-center gap-3 disabled:opacity-45 disabled:cursor-not-allowed rounded-lg px-3 py-2 text-left text-sm font-medium text-red-400 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <RiDeleteBin6Line className="w-5 h-5" />
                            {singleDeleteLoading ? 'Deleting' : 'Delete'}
                        </button>
                    </div>
                )
            }
        </>
    )
}
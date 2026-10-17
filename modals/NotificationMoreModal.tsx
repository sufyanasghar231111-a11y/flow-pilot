import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { deleteSingle, markSingle } from "@/store/thunks/thunks";
import { RiDeleteBin6Line, RiMailOpenLine } from "@remixicon/react";

export default function NotificationMoreModal({ moreModal, id }: { moreModal: null | string | boolean, id: string }) {
    const dispatch = useAppDispatch()
    const { notificationSingleMarkLoading } = useAppSelector((state) => state.markSingle)
    const { notificationDeleteSingleLoading } = useAppSelector((state) => state.deleteSingle)
    return (
        <>
            {
                moreModal === id && (
                    <div className="absolute right-10 top-10 z-50 w-44 overflow-hidden rounded-xl border border-[#252938] bg-[#171A26] p-1.5 shadow-xl shadow-black/20">
                        <button disabled={notificationSingleMarkLoading} onClick={() => { dispatch(markSingle(id)) }}
                            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed text-gray-300 transition-colors duration-200 hover:bg-[#252938] hover:text-white"
                        >
                            <RiMailOpenLine className="text-base text-indigo-400" />
                            {
                                notificationSingleMarkLoading ? 'Marking as read' : 'Mark as read'
                            }
                        </button>

                        <div className="mx-2 border-t border-[#252938]" />

                        <button disabled={notificationDeleteSingleLoading} onClick={() => { dispatch(deleteSingle(id)) }}
                            className="flex w-full items-center gap-3 disabled:opacity-45 disabled:cursor-not-allowed rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-400 transition-colors duration-200 hover:bg-red-500/10 hover:text-red-300"
                        >
                            <RiDeleteBin6Line className="text-base" />
                            {notificationDeleteSingleLoading ? 'Deleting' : 'Delete'}
                        </button>
                    </div>
                )
            }
        </>
    )
}
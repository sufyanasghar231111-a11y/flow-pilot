import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { TaskState } from "@/contexts/taskContext/TaskContext";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { setUpdateModal } from "@/store/slices/userSlice";
import { singleTaskThunk } from "@/store/thunks/userThunk";
import { RiEditLine } from "@remixicon/react";
import { useEffect } from "react";

export default function TaskUpdateButton({ elem, updateUserTaskMore }: { elem: TaskState, updateUserTaskMore: string | null }) {
    const dispatch = useAppDispatch()
    const { authReady } = useLogin()
    const { user } = useAuth()

    useEffect(() => {
        if (!elem.id || authReady || user?.role !== 'USER') return
        dispatch(singleTaskThunk(elem.id))
    }, [authReady, dispatch, elem.id, user?.role])

    return (
        <>
            {
                elem.id && updateUserTaskMore === elem.id && (
                    <div
                        className=" absolute top-7 right-0 z-[200] w-32 rounded-lg border border-white/10 bg-[#171A26] p-1.5 shadow-xl shadow-black/40 "
                    >
                        <button onClick={() => {
                            if (!elem.id) return
                            dispatch(setUpdateModal(true))
                            dispatch(singleTaskThunk(elem.id))
                        }}
                            type="button"
                            onPointerDown={(e) => e.stopPropagation()}

                            className=" group flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-xs text-gray-300 transition-colors hover:bg-blue-500/10 hover:text-white cursor-pointer " >
                            <RiEditLine
                                className="
                        h-3.5 w-3.5
                        text-gray-400
                        transition-colors
                        group-hover:text-blue-400 "/>
                            <span>Update</span>
                        </button>
                    </div>
                )
            }
        </>
    )
}
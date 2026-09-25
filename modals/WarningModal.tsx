"use client"
import { useTaskUi1 } from "@/contexts/taskContext/TaskContext"

export default function WarningModal() {
    const { warningModal, setWarningModal } = useTaskUi1()
    return (
        <>
            {
                warningModal && (
                    <>
                    <div onClick={()=>{setWarningModal(false)}} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">

                        <div className="w-[360px] rounded-xl border border-gray-700 bg-[#171A26] p-5 shadow-2xl">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
                                <span className="text-xl text-yellow-400">
                                    !
                                </span>
                            </div>

                            <div className="text-center">
                                <h2 className="text-base font-semibold text-white">
                                    Task cannot be moved
                                </h2>

                                <p className="mt-2 text-sm leading-5 text-gray-400">
                                    This task can only be moved from
                                    <span className="mx-1 font-medium text-blue-400">
                                        Review
                                    </span>
                                    to
                                    <span className="ml-1 font-medium text-green-400">
                                        Complete
                                    </span>.
                                </p>
                            </div>

                            <button onClick={() => { setWarningModal(false) }}
                                className="mt-5 w-full rounded-lg bg-blue-600 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
                            >
                                Got it
                            </button>

                        </div>
                    </div>
                    </>
                )
            }
        </>

    )
}
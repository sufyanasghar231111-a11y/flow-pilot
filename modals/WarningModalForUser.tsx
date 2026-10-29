'use client'
import { useTaskUi1 } from "@/contexts/taskContext/TaskContext"
import {
    RiAlertLine,
    RiCloseLine,
    RiArrowRightLine,
    RiShieldCheckLine,
} from "@remixicon/react"

export default function WarningModalForUser() {
    const { warningModal, setWarningModal } = useTaskUi1()

    return (
        <>
            {warningModal && (
                <>
                    <div
                        onClick={() => setWarningModal(false)}
                        className="fixed inset-0 z-[302] bg-black/50 backdrop-blur-sm"
                    />

                    <div className="fixed left-1/2 top-1/2 z-[303] w-96 max-w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-[#252938] bg-[#171A26] p-6 text-gray-200 shadow-xl shadow-black/40">

                        <div className="flex items-start justify-between">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10">
                                <RiAlertLine className="h-5 w-5 text-amber-400" />
                            </div>

                            <button
                                type="button"
                                onClick={() => setWarningModal(false)}
                                className="rounded-md p-1 text-gray-500 transition hover:bg-white/5 hover:text-white"
                            >
                                <RiCloseLine className="h-5 w-5" />
                            </button>
                        </div>

                        <div className="mt-4">
                            <h2 className="text-lg font-semibold text-white">
                                Task Status Guidelines
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-400">
                                You can move your task forward through the
                                following stages. Tasks cannot be marked as
                                completed by users.
                            </p>
                        </div>

                        <div className="mt-5 space-y-3">
                            <div className="flex items-center gap-3 rounded-lg border border-[#303549] bg-[#11131D] p-3">
                                <span className="h-2 w-2 rounded-full bg-gray-400" />

                                <span className="text-sm font-medium text-gray-300">
                                    To Do
                                </span>

                                <RiArrowRightLine className="ml-auto h-4 w-4 text-gray-500" />

                                <span className="text-sm font-medium text-blue-400">
                                    In Progress
                                </span>
                            </div>

                            <div className="flex items-center gap-3 rounded-lg border border-[#303549] bg-[#11131D] p-3">
                                <span className="h-2 w-2 rounded-full bg-blue-400" />

                                <span className="text-sm font-medium text-blue-400">
                                    In Progress
                                </span>

                                <RiArrowRightLine className="ml-auto h-4 w-4 text-gray-500" />

                                <span className="text-sm font-medium text-amber-400">
                                    Review
                                </span>
                            </div>
                        </div>

                        <div className="mt-4 flex gap-3 rounded-lg border border-amber-500/20 bg-amber-500/5 p-3">
                            <RiShieldCheckLine className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />

                            <p className="text-xs leading-5 text-gray-400">
                                <span className="font-medium text-amber-300">
                                    Completion restricted.
                                </span>{" "}
                                Only an authorized admin can mark your task as
                                Done after review.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setWarningModal(false)}
                            className="mt-6 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 active:scale-[0.98]"
                        >
                            Got it
                        </button>
                    </div>
                </>
            )}
        </>
    )
}
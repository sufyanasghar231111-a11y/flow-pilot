"use client"
import { Names } from "@/components/nameComponent/Names"
import { useEvent, useEventUi } from "@/contexts/eventcontext/EventContext"
import { useMember } from "@/contexts/memberContext/MemberContext"
import { userType } from "@/types/usertype"
import { useState } from "react"

export default function MemberAddToEventModal() {
    const { addMemberModal, setAddMemberModal } = useEventUi()
    const { updateEventMember, singleEventData, removeEventMember } = useEvent()
    const [searchData, setSearchData] = useState('')
    const { allUser } = useMember()
    const search = searchData.trim().toLowerCase()
    const filterData = allUser.filter(elem => elem.username.trim().toLowerCase().includes(search))
    
    
    return (
        <>
            {
                addMemberModal && (
                    <>
                        <div onClick={() => { setAddMemberModal(false) }}
                            className="fixed inset-0 z-[300] bg-black/50 backdrop-blur-sm" />

                        <div className="w-96 fixed top-1/2 left-1/2 rounded-xl -translate-x-1/2 -translate-y-1/2 z-301 bg-[#171A26] text-gray-200 border border-white/[0.06] shadow-2xl shadow-black/40 flex flex-col max-h-[32rem]">

                            <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-white/[0.06]">
                                <div>
                                    <h2 className="text-[15px] font-medium text-gray-100">
                                        Add member
                                    </h2>

                                    <p className="text-xs text-gray-500 mt-0.5">
                                        Invite teammates to this Event
                                    </p>
                                </div>

                                <button
                                    onClick={() => setAddMemberModal(false)}
                                    className="text-gray-500 hover:text-gray-300 transition-colors rounded-md p-1 -mr-1 -mt-1 hover:bg-white/5"
                                    aria-label="Close"
                                >
                                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                        <path
                                            d="M12 4L4 12M4 4L12 12"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="px-6 pt-4 pb-3">
                                <input
                                    onChange={(elem) => { setSearchData(elem.target.value) }}
                                    value={searchData}
                                    placeholder="Search by name or email"
                                    className="w-full bg-white/[0.04] border border-white/[0.06] rounded-lg px-3 py-2 text-sm text-gray-200 placeholder:text-gray-500 outline-none focus:border-[#6C8EF5]/50"
                                />
                            </div>

                            <div className="flex-1 overflow-y-auto px-3 pb-2 space-y-0.5">

                                {filterData.map((user: userType) => {
                                    const find = singleEventData?.eventMember.some(
                                        (elem: { user: { id: string } }) => elem.member.id === user.id
                                    )
                                    return (
                                        <div key={user.id}>
                                            <button
                                                onClick={() =>
                                                    find
                                                        ? removeEventMember(singleEventData?.id, user.id)
                                                        : updateEventMember(singleEventData?.id, user.id)
                                                }
                                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${find
                                                    ? "bg-blue-800/60 border border-blue-400/60"
                                                    : "border border-transparent hover:bg-white/[0.04]"
                                                    }`}
                                            >
                                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-medium bg-blue-800/80 text-white shrink-0">
                                                    <Names userName={user.username} />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <p className="text-sm text-gray-200 truncate">
                                                        {user.username}
                                                    </p>

                                                    <p className="text-xs text-gray-500 truncate">
                                                        {user.email}
                                                    </p>
                                                </div>

                                                {find && (
                                                    <span className="text-xs text-blue-300">
                                                        Selected
                                                    </span>
                                                )}
                                            </button>
                                        </div>
                                    );
                                }

                                )}

                            </div>

                        </div>
                    </>
                )
            }

        </>
    )
}
"use client"
import { RiDeleteBinLine, RiMoreLine } from "@remixicon/react";
import TeamDetailHeader from "./TeamDetailHeader";
import { useTeam, useTeamUi1 } from "@/contexts/teamContext/TeamContext";
import { TimeAgo } from "@/utils/TimeAgo";
import { Names } from "@/components/nameComponent/Names";
import { useState } from "react";

export default function AllTeamDetail() {
    const { memberData, removeTeamMember } = useTeam()
    const [searchInput, setSearchInput] = useState('')
    const filterDate = memberData?.member.filter(elem => elem.username.trim().toLowerCase().includes(searchInput.trim().toLowerCase()))
    const { deleteMemberModal, setDeleteMemberModal } = useTeamUi1()

    function handleOpen(id: string) {
        setDeleteMemberModal(prev => prev === id ? null : id)
    }

    return (
        <div className="px-5 pt-4 bg-[#11131D] py-3">
            <div className="w-full overflow-hidden rounded-xl border border-[#252938] bg-[#171A26] shadow-sm">
                <TeamDetailHeader searchInput={searchInput} setSearchInput={setSearchInput} />

                <div className="mt-3 px-4 pb-4">
                    <div className="grid grid-cols-[2fr_2.5fr_1.5fr_2fr_1fr] items-center rounded-t-lg border border-[#252938] bg-[#1D202D] px-4 py-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                        <div>Name</div>
                        <div>Email</div>
                        <div>Status</div>
                        <div>Joined</div>
                        <div className="text-center">Actions</div>
                    </div>

                    {
                        filterDate?.map((elem) => {
                            return <div key={elem.id} className="grid grid-cols-[2fr_2.5fr_1.5fr_2fr_1fr] items-center border-x border-b border-[#252938] px-4 py-3 transition hover:bg-[#1D202D]/60">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-500/15 text-sm font-semibold text-blue-400">
                                        <Names userName={elem.username} />
                                    </div>

                                    <div>
                                        <h1 className="text-sm font-medium text-gray-100">
                                            {elem.username}
                                        </h1>
                                        <p className="mt-0.5 text-xs  text-gray-500">
                                            {elem.role}
                                        </p>
                                    </div>
                                </div>

                                <div className="text-sm text-gray-400">
                                    {elem.email}
                                </div>

                                <div>
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                        Active
                                    </span>
                                </div>

                                <div className="text-sm text-gray-400">
                                    <TimeAgo time={elem.createdAt} />
                                </div>

                                <div className="flex justify-center relative">
                                    <button onClick={() => { handleOpen(elem.id) }}
                                        type="button"
                                        className="rounded-md p-1.5 text-gray-400 transition hover:bg-[#252938] hover:text-gray-100"
                                    >
                                        <RiMoreLine size={20} />
                                    </button>
                                    {
                                        deleteMemberModal === elem.id && (
                                            <div
                                                className=" absolute top-6 right-10  z-[301] w-40 rounded-lg border border-white/10 px-1 pb-1 py-0.5 bg-[#171A26]  shadow-xl shadow-black/40 "
                                            >
                                                <button onClick={() => { removeTeamMember(elem.id) }}
                                                    type="button"

                                                    className=" group flex w-full items-center gap-2 rounded-md px-2.5 py-2 mt-1 text-xs text-red-400 transition-colors hover:bg-red-500/10 hover:text-red-300 cursor-pointe "
                                                >
                                                    <RiDeleteBinLine
                                                        className=" h-3.5 w-3.5 text-red-400 transition-colors group-hover:text-red-300 " />
                                                    <span>Remove Member</span>
                                                </button>

                                            </div>
                                        )
                                    }


                                </div>
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    );
}
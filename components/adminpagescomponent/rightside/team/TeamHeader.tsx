"use client"
import { useTeamUi1 } from "@/contexts/teamContext/TeamContext"
import { RiAddFill } from "@remixicon/react"

export default function TeamHeader() {
    const { setTeamMemberModal } = useTeamUi1()
    return (
        <div className="pt-23 px-4">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">Team</h1>
                    <h1 className="text-sm text-gray-400">Manage your team members, roles and permissions. Build a strong team <br /> for better productivity</h1>
                </div>
                <button onClick={() => { setTeamMemberModal(true) }} className="flex items-center text-sm gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
                    <RiAddFill className="h-5 w-5" />
                    <div>
                        Invite Member
                    </div>
                </button>

            </div>
        </div>
    )
}
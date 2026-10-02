"use client"

import { useTeam } from "@/contexts/teamContext/TeamContext"
import {
    RiTeamFill,
    RiAdminFill,
    RiUser3Fill,
} from "@remixicon/react"

export default function Stats() {
    const { teamMember } = useTeam()

    const data = [
        {
            name: "Total Members",
            total: teamMember.totalMember + 1,
            icon: RiTeamFill,
            new: teamMember.newTotal,
            text: "text-blue-400",
            bg: "bg-blue-500/10",
            hover: "hover:border-blue-500/30 hover:bg-blue-500/5",
            month: "new this month",
        },
        {
            name: "Total Admins",
            total: 1,
            icon: RiAdminFill,
            new: 0,
            text: "text-violet-400",
            bg: "bg-violet-500/10",
            hover: "hover:border-violet-500/30 hover:bg-violet-500/5",
            month: "new this month",
        },
        {
            name: "Total Users",
            total: teamMember.totalMember,
            icon: RiUser3Fill,
            new: teamMember.newTotal,
            text: "text-emerald-400",
            bg: "bg-emerald-500/10",
            hover: "hover:border-emerald-500/30 hover:bg-emerald-500/5",
            month: "new this month",
        },
    ]

    return data
}
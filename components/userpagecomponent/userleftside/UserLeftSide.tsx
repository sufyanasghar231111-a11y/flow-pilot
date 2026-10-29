"use client"
import { RiCalendarLine, RiDashboardLine, RiHistoryLine, RiKanbanView2, RiLogoutBoxRLine, RiNotification3Line, RiSettings3Line, RiTaskLine } from "@remixicon/react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import logo3 from '@/assets/icons/logo3.png'
import Link from "next/link"
import { useLogout } from "@/contexts/authContext/AuthContext"

export default function UserLeftSide() {

    const pathName = usePathname()
    const { handleLogout } = useLogout()

    const links = [
        {
            name: 'Dashboard',
            link: '/user/dashboard',
            icon: RiDashboardLine
        },
        {
            name: 'My Projects',
            link: '/user/projects',
            icon: RiKanbanView2
        },
        {
            name: 'My Tasks',
            link: '/user/tasks',
            icon: RiTaskLine
        },
        {
            name: 'Calendar',
            link: '/user/calendar',
            icon: RiCalendarLine
        },
        {
            name: 'Activity',
            link: '/user/activity',
            icon: RiHistoryLine
        },
        {
            name: 'Notifications',
            link: '/user/notifications',
            icon: RiNotification3Line
        },
        {
            name: 'Settings',
            link: '/user/settings',
            icon: RiSettings3Line
        },
    ]

    return (
        <div className="w-[19%] bg-[#0A0C16] text-white h-full fixed">
            <header className="px-7 py-4">
                <div className="flex items-center gap-2"><Image src={logo3} alt="FlowPilot" /> <h1 className="text-xl font-semibold tracking-tight">FlowPilot</h1></div>
                <div className="pt-7 px-4">
                    <div className="bg-[#5B6EF5]/15 border border-[#5B6EF5]/30 text-[#AEB8FF] px-3 py-1.5 w-fit text-sm rounded-md font-semibold">
                        User
                    </div>
                </div>
            </header>
            <div className="px-2  flex flex-col gap-1">
                {
                    links.map((elem, index) => {
                        const Icon = elem.icon
                        const isActive = pathName === elem.link || pathName.startsWith(`${elem.link}/`)
                        return <div key={index}>
                            <Link href={elem.link}>
                                <div className={`flex items-center gap-4 px-6 py-2.5 ${isActive ? 'bg-[#5B6EF5]/15 text-white border border-[#5B6EF5]/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}  rounded-md`}>
                                    <div>
                                        <Icon className="w-5.5 h-5.5" />
                                    </div>
                                    <h1 className="text-[15px]"> {elem.name}</h1>
                                </div>
                            </Link>
                        </div>
                    })
                }
            </div>
            <footer className="pt-30 px-2">
                <button onClick={handleLogout} type="button" className="w-full flex items-center gap-5 px-5.5 py-2.5 text-[15px] text-gray-400 hover:bg-white/5 hover:text-white border border-transparent rounded-md transition-colors">
                    <RiLogoutBoxRLine className="w-5 h-5 " /> <h1>Logout</h1>
                </button>
            </footer>
        </div>
    )
}
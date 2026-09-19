'use client'
import Image from "next/image";
import logo3 from '@/assets/icons/logo3.png'
import { RiCalendarLine, RiCalendarTodoFill, RiDashboardLine, RiFolderChartFill, RiKanbanView, RiLineChartLine, RiLogoutBoxRLine, RiNotification4Line, RiSettings2Fill, RiTeamLine } from "@remixicon/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLeftSide() {

    const pathname = usePathname();

    const routeLink = [
        {
            name: 'Dashboard',
            link: '/admin/dashboard',
            icon: RiDashboardLine
        },
        {
            name: 'Projects',
            link: '/admin/projects',
            icon: RiKanbanView
        },
        {
            name: 'Tasks',
            link: '/admin/tasks',
            icon: RiCalendarTodoFill
        },
        {
            name: "Calendar",
            link: '/admin/calendar',
            icon: RiCalendarLine
        },
        {
            name: 'Team',
            link: '/admin/teams',
            icon: RiTeamLine
        },
        {
            name: 'Analytics',
            link: '/admin/analytics',
            icon: RiLineChartLine
        },
        {
            name: 'Reports',
            link: '/admin/reports',
            icon: RiFolderChartFill
        },
        {
            name: 'Notifications',
            link: '/admin/notifications',
            icon: RiNotification4Line
        },
        {
            name: 'Settings',
            link: '/admin/settings',
            icon: RiSettings2Fill
        },
    ]

    return (
        <div className="w-[21%] bg-[#0A0C16] text-white h-full fixed ">
            <header className="px-7 py-4">
                <div className="flex items-center gap-2"><Image src={logo3} alt="FlowPilot" /> <h1 className="text-xl font-semibold tracking-tight">FlowPilot</h1></div>
                <div className="pt-7 px-4">
                    <div className="bg-[#5B6EF5]/15 border border-[#5B6EF5]/30 text-[#AEB8FF] px-3 py-1.5 w-fit text-sm rounded-md font-semibold">
                        Admin
                    </div>
                </div>
            </header>

            <main className=" px-2  flex flex-col gap-1">
                {
                    routeLink.map((elem, index) => {
                        const Icon = elem.icon

                        const isActive =
                            pathname === elem.link || pathname.startsWith(`${elem.link}/`)
                        return <div key={index}>
                            <Link href={elem.link}>
                                <div  className={`flex items-center gap-4 px-6 py-2.5 ${isActive ? 'bg-[#5B6EF5]/15 text-white border border-[#5B6EF5]/30' : 'text-gray-400 hover:bg-white/5 hover:text-white border border-transparent'}  rounded-md`}>
                                    <div>
                                        <Icon className="w-5.5 h-5.5" />
                                    </div>
                                    <h1 className="text-[15px]"> {elem.name}</h1>
                                </div>
                            </Link>
                        </div>
                    })
                }

                <footer className="">
                    <button type="button" className="w-full flex items-center gap-5 px-5.5 py-2.5 text-[15px] text-gray-400 hover:bg-white/5 hover:text-white border border-transparent rounded-md transition-colors">
                        <RiLogoutBoxRLine className="w-5 h-5 " /> <h1>Logout</h1>
                    </button>
                </footer>
            </main>
        </div>
    )
}
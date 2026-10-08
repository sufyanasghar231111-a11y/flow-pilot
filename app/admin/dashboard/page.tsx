"use client"

import AdminNav from "@/components/adminpagescomponent/nav/AdminNav"
import RecentActivity from "@/components/adminpagescomponent/rightside/analytics/overview/RecentActivity"
import ProjectComponent from "@/components/adminpagescomponent/rightside/dashboard/ProjectsComponent"
import { RiAddFill, RiFolderChartLine, RiLineChartLine, RiUserAddLine } from "@remixicon/react"


export default function Admin() {

    const btnArray = [
        {
            name: 'Create Project',
            icon: RiAddFill
        },
        {
            name: 'Manage Users',
            icon: RiUserAddLine
        },
        {
            name: 'View Analytics',
            icon: RiLineChartLine
        },
        {
            name: 'Generate Report',
            icon: RiFolderChartLine
        },

    ]

    return (
        <div className="w-full h-full">
            <AdminNav />
            <ProjectComponent />
            <div className="flex items-center gap-2 px-5 pb-3 bg-[#11131D]">

                <div className="w-[50%] mt-2">
                    <RecentActivity />
                </div>

                <div className="w-[50%] ">
                    <div className="w-full px-5 py-2 bg-[#171A26] rounded-lg">
                        <h1 className="text-sm font-semibold">Quick Actions</h1>
                        <div className="pt-4">
                            <div className="flex flex-col gap-2">
                                {
                                    btnArray.map((elem, index) => {
                                        const Icon = elem.icon
                                        return <button key={index} className="flex items-center justify-center gap-2 w-full py-3 bg-[#2e3268] hover:bg-[#3B82F6] rounded-md">
                                            <Icon className="w-5 h-5" />
                                            <h1 className="font-semibold text-sm">{elem.name}</h1>
                                        </button>
                                    })
                                }
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
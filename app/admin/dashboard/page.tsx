"use client"

import AdminNav from "@/components/adminpagescomponent/nav/AdminNav"
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
            <div className="flex items-center gap-3 px-6 pb-3 bg-[#11131D]">

                <div className="w-[60%]">
                    <div className="w-full px-5 py-4 bg-[#171A26] rounded-xl border border-[#252938] shadow-sm">

                        <h1 className="text-sm font-semibold text-white">
                            Recent Activity
                        </h1>

                        <div className="pt-3 flex items-center justify-between border-b border-[#252938] pb-1.5">

                            <div className="flex items-center gap-4">

                                <div className="w-8 h-8 rounded-full border border-[#353A4D] bg-[#1D2130] flex items-center justify-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
                                </div>

                                <div className="flex gap-1 items-center">
                                    <h1 className="font-semibold text-[15px] text-white">
                                        Sarah Wilson
                                    </h1>
                                    <span className="text-xs text-[#9499AA]">
                                        Completed Task
                                    </span>
                                </div>

                            </div>

                            <div className="text-sm text-[#9499AA]">
                                2 hours ago
                            </div>

                        </div>


                    </div>
                </div>

                <div className="w-[40%] ">
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
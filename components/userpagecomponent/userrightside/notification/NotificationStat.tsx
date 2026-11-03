"use client"
import { RiArrowUpLine } from "@remixicon/react"
import NotificationStatData from "./NotificationStatData"

export default function NotificationStat() {
    const data = NotificationStatData()
    return (
        <div className="px-4 pt-4 pb-2">
            <div className="flex gap-2">
                {
                    data.map((elem, index) => {
                        const Icon = elem.icon
                        return <div key={index} className="w-64.5 h-fit shrink-0 rounded-xl border border-[#252938] bg-[#171A26] px-4 py-4 group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#1A1D2B] hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]">
                            <div className="flex items-center gap-4">
                                <div
                                    className={` w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#222635] border border-[#2C3040] transition-all duration-300  ${elem.hover} group-hover:scale-105 `} >
                                    <Icon
                                        className={` w-6 h-6 ${elem.text} transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}
                                    />
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-[#9499AA] ">
                                        {elem.name}
                                    </p>
                                    <h1
                                        className=" text-2xl font-semibold text-[#E8EAF0] mt-0.5 transition-colors duration-300 group-hover:text-white">
                                        {elem.total}
                                    </h1>
                                </div>
                            </div>

                            <div className="flex items-center justify-center w-full gap-1.5 pt-5 text-sm">
                                <div className={`flex items-center justify-center w-6 h-6 rounded-full   `}>
                                    <RiArrowUpLine className={`w-4 h-4 ${(elem.new || 0) > 0 ? 'text-green-500 ' : "text-red-500 rotate-180"}`} />
                                </div>

                                <span className="text-[#9499AA]">
                                    <span className={` ${(elem.new || 0) > 0 ? 'text-green-500' : "text-red-500"} font-medium`}>{elem.new}% <span className="text-xs text-gray-400">vs {elem.compare}</span></span>
                                </span>
                            </div>
                        </div>
                    })
                }

            </div>
        </div>
    )
}
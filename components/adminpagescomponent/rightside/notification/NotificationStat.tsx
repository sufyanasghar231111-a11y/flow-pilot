"use client"

import { RiArrowUpLine } from "@remixicon/react";
import NotificationStatData from "./NotificationStatData";
import { useAppDispatch } from "@/hooks/reduxhooks";
import { notificationStat } from "@/store/thunks/thunks";
import { useLogin } from "@/contexts/authContext/AuthContext";
import { useEffect } from "react";

export default function NotificationStat() {
    const { authReady } = useLogin()
    const data = NotificationStatData()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (!authReady) return
        dispatch(notificationStat())
    }, [authReady, dispatch])

    return (
        <div className="px-4 flex flex-wrap gap-3 pt-4 pb-3">
            {
                data.map((elem, index) => {
                    const Icon = elem.icon
                    return <div key={index} className="w-full sm:w-[48%] lg:w-[24%] h-fit shrink-0 rounded-xl border border-[#252938] bg-[#171A26] px-4 py-4 group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#1A1D2B] hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)]">
                        <div className="flex items-center gap-4">
                            <div
                                className={` w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#222635] border border-[#2C3040] transition-all duration-300 ${elem.hover}  group-hover:scale-105 `} >
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
                            <div className={`flex items-center justify-center w-6 h-6 rounded-full ${elem.new > 0 ? 'bg-green-500/10' : 'bg-red-500/10'}  `}>
                                <RiArrowUpLine className={`w-4 h-4 ${elem.new > 0 ? 'text-green-500 ' : "text-red-500 rotate-180"}`} />
                            </div>

                            <span className="text-[#9499AA]">
                                <span className={` ${elem.new > 0 ? 'text-green-500' : "text-red-500"} font-medium`}>{elem.new}% <span className="text-xs text-gray-400">vs {elem.compare}</span></span>
                            </span>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
"use client"
import { useAuth } from "@/contexts/authContext/AuthContext";
import { useSetting } from "@/contexts/setting/SettingContext";
import { RiCalendarLine, RiFlowChart, RiMailLine, RiSave2Line, RiSettings2Line, RiTimeLine, } from "@remixicon/react";
import { useEffect } from "react";

export default function ApplicationSetting() {
    const { user } = useAuth()
    const { timeZone, setTimeZone, updateTimeZone, dateFormat, setDateFormat } = useSetting()

    useEffect(() => {
        if (!user) return

        setTimeZone(user?.timeZone ?? 'Asia/karachi')
        setDateFormat(user?.dateFormat ?? 'YYYY-MM-DD')

    }, [setDateFormat, setTimeZone, user])

    return (
        <div className="w-full  border border-[#252938] bg-[#171A26] p-3 rounded-md">
            <div className="flex items-center gap-3 border-b border-[#292E40] pb-3 justify-between w-full">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 shadow-[0_0_18px_rgba(59,130,246,0.08)]">
                            <RiSettings2Line className="text-blue-400" size={21} />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-sm font-semibold tracking-wide text-white">
                                General Settings
                            </h1>
                            <p className=" text-xs mt-0.5 text-gray-400 ">
                                Configure basic information about your <br /> organization and application.
                            </p>
                        </div>
                    </div>
                </div>
                <button onClick={updateTimeZone} className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
                    <RiSave2Line className="h-4 w-4" />
                    <span className="text-xs font-medium">Save Changes</span>
                </button>
            </div>
            <div className="py-2 flex items-center flex-wrap gap-3 ">
                <div className="">
                    <h1 className="text-sm mb-1 text-gray-400 font-medium">
                        Organization Name
                    </h1>
                    <button className="w-65 border flex items-center px-3 gap-2 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200">
                        <RiFlowChart className="w-4 h-4 text-blue-400" />
                        <span className="text-gray-300">FlowPilot</span>
                    </button>
                </div>
                <div className="">
                    <h1 className="text-sm mb-1 text-gray-400 font-medium">
                        Email Address
                    </h1>
                    <button className="w-65 border flex items-center px-3 gap-2 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200">
                        <RiMailLine className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-gray-300">{user?.email}</span>
                    </button>
                </div>
                <div className="">
                    <h1 className="text-sm mb-1 text-gray-400 font-medium">
                        Time Zone
                    </h1>

                    <div className="relative w-65">
                        <RiTimeLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

                        <select
                            onChange={(elem) => { setTimeZone(elem.target.value) }}
                            value={timeZone}
                            className="w-full appearance-none border px-3 pl-9 pr-8 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        >
                            <option value="Asia/Karachi">Pakistan (Asia/Karachi)</option>
                            <option value="Asia/Dubai">Dubai (Asia/Dubai)</option>
                            <option value="Asia/Kolkata">India (Asia/Kolkata)</option>
                            <option value="Europe/London">London (Europe/London)</option>
                            <option value="Europe/Paris">Paris (Europe/Paris)</option>
                            <option value="America/New_York">New York (America/New_York)</option>
                            <option value="America/Los_Angeles">Los Angeles (America/Los_Angeles)</option>
                            <option value="Asia/Tokyo">Tokyo (Asia/Tokyo)</option>
                            <option value="Australia/Sydney">Sydney (Australia/Sydney)</option>
                            <option value="UTC">UTC</option>
                        </select>
                    </div>
                </div>
                <div className="">
                    <h1 className="text-sm mb-1 text-gray-400 font-medium">
                        Date Format
                    </h1>

                    <div className="relative w-65">
                        <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

                        <select
                            value={dateFormat}
                            onChange={(elem) => { setDateFormat(elem.target.value) }}
                            className="w-full appearance-none border px-3 pl-9 pr-8 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        >
                            <option value='MMM DD, YYYY'>MMM DD, YYYY (Oct 13, 2026)</option>
                            <option value="DD/MM/YYYY">DD/MM/YYYY (19/10/2026)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (10/19/2026)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (2026-10-19)</option>
                            <option value="DD-MMM-YYYY">DD-MMM-YYYY (19-Oct-2026)</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    )
}
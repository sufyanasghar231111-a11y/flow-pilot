"use client"
import { useAuth } from "@/contexts/authContext/AuthContext";
import { useSetting } from "@/contexts/setting/SettingContext";
import { RiCalendarLine, RiComputerLine, RiFlowChart, RiGlobalLine, RiHome2Line, RiLoaderLine, RiMailLine, RiMoonLine, RiSave2Line, RiSettings2Line, RiSunFill, RiTimeLine } from "@remixicon/react";
import { useEffect } from "react";

export default function UserGeneralSetting() {
    const { timeZone, setTimeZone, updateTimeZone, dateFormat, setDateFormat, settingLoading } = useSetting()
    const { user } = useAuth()
    useEffect(()=>{
        setTimeZone(user?.timeZone ?? 'Asia/Karachi')
        setDateFormat(user?.dateFormat ?? 'YYYY-MM-DD')
    },[setDateFormat, setTimeZone, user?.dateFormat, user?.timeZone])

    return (
        <div className="w-[50%] flex flex-col gap-2">
            <div className=" p-3 rounded-2xl border border-[#292E40] bg-gradient-to-b from-[#191D2B] to-[#141722] gap-3  shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between w-full">
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
                    <button disabled={settingLoading} onClick={() => { updateTimeZone() }} className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 disabled:opacity-45 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
                        {
                            settingLoading ?  <RiLoaderLine className="h-4 w-4" />: <RiSave2Line className="h-4 w-4" />
                        }
                       
                        <span className="text-xs font-medium">{settingLoading ? 'Save Changing':'Save Changes'}</span>
                    </button>
                </div>

                <div className="py-2 flex items-center flex-wrap gap-3 ">
                    <div className="">
                        <h1 className="text-sm mb-1 text-gray-400 font-medium">
                            Organization Name
                        </h1>
                        <button className="w-60 shrink-0 border flex items-center px-3 gap-2 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200">
                            <RiFlowChart className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300">FlowPilot</span>
                        </button>
                    </div>
                    <div className="">
                        <h1 className="text-sm mb-1 text-gray-400 font-medium">
                            Email Address
                        </h1>
                        <button className="w-61 shrink-0 border flex items-center px-3 gap-2 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200">
                            <RiMailLine className="w-4 h-4 text-blue-400" />
                            <span className="text-gray-300  truncate">sufyanasghar231111@gmail.com16</span>
                        </button>
                    </div>
                    <div className="pt-3">
                        <h1 className="text-sm mb-1 text-gray-400 font-medium">
                            Time Zone
                        </h1>

                        <div className="relative w-60">
                            <RiTimeLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

                            <select onChange={(elem) => { setTimeZone(elem.target.value) }}
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
                    <div className="pt-3">
                        <h1 className="text-sm mb-1 text-gray-400 font-medium">
                            Date Format
                        </h1>

                        <div className="relative w-61">
                            <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

                            <select onChange={(elem) => { setDateFormat(elem.target.value) }}
                                value={dateFormat}
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
            <div className=" p-3 rounded-2xl border border-[#292E40] bg-gradient-to-b from-[#191D2B] to-[#141722]  shadow-[0_8px_30px_rgba(0,0,0,0.18)]">
                <div className="flex items-center justify-between ">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 shadow-[0_0_18px_rgba(59,130,246,0.08)]">
                            <RiComputerLine className="text-blue-400" size={21} />
                        </div>

                        <div className="min-w-0">
                            <h1 className="text-sm font-semibold tracking-wide text-white">
                                Application Preferences
                            </h1>
                            <p className=" text-xs mt-0.5 text-gray-400 ">
                                Customize the look and behavior of your application.
                            </p>
                        </div>
                    </div>

                </div>
                <div className="flex items-center gap-2 pt-4 ">
                    <div className=" rounded w-[33%] h-30 border-2 flex items-center gap-2 flex-col justify-center border-blue-600 bg-[#1B2236]">
                        <RiMoonLine className="text-blue-600 w-7 h-7" />
                        <h1 className="text-sm">Dark</h1>
                    </div>
                    <div className="border-2 hover:border-blue-600 transition-all  duration-300 group w-[33%] h-30 flex items-center gap-2 flex-col justify-center border-[#343B52] bg-[#1B2236] rounded">
                        <RiSunFill className=" w-7 h-7 group-hover:text-blue-600 transition-all  duration-300 " />
                        <h1 className="text-sm">Light</h1>
                    </div>
                    <div className="border-2 w-[33%] h-30 hover:border-blue-600 transition-all  duration-300  group flex items-center gap-2 flex-col justify-center border-[#343B52] bg-[#1B2236] rounded">
                        <RiComputerLine className=" w-7 h-7 group-hover:text-blue-600" />
                        <h1 className="text-sm">System</h1>
                    </div>
                </div>
                <div className="flex items-center gap-3 w-full pt-3">
                    <div className="w-[50%]">
                        <div>
                            <h1 className="text-xs text-gray-300 pb-1">
                                Language
                            </h1>

                            <div className="relative">
                                <RiGlobalLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

                                <select
                                    defaultValue="en"
                                    className="w-full appearance-none border pl-9 pr-8 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                >
                                    <option value="en">English</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="w-[50%]">
                        <div>
                            <h1 className="text-xs text-gray-300 pb-1">
                                Default Page
                            </h1>

                            <div className="relative">
                                <RiHome2Line className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 pointer-events-none" />

                                <select
                                    className="w-full appearance-none border pl-9 pr-8 py-2 rounded-lg border-[#343B52] bg-[#1B2236] text-sm text-slate-100 hover:bg-[#242D45] hover:border-blue-500/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                                >
                                    <option value="dashboard">Dashboard</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
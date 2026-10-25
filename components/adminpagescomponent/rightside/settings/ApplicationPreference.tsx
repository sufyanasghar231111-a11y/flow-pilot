"use client"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setTheme } from "@/store/slices/ThemeSlice";
import { RiComputerLine, RiGlobalLine, RiHome2Line, RiMoonLine, RiSunFill } from "@remixicon/react";

export default function ApplicationPreference() {

    const { theme } = useAppSelector((state) => state.themeReducer)
    const dispatch = useAppDispatch()
    return (
        <div className={`w-full ${theme === 'system' && 'border-[#252938] bg-[#171A26]'}  border ${theme === 'light' && 'border-[#bfcbf7] bg-[#b4c0f0] '} ${theme === 'dark' && 'border-[#252938] bg-[#171A26]'} p-3 rounded-md`}>
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
            <div className="pt-2 ">
                <h1 className="pb-1   text-sm ">Theme</h1>
                <div className="flex items-center flex-col  justify-between gap-3">
                    <div className="flex items-center gap-2 w-full">
                        <div onClick={() => { dispatch(setTheme('dark')) }} className="border-2 w-[33%] h-30 flex items-center gap-2 flex-col justify-center border-blue-600 bg-[#1B2236] rounded">
                            <RiMoonLine className="text-blue-600 w-7 h-7" />
                            <h1 className="text-sm">Dark</h1>
                        </div>
                        <div onClick={() => { dispatch(setTheme('light')) }} className="border-2 hover:border-blue-600 transition-all  duration-300 group w-[33%] h-30 flex items-center gap-2 flex-col justify-center border-[#343B52] bg-[#1B2236] rounded">
                            <RiSunFill className=" w-7 h-7 group-hover:text-blue-600 transition-all  duration-300 " />
                            <h1 className="text-sm">Light</h1>
                        </div>
                        <div onClick={() => { dispatch(setTheme('system')) }} className="border-2 w-[33%] h-30 hover:border-blue-600 transition-all  duration-300  group flex items-center gap-2 flex-col justify-center border-[#343B52] bg-[#1B2236] rounded">
                            <RiComputerLine className=" w-7 h-7 group-hover:text-blue-600" />
                            <h1 className="text-sm">System</h1>
                        </div>

                    </div>


                    <div className="">

                    </div>
                </div>
                <div className="flex items-center gap-3 w-full">
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
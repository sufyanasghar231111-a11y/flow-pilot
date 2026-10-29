import { RiArrowDownSLine, RiFilter2Line } from "@remixicon/react"

export default function ProjectHeader() {
    return (
        <div className="pt-23 px-4 pb-3">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold">My Projects</h1>
                    <h1 className="text-sm text-gray-400">Project you have access to.</h1>
                </div>
                <button className="flex items-center gap-2 rounded-md border border-[#30374a] bg-[#171A26] px-3 py-2.5 text-gray-300 transition-all duration-200 cursor-pointer hover:border-[#4b5878] hover:bg-[#1d2130] hover:text-white active:scale-[0.98]">
                    <RiFilter2Line className="h-4.5 w-4.5" />
                    <span className="text-sm font-medium">Filter</span>
                    <RiArrowDownSLine className={`h-4.5 w-4.5  transition-all duration-300`} />
                </button>
            </div>
        </div>
    )
}
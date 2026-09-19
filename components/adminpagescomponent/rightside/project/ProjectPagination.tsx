import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function ProjectPagination() {
    return (

        <div className="flex items-center justify-between border-t border-[#252938] px-4 py-3">
            <div className="text-sm text-[#7d8794]">
                Showing <span className="font-medium text-gray-300">Projects 1 to 8</span>
            </div>

            <div className="flex items-center gap-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-blue-500/25 bg-blue-800/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.08)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/40 hover:text-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95">
                    <RiArrowLeftSLine className="h-5 w-5" />
                </button>

                <button className="flex h-8 w-8 items-center justify-center rounded-md border border-blue-500/25 bg-blue-800/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.08)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/40 hover:text-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95">
                    <RiArrowRightSLine className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
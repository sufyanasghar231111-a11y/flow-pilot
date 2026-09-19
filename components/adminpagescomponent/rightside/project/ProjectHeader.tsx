import { useProjectUi1 } from "@/contexts/projectContext/ProjectContext";
import { RiAddLine, RiArrowDownSLine, RiFilter2Line } from "@remixicon/react";

export default function ProjectHeader() {
    const { setProjectCreationModal }  = useProjectUi1()
    return (
        <div className="px-5 pt-23">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Projects</h1>
                    <p className="mt-1 text-sm text-[#7d8794]">Manage all projects in your workplace</p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 rounded-md border border-[#30374a] bg-[#171A26] px-3 py-2.5 text-gray-300 transition-all duration-200 hover:border-[#4b5878] hover:bg-[#1d2130] hover:text-white active:scale-[0.98]">
                        <RiFilter2Line className="h-4.5 w-4.5" />
                        <span className="text-sm font-medium">Filter</span>
                        <RiArrowDownSLine className="h-4.5 w-4.5" />
                    </button>

                    <button onClick={()=>{setProjectCreationModal(true)}} className="flex items-center gap-2 rounded-md border border-blue-500/30 bg-blue-800/50 px-3.5 py-2.5 text-blue-100 shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/50 hover:shadow-[0_0_20px_rgba(59,130,246,0.25)] active:scale-[0.98]">
                        <RiAddLine className="h-5 w-5" />
                        <span className="text-sm font-medium">Create Project</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
import { useUiProject2 } from "@/contexts/projectContext/ProjectContext";
import { FilterDataModel } from "@/modals/FilterDataModal";
import { RiArrowDownSLine, RiFilter2Line } from "@remixicon/react";
import ProjectCreationButton from "./ProjectCreationButton";

export default function ProjectHeader() {
    const { filterModal, setFilterModal } = useUiProject2()

    return (
        <div className="px-5 pt-23">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white">Projects</h1>
                    <p className="mt-1 text-sm text-[#7d8794]">Manage all projects in your workplace</p>
                </div>

                <div className="flex items-center gap-3 relative">
                    <button onClick={() => { setFilterModal(!filterModal) }} className="flex items-center gap-2 rounded-md border border-[#30374a] bg-[#171A26] px-3 py-2.5 text-gray-300 transition-all duration-200 cursor-pointer hover:border-[#4b5878] hover:bg-[#1d2130] hover:text-white active:scale-[0.98]">
                        <RiFilter2Line className="h-4.5 w-4.5" />
                        <span className="text-sm font-medium">Filter</span>
                        <RiArrowDownSLine className={`h-4.5 w-4.5 ${filterModal ? 'rotate-180' : 'rotate-0'} transition-all duration-300`} />
                    </button>

                    <ProjectCreationButton />
                    <FilterDataModel />
                </div>
            </div>
        </div>
    );
}
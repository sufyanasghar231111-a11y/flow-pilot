import { useUiProject2 } from "@/contexts/projectContext/ProjectContext";
import { RiFilterOffLine } from "@remixicon/react";

export default function FilterDataNotFound() {
    const { filterDate } = useUiProject2()
    return (
        <div className="flex flex-col items-center justify-center w-full h-full py-8 px-4 text-center">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-blue-600/10 border border-blue-600/20 mb-4">
                <RiFilterOffLine className="w-7 h-7 text-blue-500" />
            </div>

            <h3 className="text-base font-semibold text-white">
                No Projects Found
            </h3>

            <p className="mt-1 text-sm text-gray-400">
                No projects found with status{" "}
                <span className="text-blue-500 font-medium">{filterDate}</span>
            </p>
        </div>
    )
}
import { useProjectUi1 } from "@/contexts/projectContext/ProjectContext";
import { useProject } from "@/hooks/useProject";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useRouter } from "next/navigation";



export default function ProjectPagination({ filterProject }) {
    const { projectPage } = useProjectUi1()
    const { projectStats } = useProject()
    const router = useRouter()
    return (

        <div className="flex items-center justify-between border-t border-[#252938] px-4 py-3">
            <div className="text-sm text-[#7d8794]">
                Showing <span className="font-medium text-gray-300">Projects {filterProject.length} of {projectStats.totalCounts}</span>
            </div>

            <div className="flex items-center gap-2">
                <button disabled={projectPage === 1} onClick={() => { router.push(`?page=${projectPage - 1}`) }} className={`flex h-8 w-8 items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer rounded-md border border-blue-500/25 bg-blue-800/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.08)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/40 hover:text-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95`}>
                    <RiArrowLeftSLine className="h-5 w-5" />
                </button>

                <button disabled={filterProject.length < 8} onClick={() => { router.push(`?page=${projectPage + 1}`) }} className={`flex h-8 w-8 items-center justify-center disabled:opacity-55 disabled:cursor-not-allowed cursor-pointer rounded-md border border-blue-500/25 bg-blue-800/30 text-blue-300 shadow-[0_0_10px_rgba(59,130,246,0.08)] transition-all duration-200 hover:border-blue-400/50 hover:bg-blue-700/40 hover:text-blue-200 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] active:scale-95`}>
                    <RiArrowRightSLine className="h-5 w-5" />
                </button>
            </div>
        </div>
    )
}
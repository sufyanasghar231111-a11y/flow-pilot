import { useProjectUi1 } from "@/contexts/projectContext/ProjectContext";
import { useProject } from "@/hooks/useProject";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { useRouter } from "next/navigation";

export default function ProjectSelectionPagination() {
    const { getProject } = useProject()
    const { projectStats } = useProject()
    const { projectPage } = useProjectUi1()
    const total = Math.ceil(projectStats.totalCounts / 8)
    const router = useRouter()
    return (
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">

            <span className="text-[11px] text-gray-500">
                showing {getProject.length} of {projectStats.totalCounts}
            </span>

            <div className="flex items-center gap-1">

                <button
                    disabled={projectPage === 1}
                    onClick={() => { router.push(`?page=${projectPage - 1}`) }}
                    className="flex h-7 w-7 items-center justify-center rounded-md border disabled:opacity-55 disabled:cursor-not-allowed  border-white/10 text-gray-600 "
                >
                    <RiArrowLeftSLine size={17} />
                </button>
                {
                    [1, 2, 3,].map((elem, index) => {
                        return <button key={index} onClick={()=>{ router.push(`?page=${elem}`)}} disabled={elem > total} className={`h-7 min-w-7 rounded-md bg-blue-600/60 ${projectPage === elem ? 'border border-blue-500':"border-0"} disabled:cursor-not-allowed disabled:opacity-55   px-2 text-[11px] font-medium text-white`}>
                            {elem}
                        </button>

                    })
                }

                <div className=" px-2 text-sm text-gray-400">
                    ...
                </div>

                <button disabled={getProject.length < 8} onClick={() => { router.push(`?page=${projectPage + 1}`) }} className="flex h-7 w-7 items-center justify-center rounded-md disabled:opacity-55 disabled:cursor-not-allowed border border-white/10 text-gray-500 hover:bg-white/5 hover:text-gray-300">
                    <RiArrowRightSLine size={17} />
                </button>

            </div>
        </div>
    )
}
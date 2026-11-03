import { project } from "@/components/adminpagescomponent/rightside/search/ProjectSearch";
import { projects } from "@/contexts/searchcontext/userSearchContext";
import { RiArrowRightSLine } from "@remixicon/react";


export default function SearchProject({ elem }: { elem: projects }) {

    const status = project[elem.project.status]
    const StatusIcon = status.icon

    return (
        <div key={elem.project.id} >
            <div className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-[#343B52] hover:bg-[#202638]">

                <div className="flex min-w-0 items-center gap-3">
                    <div
                        title={elem.project.status}
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-current/10 ${status.style ?? ''}`}
                    >
                        <StatusIcon className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-gray-100 transition-colors group-hover:text-blue-400">
                            {elem.project.name}
                        </h3>

                        <p className="mt-1 max-w-64 truncate text-xs text-gray-400">
                            {elem.project.description || 'No description available'}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                    <span className={`hidden rounded-md px-2 py-1 text-[10px] font-medium sm:inline-flex ${status.style ?? ''}`}>
                        {elem.project.status}
                    </span>

                    <RiArrowRightSLine className="h-5 w-5 text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:text-blue-400" />
                </div>
            </div>

        </div>
    )
}
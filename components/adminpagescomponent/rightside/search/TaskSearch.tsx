import { SearchData } from "@/contexts/SearchContext"
import { TaskState } from "@/contexts/taskContext/TaskContext"
import { RiArrowRightSLine, RiClipboardLine, RiEyeLine, RiTaskLine, RiToolsLine } from "@remixicon/react"

type PropType = {
    elem: Extract<SearchData, { types: 'task' }>
}
type TaskStatus = NonNullable<TaskState['status']>




export const taskStatus: Record<
    TaskStatus,
    { style: string; icon: typeof RiClipboardLine }
> = {
    TODO: {
        style: 'bg-slate-500/10 text-slate-400',
        icon: RiClipboardLine,
    },
    IN_PROGRESS: {
        style: 'bg-blue-500/10 text-blue-400',
        icon: RiToolsLine,
    },
    DONE: {
        style: 'bg-emerald-500/10 text-emerald-400',
        icon: RiTaskLine,
    },
    REVIEW: {
        style: 'bg-amber-500/10 text-amber-400',
        icon: RiEyeLine,
    },
};

export default function TaskSearch({ elem }: PropType) {

    return (
        <div key={elem.id}>
            {
                elem.types === 'task' && (() => {
                    if (!elem.status) return
                    const status = taskStatus[elem.status]
                    const StatusIcon = status.icon

                    return (
                        <div className="group flex items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-[#343B52] hover:bg-[#202638]">

                            <div className="flex min-w-0 items-center gap-3">
                                <div
                                    title={elem.status}
                                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-current/10 ${status.style ?? ''}`}
                                >
                                    <StatusIcon className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="truncate text-sm font-semibold text-gray-100 transition-colors group-hover:text-blue-400">
                                        {elem.name}
                                    </h3>

                                    <p className="mt-1 max-w-64 truncate text-xs text-gray-400">
                                        {elem.description || 'No description available'}
                                    </p>
                                </div>
                            </div>

                            <div className="flex shrink-0 items-center gap-2">
                                <span className={`hidden rounded-md px-2 py-1 text-[10px] font-medium sm:inline-flex ${elem.priority === 'HIGH' && 'bg-red-500/10 text-red-400'} ${elem.priority === "MEDIUM" && 'bg-amber-500/10 text-amber-400'} ${elem.priority === "LOW" && 'bg-blue-500/10 text-blue-400'}`}>
                                    {elem.priority}
                                </span>

                                <RiArrowRightSLine className="h-5 w-5 text-gray-500 transition-all group-hover:translate-x-0.5 group-hover:text-blue-400" />
                            </div>
                        </div>
                    )
                })
                    ()}
        </div>
    )
}
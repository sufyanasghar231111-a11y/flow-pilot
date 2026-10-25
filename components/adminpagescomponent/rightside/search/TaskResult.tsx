import { SearchData } from "@/contexts/SearchContext"
import { taskStatus } from "./TaskSearch"
import { TimeZone } from "@/utils/TimeAgo"
import { useAuth } from "@/contexts/authContext/AuthContext"
import { Names } from "@/components/nameComponent/Names"

type TaskProp = {
    elem: Extract<SearchData, { types: "task" }>
    selected: string
}

export default function TaskResult({ elem, selected }: TaskProp) {

    const status = taskStatus[elem.status ?? 'TODO']
    const StatusIcon = status.icon
    const { user } = useAuth()
    
    return (
        <div className="px-4 sm:px-7">
            <div
                className={`flex  gap-4 rounded-xl border p-4 shadow-lg transition-all sm:p-5 justify-between ${elem.id === selected
                    ? 'border-blue-500 bg-[#1C2235] ring-1 ring-blue-500/30'
                    : 'border-[#252938] bg-[#171A26] hover:border-[#353B50]'
                    }`}
            >

                <div className="flex min-w-0 items-start gap-4">
                    <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 ${status.style ?? ""
                            }`}
                    >
                        <StatusIcon />
                    </div>

                    <div className="min-w-0">
                        <button className="mb-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-xs text-blue-400">
                            task
                        </button>

                        <h2 className="text-base font-semibold text-white">
                            {elem.name}
                        </h2>

                        <p className="max-w-2xl text-sm leading-5 text-gray-400">
                            {elem.description || "No description provided"}
                        </p>
                    </div>
                </div>

                <div className="">
                    <div className="flex items-center gap-5">
                        <button className={`hidden rounded-md px-2 py-1 text-[10px] font-medium sm:inline-flex ${elem.priority === 'HIGH' && 'bg-red-500/10 text-red-400'} ${elem.priority === "MEDIUM" && 'bg-amber-500/10 text-amber-400'} ${elem.priority === "LOW" && 'bg-blue-500/10 text-blue-400'}`}>
                            {elem.priority}
                        </button>
                        <div className="text-sm text-gray-400">
                            <TimeZone timeZone={user?.timeZone ?? 'Asia/Karachi'} dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'} time={elem.dueDate} />
                        </div>
                    </div>
                    <div className="flex items-center pt-5 gap-3">
                        {
                            elem.assignedTo?.user.username && (
                                <div className="border border-[#353B50] bg-[#222738] w-9 h-9 rounded-full flex items-center justify-center">
                                    <Names userName={elem.assignedTo?.user.username} />
                                </div>
                            )
                        }
                        <div>
                            <h1 className="text-sm font-semibold">{elem.assignedTo?.user.username}</h1>
                            <h1 className="text-xs text-gray-400">{elem.assignedTo?.user.email}</h1>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
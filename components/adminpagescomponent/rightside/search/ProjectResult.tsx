import { SearchData } from "@/contexts/SearchContext"
import { project } from "./ProjectSearch"
import { Names } from "@/components/nameComponent/Names"
import { TimeZone } from "@/utils/TimeAgo"
import { useAuth } from "@/contexts/authContext/AuthContext"
import { RiTimeLine } from "@remixicon/react"

type ProjectProp = {
    selected: string,
    elem: Extract<SearchData, { types: 'project' }>
}

export default function ProjectResult({ selected, elem }: ProjectProp) {
    const status = project[elem.status]
    const StatusIcon = status.icon
    const { user } = useAuth()

    const total = elem.tasks?.length
    const completed = elem.tasks?.filter(elem=> elem.status === 'DONE').length
    const progress = Math.round(((completed || 0) / (total || 0)) * 100)

    return (
       
            <div className="px-4  sm:px-7">
                <div
                    className={`flex flex-col gap-4 rounded-xl border p-4 shadow-lg transition-all sm:p-5 lg:flex-row  lg:justify-between ${elem.id === selected
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
                                Project
                            </button>

                            <h2 className="text-base font-semibold text-white">
                                {elem.name}
                            </h2>

                            <p className="max-w-2xl text-sm leading-5 text-gray-400">
                                {elem.description || "No description provided"}
                            </p>
                        </div>
                    </div>

                    <div className="flex w-full flex-col gap-1.5 lg:w-64 lg:shrink-0">
                       
                        <div>
                            <span
                                className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${status.style ?? ""
                                    }`}
                            >
                                {elem.status}
                            </span>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-700">
                                <div style={{width:`${progress}%`}} className="h-full w-full rounded-full bg-blue-500 transition-all duration-500" />
                            </div>

                            <span className="text-sm text-gray-300">{progress || 0}%</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400">
                            <RiTimeLine className="h-4 w-4 shrink-0" />

                            <TimeZone
                                time={elem.startDate}
                                timeZone={user?.timeZone ?? 'Asia/Karachi'}
                                dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'}
                            />

                            <span>-</span>

                            <TimeZone
                                time={elem.deadline}
                                timeZone={user?.timeZone ?? 'Asia/Karachi'}
                                dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'}
                            />
                        </div>

                        <div className="flex items-center">
                            {elem.projectmembers?.slice(0, 5).map((member) => (
                                <div
                                    key={member.user.user.id}
                                    title={member.user.user.username}
                                    className="-ml-1 flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-[#353B50] bg-[#222738] text-xs first:ml-0"
                                >
                                    <Names userName={member.user.user.username} />
                                </div>
                            ))}

                            {(elem.projectmembers?.length || 0) > 5 && (
                                <div className="-ml-1 flex h-6 w-6 items-center justify-center rounded-full border border-[#353B50] bg-[#222738] text-[10px] text-gray-400">
                                    +{(elem.projectmembers?.length || 0) - 5}
                                </div>
                            )}
                        </div>
                        </div>
                    </div> 
            </div>
        

    )
}
import { Names } from "@/components/nameComponent/Names"
import { useAuth } from "@/contexts/authContext/AuthContext"
import { SearchData } from "@/contexts/SearchContext"
import { TimeZone } from "@/utils/TimeAgo"
import { RiShieldUserLine, RiTimeLine } from "@remixicon/react"

type TeamProp = {
    selected: string,
    elem: Extract<SearchData, { types: 'team' }>
}

export default function TeamResult({ elem, selected }: TeamProp) {

    const { user } = useAuth()

    return (
        <div className="px-4 sm:px-7">
            <div
                className={`flex flex-col gap-4 rounded-xl border p-4 shadow-lg transition-all sm:p-5 lg:flex-row lg:items-center lg:justify-between ${elem.id === selected
                    ? 'border-blue-500 bg-[#1C2235] ring-1 ring-blue-500/30'
                    : 'border-[#252938] bg-[#171A26] hover:border-[#353B50]'
                    }`}
            >
                <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-blue-500/10 text-sm font-semibold text-blue-400">
                        <Names userName={elem.user.username} />
                    </div>

                    <div className="min-w-0">
                        <h2 className="truncate text-base font-semibold text-white">
                            {elem.user.username}
                        </h2>

                        <p className="truncate text-sm text-gray-400">
                            {elem.user.email}
                        </p>

                        <span className="mt-1 inline-flex rounded-full border border-blue-500/20 bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-400">
                            Team Member
                        </span>
                    </div>
                </div>

                <div className="flex flex-col gap-3 text-sm text-gray-400 sm:flex-row sm:items-center sm:gap-6">
                    <div className="flex items-center gap-2">
                        <RiShieldUserLine className="h-4 w-4 text-gray-500" />
                        <span>{elem.user.role ?? 'USER'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                        <RiTimeLine className="h-4 w-4 text-gray-500" />
                        <span>
                            Joined{' '}
                            <TimeZone
                                time={elem.user.createdAt}
                                timeZone={user?.timeZone ?? 'Asia/Karachi'}
                                dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
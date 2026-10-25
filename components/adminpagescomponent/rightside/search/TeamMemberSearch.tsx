import { Names } from "@/components/nameComponent/Names"
import { SearchData } from "@/contexts/SearchContext"
import { RiArrowRightSLine } from "@remixicon/react"

type TeamProp = {
    elem: Extract<SearchData, { types: 'team' }>
}

export default function TeamMemberSearch({ elem }: TeamProp) {
    return (
        <div
            key={elem.user.id}
            className="group flex w-full items-center justify-between gap-3 rounded-xl border border-transparent px-3 py-3 transition-all duration-200 hover:border-[#343B52] hover:bg-[#202638]"
        >
            <div className="flex min-w-0 flex-1 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-indigo-400/20 bg-indigo-500/10 text-sm font-semibold text-indigo-300">
                    <Names userName={elem.user.username} />
                </div>

                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-sm font-semibold text-gray-100 transition-colors group-hover:text-blue-400">
                        {elem.user.username}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-400">
                        {elem.user.email}
                    </p>
                </div>
            </div>

            <RiArrowRightSLine className="h-5 w-5 shrink-0 text-gray-500 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-blue-400" />
        </div>
    )
}
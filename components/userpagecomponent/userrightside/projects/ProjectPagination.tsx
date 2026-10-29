import { useAppSelector } from "@/hooks/reduxhooks";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

type Prop = {
    pagination: number
    setPagination: React.Dispatch<React.SetStateAction<number>>
}

export default function ProjectPagination({ pagination, setPagination }: Prop) {

    const { totalStat } = useAppSelector((state) => state.totalStat)
    const { allDetail } = useAppSelector((state) => state.allData)

    return (
        <div className="card mt-5 flex w-full items-center justify-between rounded-xl border border-[#252938] px-4 py-4 text-sm text-gray-400">

            <div className="flex items-center gap-1.5">
                <span>Showing</span>
                <span className="font-semibold text-gray-200">{allDetail?.project.length}</span>
                <span>of</span>
                <span className="font-semibold text-gray-200">{totalStat.totalProject}</span>
            </div>

            <div className="flex items-center gap-2">
                <button disabled={pagination === 1} onClick={() => { setPagination(prev => prev - 1) }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#252938] text-gray-400 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400 disabled:cursor-not-allowed disabled:opacity-40">
                    <RiArrowLeftSLine className="text-lg" />
                </button>

                <button disabled={(allDetail?.project.length || 0) < 4} onClick={() => { setPagination(prev => prev + 1) }}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#252938] text-gray-400 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400 disabled:opacity-40 disabled:cursor-not-allowed">
                    <RiArrowRightSLine className="text-lg" />
                </button>
            </div>
        </div>
    )
}
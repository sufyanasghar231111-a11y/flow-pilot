import { RiArrowUpLine } from "@remixicon/react"
import ReportStats from "./ReportStats"
import { useAppSelector } from "@/hooks/reduxhooks"

export default function ReportStatsData() {
    const data = ReportStats()

    
    const { loading, error } = useAppSelector((state) => state.comparison)

    if (loading) {
        return <div>Loading...</div>
    }

    if (error) {
        return <div>Something Went Wrong</div>
    }

    return (
        <div className="px-1 py-4 flex flex-wrap gap-2">
            {
                data?.map((elem, index: number) => {
                    const Icon = elem.icon
                    const operater = Number(elem.lastmonth) < 0
                    return <div key={index}
                        className="w-[200px] h-fit shrink-0 rounded-xl border border-[#252938] bg-[#171A26] px-2.5 py-4 group cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:border-blue-500/40 hover:bg-[#1A1D2B] hover:shadow-[0_8px_30px_rgba(59,130,246,0.08)] " >

                        <div className="flex items-center gap-4">
                            <div
                                className={` w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-[#222635] border border-[#2C3040] transition-all duration-300 ${elem.hover} group-hover:scale-105 `} >
                                <Icon
                                    className={` w-6 h-6 ${elem.text} transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}
                                />
                            </div>

                            <div>
                                <p className="text-[13px] font-medium text-[#9499AA] ">
                                    {elem.name}
                                </p>
                                <h1
                                    className=" text-2xl font-semibold text-[#E8EAF0] mt-0.5 transition-colors duration-300 group-hover:text-white">
                                    {elem.total}
                                </h1>
                            </div>
                        </div>


                        <div className="flex items-center justify-center w-full gap-1.5 pt-5 text-sm">
                            <div className={`flex items-center justify-center w-6 h-6 rounded-full  ${operater ? 'bg-red-500/10' : "bg-green-500/10"} `}>

                                <RiArrowUpLine className={`w-4 h-4  ${operater ? 'rotate-180 text-red-500' : 'rotate-0 text-green-500'}`} />
                            </div>

                            <span className="text-[#9499AA]">
                                <span className={` ${operater ? 'text-red-500' : 'text-green-500'} font-medium`}>{elem.lastmonth}% <span className="text-sm text-gray-400">vs last month</span></span>
                            </span>
                        </div>
                    </div>
                })
            }
        </div>
    )
}
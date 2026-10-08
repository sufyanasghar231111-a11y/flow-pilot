"use client"
import { RiArrowUpLine, RiLightbulbFlashLine } from "@remixicon/react";
import InsightData from "./InsightData";

export default function KeyInsight() {
    const data = InsightData()
    return (
        <div className="w-[55%] border border-[#252938] bg-[#171A26] rounded-md px-4 py-2">
            <div className="flex items-center gap-3">
                <RiLightbulbFlashLine className="w-5 h-5 text-yellow-300" />
                <h1 className="text-sm font-semibold">Key Insights</h1>
            </div>
            {
                data.map((elem, index) => {
                    const Icon = elem.icon
                    return <div key={index} className="border-b pb-2 border-gray-700 ">
                        <div className="flex items-center justify-between pt-6">
                            <div className="flex items-center gap-4">
                                <div className={`w-9 h-9 rounded-full ${elem.color}  flex items-center justify-center`}>{<Icon className="w-4 h-4" />}</div>
                                <div>
                                    <h1 className="text-sm ">{elem.name}</h1>
                                    <h2 className="text-xs text-gray-400">{elem.total || 0} {elem.type} <span className="text-green-500">({elem.percent || 0}% of total)</span></h2>
                                </div>
                            </div>
                            <div className={`px-3 py-0.5 rounded-full ${elem.color} border gap-1.5  text-sm font-semibold flex items-center justify-center`}>
                                +{elem.total || 0} <span><RiArrowUpLine className="w-4 h-4" /></span>
                            </div>
                        </div>
                    </div>
                })
            }

        </div>
    )
}
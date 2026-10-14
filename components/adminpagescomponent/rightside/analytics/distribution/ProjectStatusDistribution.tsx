"use client"

import ProjectDonut from "./ProjectDonut";
import ProjectStatDistribution from "./ProjectStatDistribution";

export type Segment = {
    label: string,
    value: number,
    color: string,
}

export default function ProjectStatusDistribution({elem}:{elem:string}) {

    const data = ProjectStatDistribution()

    const total = data.reduce((acc, current) => {
        return acc + current.value
    }, 0)


    return (

        <div className="w-[33%] border rounded-md border-[#252938] bg-[#171A26]">
            <div className="px-3 py-2">
                <h1 className='text-sm font-semibold'>Project Status {elem}</h1>
                <h1 className="text-xs text-gray-500">Current status of all Projects.</h1>
            </div>
            <div className="flex items-center justify-between gap-3 px-1 py-4">
                <div className="w-[45%] h-40  relative">
                    <ProjectDonut data={data} total={total} />
                </div>
                <div className="w-[55%] h-40 flex flex-col gap-3">
                    {
                        data.map((elem, index) => {
                            const percentage = total > 0 ? Math.floor((elem.value / total) * 100) : 0
                            return <div key={index} className="flex items-center justify-between border-b  pb-1 border-gray-600">
                                <div className="flex items-center gap-2 text-xs">
                                    <span style={{ backgroundColor: elem.color }} className={`w-2 h-2 rounded-full`} />
                                    <span>{elem.label}</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <span className="text-[11px]">{elem.value}</span>
                                    <span className="text-xs text-gray-500">{percentage}%</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
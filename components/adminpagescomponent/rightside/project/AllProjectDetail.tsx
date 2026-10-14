import { useProject } from "@/hooks/useProject";
import ProjectPagination from "./ProjectPagination";
import ProjectMainDetail from "./ProjectMainDetail";
import ProjectNotFound from "./ProjectNotFound";
import FilterDataNotFound from "./FilterDataNotFound";
import { memo } from "react";
import { RiCalendarTodoLine } from "@remixicon/react";
import { useAppSelector } from "@/hooks/reduxhooks";
import { TimeAgo } from "@/utils/TimeAgo";


const AllProjectDetail = memo(function AllProjectDetail({ data, report }: { data: string, report: string }) {
    const { getProject, filterDate } = useProject()
    const filterProject = getProject.filter(elem => elem.status.toLowerCase().includes(filterDate.toLowerCase()))
    const { startDate, endDate } = useAppSelector((state) => state.filterData)
    const now = new Date()
    const currentMonth = new Date(
        now.getFullYear(),
        now.getMonth(),
        1
    )

    return (
        <div className={` pt-3 ${data} bg-[#11131D] pb-5`}>
            <div className=" w-full border bg-[#171A26] border-[#252938] hover:border-blue-500/40 transition-all duration-300  rounded-lg">
                {
                    report === 'report' && (
                        <div className="flex items-center gap-3 border-b border-[#252B3B] px-4 py-3">
                            <RiCalendarTodoLine className="shrink-0 text-xl text-indigo-400" />
                            <div className="min-w-0">
                                <h1 className="text-sm font-semibold text-gray-100">
                                    Project Report
                                </h1>
                                <h1 className="mt-1 text-xs text-gray-400">
                                    {startDate || endDate ? (<><TimeAgo time={startDate} /> - <TimeAgo time={endDate} /></>) : (<><TimeAgo time={currentMonth} /> - Onward</>)}
                                </h1>
                            </div>
                        </div>
                    )
                }
                <div className="h-12 w-full grid grid-cols-[0.5fr_2fr_3fr_1.2fr_1.3fr_1.3fr_1.6fr_1fr_2.4fr_1fr] items-center border-b border-[#252938] border-t px-4 text-xs font-medium text-gray-400">
                    <div>#</div>
                    <div>Project Name</div>
                    <div>Description</div>
                    <div>Status</div>
                    <div>Start Date</div>
                    <div>End Date</div>
                    <div>Progress</div>
                    <div>Tasks</div>
                    <div>Team</div>
                    <div className="text-center">Action</div>
                </div>
                <div className="pt-2">
                    {
                        getProject.length > 0 ? (
                            filterProject.length > 0 ? (
                                filterProject?.map((elem, index) => {

                                    const completeTask = elem.tasks?.filter((elem) => elem.status === 'DONE').length
                                    const totalTask = elem.tasks?.length
                                    const progressBar = totalTask ? Math.round((completeTask / totalTask) * 100) : 0
                                    return <ProjectMainDetail key={elem.id} index={index} elem={elem} progressBar={progressBar}
                                        totalTask={totalTask ?? 0}
                                        completeTask={completeTask ?? 0}
                                    />
                                })
                            ) : (
                                <FilterDataNotFound />
                            )
                        ) : (
                            <ProjectNotFound />
                        )
                    }


                    <ProjectPagination filterProject={filterProject} />
                </div>
            </div>
        </div>
    )
})

export default AllProjectDetail
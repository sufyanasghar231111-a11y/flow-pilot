import { useProject } from "@/hooks/useProject";
import ProjectPagination from "./ProjectPagination";
import ProjectMainDetail from "./ProjectMainDetail";
import { useUiProject2 } from "@/contexts/projectContext/ProjectContext";
import ProjectNotFound from "./ProjectNotFound";
import FilterDataNotFound from "./FilterDataNotFound";


type GetProjectType = {
    id: string,
    name: string,
    description: string,
    status: string,
    tasks: [],
    projectmembers: [],
    deadline: string,
    startDate: string
}

export default function AllProjectDetail() {
    const { getProject } = useProject()
    const { filterDate, setFilterData } = useUiProject2()
    const filterProject = getProject.filter(elem => elem.status.toLowerCase().includes(filterDate.toLowerCase()))


    return (
        <div className=" px-6 pt-3 bg-[#11131D] pb-5">
            <div className=" w-full border bg-[#171A26] border-[#252938] hover:border-blue-500/40 transition-all duration-300  rounded-lg">
                <div className="h-12 w-full grid grid-cols-[0.5fr_2fr_3fr_1.2fr_1.3fr_1.3fr_1.6fr_1fr_2.4fr_1fr] items-center border-b border-[#252938] px-4 text-xs font-medium text-gray-400">
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
                                filterProject?.map((elem: GetProjectType, index) => {

                                    const completeTask = elem.tasks.filter((elem: { status: string; }) => elem.status === 'DONE').length
                                    const totalTask = elem.tasks?.length
                                    const progressBar = totalTask ? Math.round((completeTask / totalTask) * 100) : 0
                                    return <ProjectMainDetail key={elem.id} index={index} elem={elem} progressBar={progressBar}
                                        totalTask={totalTask}
                                        completeTask={completeTask}
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
}
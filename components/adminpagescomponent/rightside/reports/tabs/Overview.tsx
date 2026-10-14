
import ProjectStatusDistribution from "../../analytics/distribution/ProjectStatusDistribution";
import TaskStatusDistribution from "../../analytics/distribution/TaskStatusDistribution";
import ProjectProgress from "../ProjectProgress";
import ReportStatsData from "../ReportStatsData";

export default function Overview() {

    return (
        <div className="bg-[#11131D] px-4">
            <ReportStatsData />
            <div className="flex gap-2 bg-[#11131D]">
                <ProjectStatusDistribution elem='Report' />
                <TaskStatusDistribution elem='Report' />
                <ProjectProgress />
            </div>
        </div>
    )
}
import ProjectPerformance from "./ProjectPerformance";
import TaskPerformance from "./TaskPerformance";
import TeamActivity from "./TeamActivity";

export default function Performance() {
    return (
        <div className="bg-[#11131D] px-4 pb-3 flex  gap-2">
            <TeamActivity />
            <ProjectPerformance />
            <TaskPerformance />
        </div>
    )
}
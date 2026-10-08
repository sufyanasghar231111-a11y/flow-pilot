import ProjectStatusDistribution from "./ProjectStatusDistribution";
import TaskPriorityDistribution from "./TaskPriorityDistribution";
import TaskStatusDistribution from "./TaskStatusDistribution";

export default function Distribution() {
    return (
        <div className="px-4.5 py-3 pt-3 flex  gap-3 bg-[#11131D]">
            <ProjectStatusDistribution />
            <TaskStatusDistribution />
            <TaskPriorityDistribution />
        </div>
    )
}
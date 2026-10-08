import ProjectCompletionTrend from "./ProjectCompletionTrend"
import TaskCompletionTrend from "./TaskCompletionTrend"

export default function CompletionTrend() {
    return (
        <div className="px-4 pt-3 w-full flex gap-4">
            <ProjectCompletionTrend />
            <TaskCompletionTrend />
        </div>
    )
}
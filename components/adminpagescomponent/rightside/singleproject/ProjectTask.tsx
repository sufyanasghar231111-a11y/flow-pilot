import { useProject } from "@/hooks/useProject"
import { RiMoreLine } from "@remixicon/react"
import TaskDetailInProject from "./TaskDetailInProject"

export default function ProjectTask() {
    const { singleProjectData } = useProject()
    return (
        <div className="border border-[#252938] bg-[#171A26] px-6 py-2 rounded-md ">
            <div className="grid h-12 w-full grid-cols-[0.5fr_3fr_2fr_1fr_1.3fr_1.5fr_0.4fr] items-center gap-3 border-b border-[#252938] px-4 text-xs font-medium text-gray-400">
                <div>#</div>
                <div>Task Name</div>
                <div>Assign</div>
                <div>Priority</div>
                <div>Status</div>
                <div>Due Date</div>
                <div className="flex justify-end">
                    <RiMoreLine className="h-4 w-4" />
                </div>
            </div>
            <div className="pt-2">
                {
                    singleProjectData?.tasks?.map((elem, index) => {
                        return <TaskDetailInProject key={elem.id} elem={elem} index={index} />
                    })
                }
            </div>
        </div>
    )
}
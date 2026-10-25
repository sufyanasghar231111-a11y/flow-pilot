import { Names } from "@/components/nameComponent/Names";
import { useAuth } from "@/contexts/authContext/AuthContext";
import { TaskState, useTaskUi2 } from "@/contexts/taskContext/TaskContext";
import { TimeZone } from "@/utils/TimeAgo";
import { RiMoreFill, RiMoreLine } from "@remixicon/react";
import { taskStatus } from "../search/TaskSearch";
import TaskDetail from "@/modals/TaskDetail";

export default function TaskDetailInProject({ elem, index }: { elem: TaskState, index: number }) {

    const { user } = useAuth()
    const status = taskStatus[elem.status ?? 'TODO']
    const { setTaskDetailModal } = useTaskUi2()
    function handleOpen(id: string) {
        setTaskDetailModal(prev => prev === id ? null : id)
    }

    return (
        <div
            key={elem.id}
            className="grid min-h-16 w-full grid-cols-[0.5fr_3fr_2fr_1fr_1.3fr_1.5fr_0.4fr] items-center gap-3 border-b border-[#252938] px-4 text-sm text-gray-300"
        >
            <div className="text-gray-500">
                {index + 1}
            </div>

            <div className="min-w-0">
                <h1 className="truncate font-medium text-white">
                    {elem.name}
                </h1>
                <p className="truncate text-xs text-gray-500">
                    {elem.description}
                </p>
            </div>

            <div className="flex min-w-0 items-center gap-2">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gray-600 bg-gray-700">
                    {elem.assignedTo?.user.username && (
                        <Names userName={elem.assignedTo.user.username} />
                    )}
                </div>
                <span className="truncate">
                    {elem.assignedTo?.user.username ?? 'Unassigned'}
                </span>
            </div>

            <span className={`hidden rounded-md px-2 py-1 w-fit text-[10px] font-medium sm:inline-flex ${elem.priority === 'HIGH' && 'bg-red-500/10 text-red-400'} ${elem.priority === "MEDIUM" && 'bg-amber-500/10 text-amber-400'} ${elem.priority === "LOW" && 'bg-blue-500/10 text-blue-400'}`}>
                {elem.priority}
            </span>

            <div>
                <button
                    className={`whitespace-nowrap rounded-md px-2.5 py-1 text-xs font-medium ${status.style}`}
                >
                    {elem.status}
                </button>
            </div>

            <div className="truncate text-xs text-gray-400">
                <TimeZone
                    time={elem.dueDate}
                    timeZone={user?.timeZone ?? 'Asia/Karachi'}
                    dateFormat={user?.dateFormat ?? 'YYYY-MM-DD'}
                />
            </div>

            <div className="flex justify-end relative">
                <button onClick={() => {
                    if (!elem.id) return
                    handleOpen(elem.id)
                }}
                    className=" hover:text-white"
                >
                    <RiMoreLine className="-rotate-90 w-5 h-5" />
                </button>
                <TaskDetail elem={elem} />
            </div>
        </div>
    )
}
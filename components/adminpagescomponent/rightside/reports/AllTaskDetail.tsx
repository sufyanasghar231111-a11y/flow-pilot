import { RiKanbanView2 } from "@remixicon/react";
import TaskMainDetail from "./TaskMainDetail";
import { useTask } from "@/hooks/useTask";
import { currentMonth } from "./TaskShowReport";
import { TimeAgo } from "@/utils/TimeAgo";
import { useAppSelector } from "@/hooks/reduxhooks";

export default function AllTaskDetail() {
    const { getTask } = useTask()
    const { startTaskDate, endTaskDate } = useAppSelector((state) => state.filterTask)
    return (
        <div className="pt-3  bg-[#11131D] pb-5">
            <div className=" w-full border bg-[#171A26] border-[#252938] hover:border-blue-500/40 transition-all duration-300  rounded-lg">
                <div className="flex items-center gap-3 border-b border-[#252B3B] px-4 py-3">
                    <RiKanbanView2 className="shrink-0 text-xl text-[#00B8DB]" />
                    <div className="min-w-0">
                        <h1 className="text-sm font-semibold text-gray-100">
                            Task Report
                        </h1>
                        <h1 className="mt-1 text-xs text-gray-400">
                            {startTaskDate || endTaskDate ? (<><TimeAgo time={startTaskDate} /> - <TimeAgo time={endTaskDate} /></>) : (<><TimeAgo time={currentMonth} /> - Onward</>)}
                        </h1>
                    </div>
                </div>

                <div className="h-12 w-full grid grid-cols-[0.5fr_1.5fr_2.5fr_1.2fr_1.3fr_1.6fr_1.6fr_1fr] items-center border-b border-[#252938] border-t px-4 text-xs font-medium text-gray-400">
                    <div>#</div>
                    <div>Task Name</div>
                    <div>Description</div>
                    <div>Task Status</div>
                    <div className="ml-2">Priority</div>
                    <div>End Date</div>
                    <div>Completed Date</div>
                    <div>Member</div>
                </div>
                <div className="pt-2">
                    {
                        getTask.map((elem, index) => {
                            return <TaskMainDetail key={elem.id} elem={elem} index={index} />
                        })
                    }

                </div>
            </div>

        </div>
    )
}
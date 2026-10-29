import { RiMoreLine } from "@remixicon/react";
import TaskCard from "./TaskCard";
import { TaskState, useTaskReport } from "@/contexts/taskContext/TaskContext";
import NoTaskFound from "@/components/adminpagescomponent/rightside/tasks/NoTaskFound";
import { useDroppable } from "@dnd-kit/core";

export default function TaskColumn({ name, id, task }: { name: string, id: string, task: TaskState[] }) {

    const filterData = task.filter(elem => elem.status === id)

    const { setNodeRef, isOver } = useDroppable({ id })
    const { setUpdateUserTaskMore } = useTaskReport()
    function handleOpen(id: string) {
        setUpdateUserTaskMore(prev => prev === id ? null : id)
    }


    return (
        <div ref={setNodeRef} className={`w-[25%]  h-[calc(100vh-180px)] flex flex-col rounded-lg card ${isOver ? 'border-blue-500/50' : 'border-gray-800/80'} border overflow-hidden shadow-lg shadow-black/10 relative `}>
            <header className={`border-l-2 shrink-0 ${id === 'TODO' && 'border-amber-500'} ${id === 'IN_PROGRESS' && 'border-blue-500'} ${id === 'REVIEW' && 'border-purple-500'} ${id === 'DONE' && 'border-green-500'} flex items-center px-3.5 py-2.5 justify-between bg-[#191C29]`}>
                <div className="font-semibold text-sm flex items-center gap-2 text-gray-100">
                    {name}
                    <span className="text-[11px] text-gray-400 bg-gray-800 px-1.5 py-0.5 rounded-full">
                        {filterData.length || 0}
                    </span>
                </div>

                <div className="text-gray-400 hover:text-gray-200 cursor-pointer">
                    <RiMoreLine className="w-5 h-5" />
                </div>
            </header>
            <div className={` ${filterData.length > 2 ? 'overflow-y-auto' : 'overflow-hidden'} custom-scrollbar`}>
                {
                    filterData.length > 0 ? (
                        filterData.map((elem) => {
                            return <div key={elem.id} className="pt-2 px-2 last:pb-17">
                                <TaskCard elem={elem} handleOpen={handleOpen} />
                            </div>
                        })

                    ) : (
                        <NoTaskFound id={id} />
                    )
                }
            </div>


        </div >
    )
}
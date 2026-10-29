import { TaskState } from "@/contexts/taskContext/TaskContext";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

type ProPtype = {
    location: string;
    id: string;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    task: TaskState[]
}

export default function TaskPagination({ location, id, page, setPage, task }: ProPtype) {
    const filterData = task.filter(elem => elem.status === id)
    return (
        <footer className={`fixed bottom-6 z-50 flex w-[19%] ${location} items-center justify-between rounded-xl border border-[#252938] bg-[#191C29]/95 px-4 py-3 shadow-lg shadow-black/10 backdrop-blur-md`}>

            <span className="text-xs text-gray-500">
                Navigation
            </span>

            <div className="flex items-center gap-2">
                <button disabled={page === 1} onClick={() => { setPage(prev => prev - 1) }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-45 disabled:cursor-not-allowed border border-[#303548] text-gray-400 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400 active:scale-95"
                >
                    <RiArrowLeftSLine className="text-xl" />
                </button>

                <button disabled={filterData.length < 5} onClick={() => { setPage(prev => prev + 1) }}
                    className="flex h-8 w-8 items-center justify-center rounded-lg disabled:opacity-45 disabled:cursor-not-allowed border border-[#303548] text-gray-400 transition-all duration-200 hover:border-indigo-500/50 hover:bg-indigo-500/10 hover:text-indigo-400 active:scale-95"
                >
                    <RiArrowRightSLine className="text-xl" />
                </button>
            </div>

        </footer>
    )
}
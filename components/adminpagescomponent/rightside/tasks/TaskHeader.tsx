import {  RiArrowDownSLine, RiFilter2Line, RiSortAsc } from "@remixicon/react";
import TaskCreationButton from "./TaskCreationButton";

export default function TaskHeader() {

    return (
        <div className="pt-23 px-5">
            <div className=" flex items-center justify-between ">
                <div>
                    <h1 className="text-2xl font-semibold ">Tasks</h1>
                    <h1 className="text-sm text-gray-400">Track and manage all tasks across projects</h1>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded border border-[#3b4157]">
                        <input type="text" placeholder="Search tasks..." className=" outline-0 text-sm" />
                        <div>
                            <RiArrowDownSLine className="w-5 h-5 text-[#65676d]" />
                        </div>
                    </div>
                    <button className="flex items-center gap-1.5 rounded-md border border-[#30374a] bg-[#171A26] px-2 py-2 text-gray-300 transition-all duration-200 cursor-pointer hover:border-[#4b5878] hover:bg-[#1d2130] hover:text-white active:scale-[0.98]">
                        <RiFilter2Line className="h-4 w-4" />
                        <span className="text-xs font-medium">Filter</span>
                        <RiArrowDownSLine className={`h-4 w-4  transition-all duration-300`} />
                    </button>

                    <button className="flex items-center gap-1.5 rounded-md border border-[#30374a] bg-[#171A26] px-2 py-2 text-gray-300 transition-all duration-200 cursor-pointer hover:border-[#4b5878] hover:bg-[#1d2130] hover:text-white active:scale-[0.98]">
                        <RiSortAsc className="h-4 w-4" />
                        <span className="text-xs font-medium">Sort</span>
                    </button>
                    <TaskCreationButton />
                </div>
            </div>
        </div>
    )
}
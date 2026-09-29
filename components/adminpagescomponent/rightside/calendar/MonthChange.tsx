"use client"
import { useEvent, useEventUi } from "@/contexts/eventcontext/EventContext";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";
import { format } from "date-fns";



export default function MonthChange() {

    const { months, setMonths } = useEventUi()
    function handleNext() {
        setMonths((prev) =>
            new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        )
    }

    function handlePrev() {
        setMonths((prev) =>
            new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        )
    }

    return (
        <div className=" flex items-center justify-center w-full py-4 pb-6 ">
            <div className="flex items-center justify-center gap-4">
                <div onClick={() => { handlePrev() }} className=" border px-1.5 py-0.5 border-gray-600 rounded hover:border-gray-500"><RiArrowLeftSLine className="text-gray-500" /></div>
                <div className="text-lg font-semibold">{format(months, "MMMM yyyy")}</div>
                <div onClick={() => { handleNext() }} className=" border px-1.5 py-0.5 border-gray-600 rounded hover:border-gray-500"><RiArrowRightSLine className="text-gray-500" /></div>
            </div>
        </div>
    )
}
import { useEventUi2 } from "@/contexts/eventcontext/EventContext";
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react";

export default function CalendarSheetHeader() {
    const { setMinCalendarMonths, minCalendarMonths } = useEventUi2()
    function handleNext() {
        setMinCalendarMonths((prev) =>
            new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
        )
    }
    function handleprev() {
        setMinCalendarMonths((prev) =>
            new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
        )
    }
    return (
        <div className="flex items-center justify-center gap-4 border-b pb-4 border-gray-800">
            <div onClick={handleprev} className="border border-gray-500 px-1 py-0.5 rounded ">
                <RiArrowLeftSLine className="text-gray-300" />
            </div>
            <div className="text-xl font-semibold">
                {
                    new Intl.DateTimeFormat('en-GB', {
                        month: 'long',
                        year: 'numeric'
                    }).format(new Date(minCalendarMonths))
                }
            </div>
            <div onClick={handleNext} className="border border-gray-500 px-1 py-0.5 rounded ">
                <RiArrowRightSLine className="text-gray-300" />
            </div>
        </div>
    )
}
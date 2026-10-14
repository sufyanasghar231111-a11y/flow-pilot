import { useAppSelector } from "@/hooks/reduxhooks"
import { TimeAgo } from "@/utils/TimeAgo"
import { RiCalendarEventFill } from "@remixicon/react"
import { currentMonth } from "./TaskShowReport"
import { useEvent } from "@/contexts/eventcontext/EventContext"
import EventMainDetail from "./EventMainDetail"

export default function AllEventDetail() {
    const { type, eventendDate, eventstartDate } = useAppSelector((state) => state.filterEvent)
    const { eventData } = useEvent()
    return (
        <div className="pt-3  bg-[#11131D] pb-5">
            <div className=" w-full border bg-[#171A26] border-[#252938] hover:border-blue-500/40 transition-all duration-300  rounded-lg">
                <div className="flex items-center gap-3 border-b border-[#252B3B] px-4 py-3">
                    <RiCalendarEventFill className="shrink-0 text-xl text-blue-600" />
                    <div className="min-w-0">
                        <h1 className="text-sm font-semibold text-gray-100">
                            Event Report
                        </h1>
                        <h1 className="mt-1 text-xs text-gray-400">
                            {eventendDate || eventstartDate ? (<><TimeAgo time={eventstartDate} /> - <TimeAgo time={eventendDate} /></>) : (<><TimeAgo time={currentMonth} /> - Onward</>)}
                        </h1>
                    </div>
                </div>

                <div className="h-12 w-full grid grid-cols-[0.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1.5fr_1.7fr] items-center border-b border-[#252938] border-t px-4 text-xs font-medium text-gray-400">
                    <div>#</div>
                    <div>Event Name</div>
                    <div className="">Event Date</div>
                    <div className="pl-2">Type</div>
                    <div className="pl-5">Start Time</div>
                    <div className="pl-3">End Time</div>
                    <div className="flex items-center justify-center">Members</div>
                </div>
                <div className="pt-2">
                    {
                        eventData.map((elem, index) => {
                            return <EventMainDetail key={elem.id} elem={elem} index={index} />
                        })
                    }

                </div>
            </div>
        </div>
    )
}
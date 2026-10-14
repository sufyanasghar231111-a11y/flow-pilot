import { Names } from "@/components/nameComponent/Names";
import { EventTypes } from "@/contexts/eventcontext/EventContext";
import { TimeAgo } from "@/utils/TimeAgo";
import { format } from "date-fns";

export const eventColor: Record<string, string> = {
    'DEADLINE': "bg-red-500/15 text-red-400 border-red-500/30",
    'PERSONAL_MEETING': "bg-amber-500/15 text-amber-400 border-amber-500/30",
    'PROJECT_MEETING': "bg-blue-500/15 text-blue-400 border-blue-500/30",
}


export default function EventMainDetail({ elem, index }: { elem: EventTypes, index: number }) {

    return (
        <div className={`min-h-14 grid grid-cols-[0.5fr_1.5fr_1.5fr_2fr_1.5fr_1.5fr_1.7fr] items-center border-b border-[#252938]  px-4 text-sm text-gray-300`}>

            <div className="text-gray-500">
                {index + 1}
            </div>

            <div className="font-medium text-xs text-white truncate pr-4">
                {elem.name}
            </div>

            <div className="text-gray-400 text-[11px] pl-3">
                <TimeAgo time={elem.date} />
            </div>

            <div>
                <span className={`inline-flex items-center gap-1.5  rounded-full ${elem.type && eventColor[elem.type]} border  px-2.5 py-1 text-[10px] font-medium  `}>
                    <span className={`h-1.5 w-1.5 rounded-full ${elem.type && eventColor[elem.type]}`}></span>
                    {elem.type}
                </span>
            </div>

            <div className="text-gray-400 text-[11px]">
                {format(elem.startTime, 'hh-mm a')}
            </div>
            <div className="text-gray-400 text-[11px]">
                {format(elem.endTime, 'hh-mm a')}
            </div>

            <div className="flex items-center pl-4 justify-center">
                {
                    (elem.eventMember?.length ?? 0) > 0 ? (
                        <>
                            {elem?.eventMember?.map((item) => {
                                return <div key={item.member.user.id} className="w-5 h-5 bg-gray-600 text-[10px] flex items-center pt-0.5 justify-center rounded-full">
                                    <Names userName={item.member.user.username} />
                                </div>
                            })
                            }
                        </>
                    ) : (
                        <div className="text-xs text-gray-400">
                            No Member
                        </div>
                    )
                }
            </div>



        </div>
    )
}
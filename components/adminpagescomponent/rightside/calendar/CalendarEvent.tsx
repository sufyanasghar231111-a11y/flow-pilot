import { Names } from "@/components/nameComponent/Names";
import { useEvent, useEventUi } from "@/contexts/eventcontext/EventContext";
import { RiAddLine } from "@remixicon/react";
import { format } from "date-fns";


export default function CalendarEvent({ elem }) {
    const { setAddMemberModal } = useEventUi()
    const { getSingleEvent } = useEvent()
    return (
        <div key={`${elem.types}-${elem.id}`} className="flex flex-col gap-1.5 min-w-0">
            <div
                className={`
                  w-full min-w-0 px-1 py-1.5 rounded-md border
                  ${elem.type === "PROJECT_MEETING" && "bg-purple-600/10 border-purple-500/20 text-purple-300"}
                  ${elem.type === "DEADLINE" && "bg-red-600/10 border-red-500/20 text-red-300"}
                  ${elem.type === "PERSONAL_MEETING" && "bg-blue-600/10 border-blue-500/20 text-blue-300"}`}
            >
                <div className="flex items-center gap-1.5 min-w-0">
                    <span
                        className={`w-2.5 h-2.5 shrink-0 rounded-full
                      ${elem.type === "PROJECT_MEETING" && "bg-purple-500"}
                      ${elem.type === "DEADLINE" && "bg-red-600"}
                      ${elem.type === "PERSONAL_MEETING" && "bg-blue-600"}`}
                    ></span>
                    <div className="min-w-0 flex-1">
                        <h1 className="text-xs font-medium truncate">{elem.name}</h1>
                        <div className="text-[10px] opacity-80 truncate">
                            {format(new Date(elem.startTime), "hh:mm a")}-{format(new Date(elem.endTime), "hh:mm a")}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-0.5 flex-wrap">
                {elem.eventMember.slice(0, 3).map((data: { id: null; username: string }) => {
                    return (
                        <div key={data.member.id}>
                            <div className="w-5 h-5 bg-gray-600 rounded-full text-[10px] flex items-center justify-center ring-1 ring-[#0e101d]">
                                <Names userName={data.member.user.username} />
                            </div>
                        </div>
                    );
                })}
                {elem.eventMember.length > 3 ? (
                    <div className="w-5 h-5 bg-gray-600 rounded-full text-[10px] flex items-center justify-center">
                        <div>+{elem.eventMember.length - 3}</div>
                    </div>
                ) : null}

                <div
                    onClick={() => {
                        setAddMemberModal(true);
                        getSingleEvent(elem?.id);
                    }}
                    className="w-5 h-5 bg-gray-700 hover:bg-gray-600 cursor-pointer rounded-full flex items-center justify-center text-[10px] transition-colors"
                >
                    <RiAddLine className="w-4 h-4" />
                </div>
            </div>
        </div>
    )
}
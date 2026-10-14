import { useEvent, useEventReport } from "@/contexts/eventcontext/EventContext"
import { TimeAgo } from "@/utils/TimeAgo"
import { RiCalendarEventLine, RiCloseLine, RiFilePdf2Line, RiTimeLine } from "@remixicon/react"
import { format } from "date-fns"
import { eventColor } from "./EventMainDetail"
import { currentMonth } from "./TaskShowReport"
import { useAppSelector } from "@/hooks/reduxhooks"
import { useDispatch } from "react-redux"
import { setEventShowReport } from "@/store/slices/reportSlice"
import { useTaskReport } from "@/contexts/taskContext/TaskContext"
import EventCSV from "./EventCsv"

export default function EventReport() {
    const { eventData } = useEvent()
    const { eventReport } = useEventReport()
    const { eventendDate, eventstartDate } = useAppSelector((state) => state.filterEvent)
    const dispatch = useDispatch()
    const { handlePdf, printRef } = useTaskReport()

    const data = [
        { name: 'Total Event', bg: 'bg-cyan-500/10', text: 'text-cyan-400', type: 'All scheduled events', value: eventReport.totalEvent },
        { name: 'Personal Meetings', bg: 'bg-purple-500/10', text: 'text-purple-400', type: 'Personal appointments', value: eventReport.totalPersonalMeeting },
        { name: 'Project Meetings', bg: 'bg-blue-500/10', text: 'text-blue-400', type: 'Team project meetings', value: eventReport.totalProjectMeeting },
        { name: 'Deadlines', bg: 'bg-amber-500/10', text: 'text-amber-400', type: 'Scheduled deadlines', value: eventReport.totalDeadLine },
    ]

    const percentageOfPersonal = Math.round((eventReport.totalPersonalMeeting / eventReport.totalEvent) * 100)
    const percentageOfProject = Math.round((eventReport.totalProjectMeeting / eventReport.totalEvent) * 100)
    const percentageOfDeadline = Math.round((eventReport.totalDeadLine / eventReport.totalEvent) * 100)

    const data2 = [
        { name: 'Personal Meetings', bg: 'bg-purple-500', text: 'text-purple-400', type: 'Personal appointments', value: eventReport.totalPersonalMeeting, percentage: percentageOfPersonal },
        { name: 'Project Meetings', bg: 'bg-blue-500', text: 'text-blue-400', type: 'Team project meetings', value: eventReport.totalProjectMeeting, percentage: percentageOfProject },
        { name: 'Deadlines', bg: 'bg-amber-500', text: 'text-amber-400', type: 'Scheduled deadlines', value: eventReport.totalDeadLine, percentage: percentageOfDeadline },
    ]

    return (
        <>
            <div ref={printRef} className=" my-3 rounded-xl border border-[#252938] bg-[#171A26] text-gray-100">
                <div className="flex flex-col justify-between gap-3 border-b border-[#303548] px-5 py-5 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-xl font-semibold">Event Report</h1>
                        <p className="mt-1 text-sm text-gray-400">
                            {eventendDate || eventstartDate ? (<><TimeAgo time={eventstartDate} /> - <TimeAgo time={eventendDate} /></>) : (<><TimeAgo time={currentMonth} /> - Onward</>)}
                        </p>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="flex items-center gap-2 rounded-lg border border-[#303548] bg-[#1D2130] px-3 py-2">
                            <RiCalendarEventLine className="h-4 w-4 text-cyan-400" />
                            <span className="text-sm text-gray-300">{eventReport.totalEvent} events found</span>
                        </div>
                        <div onClick={() => dispatch(setEventShowReport(false))} className="p-1.5 rounded-full hover:bg-gray-600">
                            <RiCloseLine className="w-4 h-4" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6 p-5">

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {
                            data.map((elem, index) => {
                                return <div key={index} className="rounded-xl border border-[#303548] bg-[#1D2130] p-4">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-400">{elem.name}</p>
                                        <div className={`rounded-lg ${elem.bg} p-2`}>
                                            <RiCalendarEventLine className={`h-5 w-5 ${elem.text} `} />
                                        </div>
                                    </div>
                                    <p className="mt-4 text-3xl font-semibold">{elem.value}</p>
                                    <p className="mt-1 text-xs text-gray-500">{elem.type}</p>
                                </div>
                            })
                        }
                    </div>


                    <div className="rounded-xl border border-[#303548] bg-[#1D2130] p-5">
                        <h2 className="font-semibold">Event Breakdown</h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Distribution by event type
                        </p>

                        <div className="mt-5 flex h-3 overflow-hidden rounded-full bg-[#303548]">
                            {
                                data2.map((elem, index) => {
                                    return <>
                                        {
                                            elem.percentage !== 0 && (
                                                <div key={index}
                                                    className={`h-full ${elem.bg} transition-all duration-700`}
                                                    style={{ width: `${elem.percentage || 0}%` }}
                                                    title={`${elem.name}: ${elem.value}`}
                                                />
                                            )
                                        }

                                    </>
                                })
                            }

                        </div>

                        <div className="mt-5 grid gap-4 sm:grid-cols-3">
                            {
                                data2.map((elem, index) => {
                                    return <div key={index} className="flex items-center gap-3">
                                        <span className={`h-3 w-3 rounded-sm ${elem.bg}`} />
                                        <span className={`flex-1 text-sm text-gray-300`}>
                                            {elem.name}
                                        </span>
                                        <span className="font-semibold">{elem.value}</span>
                                    </div>
                                })
                            }

                        </div>
                    </div>


                    <div className="overflow-hidden rounded-xl border border-[#303548] bg-[#1D2130]">
                        <div className="flex items-center justify-between border-b border-[#303548] px-5 py-4">
                            <div>
                                <h2 className="font-semibold">Event Details</h2>
                                <p className="mt-1 text-xs text-gray-400">
                                    Scheduled events and participants
                                </p>
                            </div>
                            <span className="rounded-md bg-[#303548] px-2.5 py-1 text-xs text-gray-300">
                                5 records
                            </span>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[750px]">

                                <div className="grid grid-cols-[1.2fr_1fr_1fr_1.6fr_0.8fr] border-b border-[#303548] bg-[#191D2A] text-xs uppercase text-gray-400">
                                    <div className="px-5 py-3 font-medium">Event</div>
                                    <div className="px-5 py-3 font-medium ">Type</div>
                                    <div className="px-7 py-3 font-medium">Date</div>
                                    <div className="px-5 py-3 font-medium">Time</div>
                                    <div className="px-5 py-3 font-medium">Participants</div>
                                </div>

                                {
                                    eventData.map((elem) => {
                                        return <div key={elem.id} className="grid grid-cols-[1.2fr_1fr_1fr_1.6fr_0.8fr] border-b items-center justify-center border-[#303548] transition hover:bg-[#252A3B]">
                                            <div className="px-5 py-2.5">
                                                <p className="font-medium text-gray-100">{elem.name} </p>
                                            </div>
                                            <div className="px-5 py-4">
                                                <span className={`inline-block rounded-full border ${eventColor[elem.type]} px-2.5 py-1 text-xs  `}>
                                                    {elem.type}
                                                </span>
                                            </div>
                                            <div className="whitespace-nowrap px-5 py-4 text-gray-300">
                                                <TimeAgo time={elem.date} />
                                            </div>
                                            <div className="whitespace-nowrap px-5 py-4">
                                                <div className="flex items-center gap-2 text-gray-300 text-sm">
                                                    <RiTimeLine className="h-4 w-4 shrink-0 text-gray-500" />
                                                    {format(elem.startTime, 'hh-mm a')} – {format(elem.endTime, 'hh-mm a')}
                                                </div>
                                            </div>
                                            <div className="px-5 py-4 text-gray-300">{elem.eventMember?.length}</div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-2 border-t border-[#303548] pt-4 text-xs text-gray-500 sm:flex-row">
                        <p>FlowPilot · Event Report</p>
                        <p>Generated from demo event data</p>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center gap-3 px-5 pb-3 pt-3">
                <EventCSV />
                <button onClick={()=>{handlePdf('event')}} className="flex items-center gap-3 border border-[#252938] hover:border-[#252976] rounded text-sm text-gray-300 w-[40%] py-3 justify-center">
                    <RiFilePdf2Line className="w-4 h-4 text-gray-400" />
                    Export PDF
                </button>
            </div>
        </>
    )
}
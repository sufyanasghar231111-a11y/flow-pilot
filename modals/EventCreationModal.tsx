"use client"
import { useEvent, useEventUi } from "@/contexts/eventcontext/EventContext"

export default function EventCreationModal() {

    const { eventCreationModal, setEvenCreationModal, event, handleEventChange } = useEventUi()
    const { createEvent } = useEvent()
    const inputClass =
        "w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-sm text-gray-200 placeholder-gray-500 outline-none focus:border-white/30 [color-scheme:dark]"
    const labelClass = "block text-xs font-medium text-gray-400 mb-1"



    return (
        <>
            {
                eventCreationModal && (
                    <>
                        <div
                            onClick={() => { setEvenCreationModal(false) }}
                            className="w-full h-full inset-0 fixed bg-black/50 z-300 backdrop-blur-sm"
                        />
                        <div className="w-96 fixed top-1/2 left-1/2 rounded-lg -translate-x-1/2 -translate-y-1/2 z-301 bg-[#171A26] p-6 text-gray-200 border border-white/10 shadow-2xl">
                            <h2 className="text-lg font-semibold mb-4">Create Event</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className={labelClass}>Name</label>
                                    <input onChange={handleEventChange} value={event.name} name="name" type="text" placeholder="Event name" className={inputClass} />
                                </div>

                                <div>
                                    <label className={labelClass}>Date</label>
                                    <input onChange={handleEventChange} value={event.date} name="date" type="date" className={inputClass} />
                                </div>

                                <div className="flex gap-3">
                                    <div className="flex-1">
                                        <label className={labelClass}>Start time</label>
                                        <input onChange={handleEventChange} value={event.startTime} name="startTime" type="time" className={inputClass} />
                                    </div>
                                    <div className="flex-1">
                                        <label className={labelClass}>End time</label>
                                        <input onChange={handleEventChange} value={event.endTime} name="endTime" type="time" className={inputClass} />
                                    </div>
                                </div>

                                <div>
                                    <label className={labelClass}>Type</label>
                                    <select onChange={handleEventChange} value={event.type} name="type" className={inputClass} >
                                        <option value="Select Status">Select Status</option>
                                        <option value="PROJECT_MEETING" className="bg-[#171A26]">PROJECT_MEETING</option>
                                        <option value="DEADLINE" className="bg-[#171A26]">DEADLINE</option>
                                        <option value="PERSONAL_MEETING" className="bg-[#171A26]">PERSONAL_MEETING</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 mt-6">
                                <button onClick={() => { setEvenCreationModal(false) }} className="px-4 py-2 text-sm rounded-md text-gray-300 hover:bg-white/10">
                                    Cancel
                                </button>
                                <button onClick={() => { createEvent() }} className="px-4 py-2 text-sm rounded-md bg-blue-600 hover:bg-blue-500 text-white">
                                    Create
                                </button>
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}
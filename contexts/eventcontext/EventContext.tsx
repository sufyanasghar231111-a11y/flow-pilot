"use client"
import { countEventStats, createEventApi, getAllEvent, getSingleEventApi, removeEventApi, updateEventApi } from "@/services/Frontend/eventApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { ReactNode, useContext, useEffect, useState, createContext } from "react";
import { useLogin } from "../authContext/AuthContext";
import { EventType } from "@/app/generated/prisma/enums";
import { AuthUser, userType } from "@/types/usertype";
import { EventTypeState } from "@/types/eventType";

interface EventInterface {
    totalEvent: number,
    totalProjectMeeting: number,
    totalDeadLine: number,
    totalPersonalMeeting: number,
    newEvent: number,
    newProjectMeeting: number,
    newDeadline: number,
    newPersonalMeeting: number
}



type EventMember = {
    length: number;
    member: userType
}

type EventTypes = {
    id?: string;
    name: string;
    date: string;
    startTime: string;
    endTime: string;
    type: EventType
    eventMember: EventMember
}

interface EventContext {
    eventStat: EventInterface,
    eventData: EventTypes[]
    singleEventData: EventType | null;
    getSingleEvent: (eventid: string) => void;
    updateEventMember: (eventid: string, userid: string) => void;
    removeEventMember: (eventid: string, userid: string) => void;
    createEvent: () => void;
}

type EventUi1Type<T> = {
    addMemberModal: boolean;
    setAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
    event: EventTypeState;
    eventCreationModal: boolean;
    setEvenCreationModal: React.Dispatch<React.SetStateAction<boolean>>;
    handleEventChange: (e: { target: { name: string; value: string; }; }) => void;
    months: string | Date;
    setMonths: React.Dispatch<React.SetStateAction<string | Date>>;
}

type EventUi2Type = {
    singleDayModal: boolean
    setSingleDayModal: React.Dispatch<React.SetStateAction<boolean>>;
    dayDate: null | Date
    setDayDate: React.Dispatch<React.SetStateAction<null | Date>>;
    dayData: EventType[]
    setDayData: React.Dispatch<React.SetStateAction<EventType[]>>;
    minCalendarMonths: Date
    setMinCalendarMonths: React.Dispatch<React.SetStateAction<Date>>;
}

export const eventContext = createContext<EventContext | null>(null)
export const eventUi1 = createContext<EventUi1Type | null>(null)
export const eventUi2 = createContext<EventUi2Type | null>(null)

export default function EventContext({ children }: { children: ReactNode }) {

    const [eventStat, setEventStats] = useState<EventInterface>({
        totalEvent: 0,
        totalProjectMeeting: 0,
        totalDeadLine: 0,
        totalPersonalMeeting: 0,
        newEvent: 0,
        newProjectMeeting: 0,
        newDeadline: 0,
        newPersonalMeeting: 0
    })

    const [eventData, setEventData] = useState<EventTypes[]>([])
    const [addMemberModal, setAddMemberModal] = useState<boolean>(false)
    const { authReady } = useLogin()
    const [singleEventData, setSingleEventData] = useState<EventType | null>(null)

    const [event, setEvent] = useState<EventTypeState>(
        {
            name: '',
            date: '',
            startTime: '',
            endTime: '',
            type: ''
        }
    )

    function handleEventChange(e: { target: { name: string; value: string; }; }) {
        setEvent(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }


    const [eventCreationModal, setEvenCreationModal] = useState<boolean>(false)

    const [months, setMonths] = useState<string | Date>(new Date())
    const [singleDayModal, setSingleDayModal] = useState<boolean>(false)
    const [dayData, setDayData] = useState<EventType[]>([])
    const [dayDate, setDayDate] = useState<null | Date>(null)
    const [minCalendarMonths, setMinCalendarMonths] = useState<Date>(new Date())

    async function EventCount() {
        const [res, error] = await tryCatch(countEventStats())

        if (error) {
            console.log(error);
        }

        setEventStats({
            totalEvent: res?.data.totalEvent,
            totalProjectMeeting: res?.data.totalProjectMeeting,
            totalDeadLine: res?.data.totalDeadLine,
            totalPersonalMeeting: res?.data.totalPersonalMeeting,
            newEvent: res?.data.newEvent,
            newProjectMeeting: res?.data.newProjectMeeting,
            newDeadline: res?.data.newDeadline,
            newPersonalMeeting: res?.data.newPersonalMeeting
        })
    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        EventCount()
    }, [authReady])


    async function getEvent() {
        const [res, error] = await tryCatch(getAllEvent())

        if (error) {
            console.log(error);
            return
        }
        setEventData(res?.data.getEvent)
    }

    useEffect(() => {
        if (!authReady) return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getEvent()
    }, [authReady])

    async function getSingleEvent(eventid: string) {
        if (!eventid) return
        const [res, error] = await tryCatch(getSingleEventApi(eventid))

        if (error) {
            console.log(error);
            return
        }
        console.log(res?.data.event);

        setSingleEventData(res?.data.event)

    }

    async function updateEventMember(eventid: string, userid: string) {
        const [res, error] = await tryCatch(updateEventApi(eventid, userid))
        if (error) {
            console.log(error);
            return
        }
        await getEvent()
    }

    async function removeEventMember(eventid: string, userid: string) {
        const [res, error] = await tryCatch(removeEventApi(eventid, userid))
        if (error) {
            console.log(error);
            return
        }
        await getEvent()
    }

    const startTime = `${event.date}T${event.startTime}`
    const endTime = `${event.date}T${event.endTime}`

    async function createEvent() {
        const [res, error] = await tryCatch(createEventApi({
            name: event.name,
            date: event.date,
            startTime: startTime,
            endTime: endTime,
            type: event.type
        }))

        if (error) {
            console.log(error);
            return
        }

        await getEvent()
        setEvenCreationModal(false)
    }

    return (
        <eventContext.Provider value={{ eventStat, eventData, singleEventData, getSingleEvent, updateEventMember, removeEventMember, createEvent }}>
            <eventUi1.Provider value={{ addMemberModal, setAddMemberModal, event, eventCreationModal, setEvenCreationModal, handleEventChange, months, setMonths }}>
                <eventUi2.Provider value={{ singleDayModal, setSingleDayModal, dayDate, setDayDate, dayData, setDayData, minCalendarMonths, setMinCalendarMonths }}>
                    {children}
                </eventUi2.Provider>
            </eventUi1.Provider>
        </eventContext.Provider>
    )
}

export function useEvent() {
    const context = useContext(eventContext)

    if (!context) {
        throw new Error("eventContext must inside useEvent")
    }

    return context
}

export function useEventUi() {
    const context = useContext(eventUi1)

    if (!context) {
        throw new Error("eventUi1 must inside useEventUi")
    }

    return context
}

export function useEventUi2() {
    const context = useContext(eventUi2)

    if (!context) {
        throw new Error("eventUi2 must inside useEventUi")
    }
    return context
}
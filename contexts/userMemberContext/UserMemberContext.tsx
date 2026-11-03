"use client"
import { getEventApi } from "@/services/Frontend/userApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth, useLogin, useLogout } from "../authContext/AuthContext";
import { EventTypes } from "../eventcontext/EventContext";
import { CalendarData } from "@/components/userpagecomponent/userrightside/calendar/AllCalendarDay";
import { userProfileUpdate } from "@/services/Frontend/authApi";
import axios from "axios";

type EventStat = {
    totalEvent: number,
    totalProjectMeeting: number,
    totalPersonalMeeting: number,
    totalDeadline: number,
    newDeadline: number,
    newProjectMeeting: number,
    newPersonalMeeting: number,
}

type UserEvent = {
    eventStat: EventStat,
    eventData: EventTypes[]
}

type EventModalType = {
    dayDate: Date | null;
    dayData: CalendarData[];
    allDataModal: boolean;
    setDayDate: React.Dispatch<React.SetStateAction<null | Date>>
    setDayData: React.Dispatch<React.SetStateAction<CalendarData[]>>
    setAllDataModal: React.Dispatch<React.SetStateAction<boolean>>
}

type ProfileUpdateType = {
    userPfp: File | null
    setUserPfp: React.Dispatch<React.SetStateAction<File | null>>
    userEmail: string
    setUserEmail: React.Dispatch<React.SetStateAction<string>>
    userName: string
    setUserName: React.Dispatch<React.SetStateAction<string>>
    removePfp: boolean
    setRemovePfp: React.Dispatch<React.SetStateAction<boolean>>
    UserUpdatePfp: () => void;
    userPreview: null | string
    setUserPreview: React.Dispatch<React.SetStateAction<null | string>>
    errorType: boolean
    errorEmailExist: boolean
    errorPfpSize: boolean;
    setErrorType: React.Dispatch<React.SetStateAction<boolean>>
    setErrorPfpSize: React.Dispatch<React.SetStateAction<boolean>>
    setErrorEmailExist: React.Dispatch<React.SetStateAction<boolean>>
}

export const userEventProvider = createContext<UserEvent | null>(null)
export const eventModalProvider = createContext<EventModalType | null>(null)
export const userProfileUpdateProvider = createContext<ProfileUpdateType | null>(null)
export default function UserMemberContext({ children }: { children: ReactNode }) {
    const { authReady } = useLogin()
    const { user, setUser } = useAuth()
    const [eventData, setEventData] = useState([])
    const [dayDate, setDayDate] = useState<Date | null>(null)
    const [dayData, setDayData] = useState<CalendarData[]>([])
    const [allDataModal, setAllDataModal] = useState<boolean>(false)

    const [userPfp, setUserPfp] = useState<File | null>(null)
    const [userEmail, setUserEmail] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [removePfp, setRemovePfp] = useState(false)
    const [userPreview, setUserPreview] = useState<null | string>(null)
    const [errorType, setErrorType] = useState(false)
    const [errorPfpSize, setErrorPfpSize] = useState(false)
    const [errorEmailExist, setErrorEmailExist] = useState(false)
    const { profileImage } = useLogout()

    const [eventStat, setEventStat] = useState<EventStat>({
        totalEvent: 0,
        totalProjectMeeting: 0,
        totalPersonalMeeting: 0,
        totalDeadline: 0,
        newDeadline: 0,
        newProjectMeeting: 0,
        newPersonalMeeting: 0,
    })

    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return

        async function getEvent() {
            const [res, error] = await tryCatch(getEventApi())

            if (error) {
                console.log(error);
            }

            setEventStat({
                totalEvent: res?.data.totalEvent,
                totalProjectMeeting: res?.data.totalProjectMeeting,
                totalPersonalMeeting: res?.data.totalPersonalMeeting,
                totalDeadline: res?.data.totalDeadline,
                newDeadline: res?.data.newDeadline,
                newProjectMeeting: res?.data.newProjectMeeting,
                newPersonalMeeting: res?.data.newPersonalMeeting,
            })

            setEventData(res?.data.getEvent)
        }

        getEvent()

    }, [authReady, user?.role])

    async function UserUpdatePfp() {

        const formData = new FormData()
        if (userPfp) {
            formData.append('pfp', userPfp)
        }

        formData.append('username', userName)
        formData.append('email', userEmail)
        formData.append('removePfp', String(removePfp))

        const [res, error] = await tryCatch(userProfileUpdate(formData))

        if (error) {

            if (axios.isAxiosError(error) && error?.response?.status === 404) {
                setErrorType(true)
            }

            if (axios.isAxiosError(error) && error?.response?.status === 400) {
                setErrorPfpSize(true)
            }

            if (axios.isAxiosError(error) && error?.response?.status === 409) {
                setErrorEmailExist(true)
            }

            console.log(error);
        }

        await profileImage()
        setUser(prev => {

            if (!prev) return prev
            return {
                ...prev,
                email: res?.data.updateProfile.email ?? prev.email,
                username: res?.data.updateProfile.username ?? prev.username,
                pfp: res?.data.updateProfile.pfp ?? prev.pfp,
            }
        })

        setUserPreview(null)
    }

    return (
        <userEventProvider.Provider value={{ eventStat, eventData }}>
            <eventModalProvider.Provider value={{ dayDate, dayData, allDataModal, setAllDataModal, setDayData, setDayDate }}>
                <userProfileUpdateProvider.Provider value={{ userEmail, userName, userPfp, removePfp, setRemovePfp, setUserEmail, setUserName, setUserPfp, UserUpdatePfp, userPreview, setUserPreview, errorType, errorPfpSize, errorEmailExist, setErrorType, setErrorEmailExist, setErrorPfpSize }}>
                    {children}
                </userProfileUpdateProvider.Provider>
            </eventModalProvider.Provider>
        </userEventProvider.Provider>
    )
}

export const useUserEvent = () => {
    const context = useContext(userEventProvider)

    if (!context) {
        throw new Error('userEventProvider must inside useUserEvent')
    }

    return context
}

export const useModalEvent = () => {
    const context = useContext(eventModalProvider)

    if (!context) {
        throw new Error('eventModalProvider must inside useModalEvent')
    }

    return context
}

export const useUserUpdate = () => {
    const context = useContext(userProfileUpdateProvider)

    if (!context) {
        throw new Error('userProfileUpdateProvider must inside useUserUpdate')
    }

    return context
}
"use client"

import { timeZoneApi } from "@/services/Frontend/settingsApi";
import { tryCatch } from "@/utils/tryCatch";
import { ReactNode, useState, createContext, useContext } from "react";
import { useAuth } from "../authContext/AuthContext";

type SettingType = {
    timeZone: string;
    setTimeZone: React.Dispatch<React.SetStateAction<string>>;
    updateTimeZone: () => void;
    dateFormat: string;
    settingLoading: boolean;
    setDateFormat: React.Dispatch<React.SetStateAction<string>>;
}
export const settingProvider = createContext<SettingType | null>(null)

export default function SettingContext({ children }: { children: ReactNode }) {
    const [timeZone, setTimeZone] = useState<string>('')
    const [dateFormat, setDateFormat] = useState<string>('')
    const { setUser } = useAuth()
    const [settingLoading, setSettingLoading] = useState<boolean>(false)

    const updateTimeZone = async () => {
        setSettingLoading(true)
        const [res, error] = await tryCatch(timeZoneApi({ timeZone, dateFormat }))

        if (error) {
            console.log(error);
            setSettingLoading(false)
        }

        setUser(prev =>
            prev ?
                {
                    ...prev,
                    timeZone: res?.data.timeZone.timeZone,
                    dateFormat: res?.data.timeZone.dateFormat
                } : prev
        )

        setSettingLoading(false)

    }

    return (
        <settingProvider.Provider value={{ timeZone, setTimeZone, updateTimeZone, dateFormat, setDateFormat, settingLoading }}>
            {children}
        </settingProvider.Provider>
    )
}


export function useSetting() {
    const context = useContext(settingProvider)
    if (!context) {
        throw new Error("useSetting context is must inside settingProvider")
    }
    return context
}
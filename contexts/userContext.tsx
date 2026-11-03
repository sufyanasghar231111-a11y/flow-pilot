"use client"

import { totalUserApi } from "@/services/Frontend/userApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useAuth, useLogin } from "./authContext/AuthContext";


type UserStatsType = {
    totalUser: number
    newThisMonth: number
}

type UserType = {
    userStats: UserStatsType
    notificationModal: string | null
    setNotificationModal: React.Dispatch<React.SetStateAction<string | null>>
}


export const userProvider = createContext<UserType | null>(null)

export default function UserContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()
    const { user } = useAuth()
    const [notificationModal, setNotificationModal] = useState<string | null>(null)

    const [userStats, setUserStats] = useState<UserStatsType>(
        {
            totalUser: 0,
            newThisMonth: 0
        }
    )

    async function totalUser() {
        const [res, error] = await tryCatch(totalUserApi())

        if (error) {
            console.log(error);
            return
        }

        setUserStats({
            totalUser: res?.data.totalUser,
            newThisMonth: res?.data.newThisMonth
        })


    }

    useEffect(() => {
        if (!authReady || user?.role !== 'ADMIN') return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        totalUser()
    }, [authReady, user?.role])

    return (
        <userProvider.Provider value={{ userStats, notificationModal, setNotificationModal }}>
            {children}
        </userProvider.Provider>
    )
}
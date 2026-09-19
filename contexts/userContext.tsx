"use client"

import { totalUserApi } from "@/services/Frontend/userApi";
import { tryCatch } from "@/utils/tryCatch";
import { createContext, ReactNode, useEffect, useState } from "react";
import { useLogin } from "./authContext/AuthContext";


type UserStatsType = {
    totalUser: number
    newThisMonth: number
}

type UserType = {
    userStats: UserStatsType
}


export const userProvider = createContext<UserType | null>(null)

export default function UserContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()

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
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        totalUser()
    }, [authReady])

    return (
        <userProvider.Provider value={{ userStats }}>
            {children}
        </userProvider.Provider>
    )
}
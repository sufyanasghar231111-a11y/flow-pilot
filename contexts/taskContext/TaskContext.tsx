"use client"
import { countApi } from "@/services/Frontend/taskApi";
import { tryCatch } from "@/utils/tryCatch";
import { createContext, useState, ReactNode, useEffect } from "react";
import { useLogin } from "../authContext/AuthContext";


type TaskStatsType = {
    completedTask: number,
    pendingTask: number,
    activeTask: number,
    newCompleted: number,
    newPending: number
}

type TaskContextype = {
    taskStats: TaskStatsType
}

export const taskContext = createContext<TaskContextype | null>(null)

export default function TaskContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()

    const [taskStats, setTaskStats] = useState<TaskStatsType>({
        completedTask: 0,
        pendingTask: 0,
        activeTask: 0,
        newCompleted: 0,
        newPending: 0
    })

    async function countTaskStats() {
        const [res, error] = await tryCatch(countApi())

        if (error) {
            console.log(error);
            return
        }

        setTaskStats({
            completedTask: res?.data.completedTask,
            pendingTask: res?.data.pendingTask,
            activeTask: res?.data.activeTask,
            newCompleted: res?.data.newCompleted,
            newPending: res?.data.newPending
        })
    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        countTaskStats()
    }, [authReady])

    return (
        <taskContext.Provider value={{ taskStats }}>
            {children}
        </taskContext.Provider>
    )
}

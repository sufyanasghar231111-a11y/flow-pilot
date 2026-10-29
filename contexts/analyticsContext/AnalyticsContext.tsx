"use client"

import { dailyProjectApi, dailyTaskApi, overDueApi, taskPriorityApi } from "@/services/Frontend/analyticsApi";
import { tryCatch } from "@/utils/tryCatch";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useAuth, useLogin } from "../authContext/AuthContext";


type AnalyticsProjectType = {
    projectCreation: Record<string, number>
    projectCompletion: Record<string, number>
}

type AnalyticsTaskType = {
    taskCreation: Record<string, number>
    taskCompletion: Record<string, number>
}

type ProjectStatus = {
    overDueStats: number
}

type StateType = {
    high: number,
    medium: number,
    low: number
}

type PriorityType = {
    priorityStats: StateType
}

export const projectAnalyticContext = createContext<AnalyticsProjectType | null>(null)
export const taskAnalyticContext = createContext<AnalyticsTaskType | null>(null)
export const projectStatusProvider = createContext<ProjectStatus | null>(null)
export const priorityProvider = createContext<PriorityType | null>(null)

export default function AnalyticsContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()
    const { user } = useAuth()

    const [projectCreation, setProjectCreation] = useState({})
    const [projectCompletion, setProjectCompletion] = useState({})

    const [taskCreation, setTaskCreation] = useState({})
    const [taskCompletion, setTaskCompletion] = useState({})
    const [overDueStats, setOverDueStats] = useState(0)
    const [priorityStats, setPriorityStats] = useState<StateType>(
        {
            high: 0,
            medium: 0,
            low: 0,
        }
    )

    async function dailyProject() {
        const [res, error] = await tryCatch(dailyProjectApi())

        if (error) {
            console.log(error);
            return
        }

        setProjectCreation(res?.data.dailyData)
        setProjectCompletion(res?.data.dailyCompleted)

    }

    useEffect(() => {
        if (!authReady || user?.role !=='ADMIN') return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        dailyProject()
    }, [authReady, user?.role])

    async function dailyTask() {
        const [res, error] = await tryCatch(dailyTaskApi())

        if (error) {
            console.log(error);
            return
        }

        setTaskCreation(res?.data.dailyCreated)
        setTaskCompletion(res?.data.dailyCompleted)
    }

    useEffect(() => {
        if (!authReady || user?.role !=='ADMIN') return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        dailyTask()
    }, [authReady, user?.role])


    async function overDue() {
        const [res, error] = await tryCatch(overDueApi())

        if (error) {
            console.log(error);
            return
        }
        setOverDueStats(res?.data.overDue)
    }

    useEffect(() => {
        if (!authReady || user?.role !=='ADMIN') return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        overDue()
    }, [authReady, user?.role])

    async function taskPriority() {
        const [res, error] = await tryCatch(taskPriorityApi())

        if (error) {
            console.log(error);
        }

        setPriorityStats({
            high:res?.data.high,
            medium:res?.data.medium,
            low:res?.data.low,
        })

    }

    useEffect(()=>{
        if(!authReady || user?.role !=='ADMIN') return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        taskPriority()
    },[authReady, user?.role])


    return (
        <projectAnalyticContext.Provider value={{ projectCompletion, projectCreation }}>
            <taskAnalyticContext.Provider value={{ taskCreation, taskCompletion }}>
                <projectStatusProvider.Provider value={{ overDueStats }}>
                    <priorityProvider.Provider value={{ priorityStats }}>
                        {children}
                    </priorityProvider.Provider>
                </projectStatusProvider.Provider>
            </taskAnalyticContext.Provider>
        </projectAnalyticContext.Provider>
    )
}

export function useAnalytic() {
    const context = useContext(projectAnalyticContext)

    if (!context) {
        throw new Error("useAnalytic must be inside projectAnalyticContext")
    }

    return context
}


export function useTaskAnalytic() {
    const context = useContext(taskAnalyticContext)

    if (!context) {
        throw new Error("useTaskAnalytic must be inside taskAnalyticContext")
    }

    return context
}

export function useProjectStatus() {
    const context = useContext(projectStatusProvider)

    if (!context) {
        throw new Error("projectStatusProvider must be inside useProjectStatus")
    }

    return context
}

export function usePriority(){
    const context = useContext(priorityProvider)

    if (!context) {
        throw new Error("projectStatusProvider must be inside useProjectStatus")
    }

    return context
}
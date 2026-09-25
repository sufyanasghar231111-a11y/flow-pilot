"use client"
import { countApi, getAllTaskApi, taskCreationApi, updateTaskApi } from "@/services/Frontend/taskApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { createContext, useState, ReactNode, useEffect, useContext } from "react";
import { useLogin } from "../authContext/AuthContext";
import { useProject } from "@/hooks/useProject";


type TaskStatsType = {
    completedTask: number,
    pendingTask: number,
    activeTask: number,
    newCompleted: number,
    newPending: number
}

export type Status =
    | 'TODO'
    | 'IN_PROGRESS'
    | 'REVIEW'
    | 'DONE'

export type TaskState = {
    id?: string,
    name: string
    description: string
    priority: string
    dueDate: string;
    assignedToId: string,
    status?: Status
}

type TaskContextype = {
    taskStats: TaskStatsType;
    taskCreation: (projectId: string) => void;
    task: TaskState;
    handleTaskChange: (e: { target: { name: string; value: string; }; }) => void;
    getTask: TaskState[];
    updateTaskByStatus: (projectid: string, status: string) => void;
    setGetTask: React.Dispatch<React.SetStateAction<TaskState[]>>;
}


type TaskUiContextType1 = {
    projectSelectionModal: boolean
    setProjectSelectionModal: React.Dispatch<React.SetStateAction<boolean>>
    taskCreationModal: boolean
    setTaskCreationModal: React.Dispatch<React.SetStateAction<boolean>>;
    warningModal: boolean;
    setWarningModal: React.Dispatch<React.SetStateAction<boolean>>;

}

type TaskUiContextType2 = {
    taskDetailModal: null | string;
    setTaskDetailModal: React.Dispatch<React.SetStateAction<null | string>>
}

export const taskContext = createContext<TaskContextype | null>(null)
export const taskUiContext1 = createContext<TaskUiContextType1 | null>(null)
const taskUiContext2 = createContext<TaskUiContextType2 | null>(null)

export default function TaskContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()

    const [taskStats, setTaskStats] = useState<TaskStatsType>({
        completedTask: 0,
        pendingTask: 0,
        activeTask: 0,
        newCompleted: 0,
        newPending: 0
    })

    const [task, setTask] = useState({
        name: '',
        description: "",
        priority: "",
        dueDate: "",
        assignedToId: ""
    })

    const [projectSelectionModal, setProjectSelectionModal] = useState<boolean>(false)
    const [taskCreationModal, setTaskCreationModal] = useState<boolean>(false)
    const { getAllProject } = useProject()
    const [getTask, setGetTask] = useState<TaskState[]>([])
    const [warningModal, setWarningModal] = useState(false)
    const [taskDetailModal, setTaskDetailModal] = useState<null | string>(null)

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

    function handleTaskChange(e: { target: { name: string; value: string; }; }) {
        setTask(
            prev => ({
                ...prev,
                [e.target.name]: e.target.value
            })
        )
    }

    async function getAllTask() {
        const [res, error] = await tryCatch(getAllTaskApi())

        if (error) {
            console.log(error);
        }

        setGetTask(res?.data.getTasks)
    }

    useEffect(() => {
        if (!authReady) return
        getAllTask()

    }, [authReady])

    async function taskCreation(projectId: string) {
        const [res, error] = await tryCatch(taskCreationApi(projectId,
            {
                name: task.name,
                description: task.description,
                priority: task.priority,
                dueDate: task.dueDate,
                assignedToId: task.assignedToId
            }
        ))

        if (error) {
            console.log(error)
        }

        await getAllTask()
        await getAllProject()

        setTaskCreationModal(false)

    }

    async function updateTaskByStatus(projectid: string, status: string) {
        const [res, error] = await tryCatch(updateTaskApi(projectid, {
            status: status
        }))

        if (error) {
            await getAllTask()
            console.log(error);
            return
        }

    }


    return (
        <taskContext.Provider value={{ taskStats, taskCreation, task, handleTaskChange, getTask, updateTaskByStatus, setGetTask }}>
            <taskUiContext1.Provider value={{ projectSelectionModal, setProjectSelectionModal, taskCreationModal, setTaskCreationModal, warningModal, setWarningModal }}>
                <taskUiContext2.Provider value={{ taskDetailModal, setTaskDetailModal }}>
                    {children}
                </taskUiContext2.Provider>
            </taskUiContext1.Provider>
        </taskContext.Provider>
    )
}


export function useTaskUi1() {
    const context = useContext(taskUiContext1)
    if (!context) {
        throw new Error('taskUicontext must be inside useTaskUi1')
    }

    return context
}


export function useTaskUi2() {
    const context = useContext(taskUiContext2)
    if (!context) {
        throw new Error('taskUiContext2 is must inside useTaskUi2')
    }
    return context
}
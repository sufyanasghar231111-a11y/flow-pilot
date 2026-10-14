"use client"
import { countApi, deleteTaskApi, getAllTaskApi, singleTaskApi, taskCreationApi, updateSingleTaskApi, updateTaskApi } from "@/services/Frontend/taskApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { createContext, useState, ReactNode, useEffect, useContext, useRef, RefObject } from "react";
import { useLogin } from "../authContext/AuthContext";
import { useProject } from "@/hooks/useProject";
import { useAppSelector } from "@/hooks/reduxhooks";


type TaskStatsType = {
    completedTask: number,
    pendingTask: number,
    activeTask: number,
    newCompleted: number,
    newPending: number,
    overDue: number
}

export type Status =
    | 'TODO'
    | 'IN_PROGRESS'
    | 'REVIEW'
    | 'DONE'


type User = {
    id: string,
    username: string,
    email: string
}

type AssignedData = {
    id?: string,
    user: User
}

export type TaskState = {
    id?: string,
    name: string
    description: string
    priority: string,
    dueDate: string;
    assignedToId: string,
    status?: Status,
    assignedTo?: AssignedData,
    completedAt?: string

}

type TaskContextype = {
    taskStats: TaskStatsType;
    taskCreation: (projectId: string) => void;
    task: TaskState;
    taskUpdate: TaskState;
    handleTaskChange: (e: { target: { name: string; value: string; }; }) => void;
    handleTaskUpdateChange: (e: { target: { name: string; value: string; }; }) => void;
    getTask: TaskState[];
    updateTaskByStatus: (projectid: string, status: string) => void;
    setGetTask: React.Dispatch<React.SetStateAction<TaskState[]>>;
    singleTaskData: TaskState | null
    singleTaskById: (taskid: string) => void;
    deleteTask: (taskid: string) => void;
    updateTask: (taskid: string) => void;
    getAllTask: () => void;
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
    taskDetailModal: null | string | boolean;
    setTaskDetailModal: React.Dispatch<React.SetStateAction<null | string | boolean>>
    taskDeletionModal: boolean;
    setTaskDeletionModal: React.Dispatch<React.SetStateAction<boolean>>
    taskUpdateModal: boolean;
    setTaskUpdateModal: React.Dispatch<React.SetStateAction<boolean>>
}

type ReportState = {
    totalTask: number,
    totalDone: number,
    totalTodo: number,
    totalReview: number,
    totalInProgress: number,
    totalDonePercentage: number,
    totalTodoPercentage: number,
    totalReviewPercentage: number,
    totalInProgressPercentage: number,

    totalHigh: number,
    totalMedium: number,
    totalLow: number,
    totalHighPercentage: number,
    totalMediumPercentage: number,
    totalLowPercentage: number
}

type TaskReport = {
    taskReport: ReportState;
    handlePdf: (data: string) => void;
    printRef: RefObject<HTMLDivElement | null>
}

export const taskContext = createContext<TaskContextype | null>(null)
export const taskUiContext1 = createContext<TaskUiContextType1 | null>(null)
const taskUiContext2 = createContext<TaskUiContextType2 | null>(null)
export const reportTaskProvider = createContext<TaskReport | null>(null)

export default function TaskContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()

    const [taskStats, setTaskStats] = useState<TaskStatsType>({
        completedTask: 0,
        pendingTask: 0,
        activeTask: 0,
        newCompleted: 0,
        newPending: 0,
        overDue: 0
    })

    const [task, setTask] = useState({
        name: '',
        description: "",
        priority: "",
        dueDate: "",
        assignedToId: ""
    })

    const [taskUpdate, setTaskUpdate] = useState({
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
    const [taskDetailModal, setTaskDetailModal] = useState<null | string | boolean>(null)
    const [taskDeletionModal, setTaskDeletionModal] = useState<boolean>(false)
    const [singleTaskData, setSingleTaskData] = useState<TaskState | null>(null)
    const [taskUpdateModal, setTaskUpdateModal] = useState<boolean>(false)
    const [taskReport, setTaskReport] = useState<ReportState>(
        {
            totalTask: 0,
            totalDone: 0,
            totalTodo: 0,
            totalReview: 0,
            totalInProgress: 0,
            totalDonePercentage: 0,
            totalTodoPercentage: 0,
            totalReviewPercentage: 0,
            totalInProgressPercentage: 0,
            totalHigh: 0,
            totalMedium: 0,
            totalLow: 0,
            totalHighPercentage: 0,
            totalMediumPercentage: 0,
            totalLowPercentage: 0
        }
    )
    const { priority, taskStatus, endTaskDate, startTaskDate } = useAppSelector((state) => state.filterTask)

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
            newPending: res?.data.newPending,
            overDue: res?.data.overDue
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

    function handleTaskUpdateChange(e: { target: { name: string; value: string; }; }) {
        setTaskUpdate(
            prev => ({
                ...prev,
                [e.target.name]: e.target.value
            })
        )
    }

    async function getAllTask() {
        const [res, error] = await tryCatch(getAllTaskApi(taskStatus, priority, startTaskDate, endTaskDate))

        if (error) {
            console.log(error);
        }

        setGetTask(res?.data.getTasks)
        setTaskReport({
            totalTask: res?.data.totalTask,
            totalDone: res?.data.totalDone,
            totalTodo: res?.data.totalTodo,
            totalReview: res?.data.totalReview,
            totalInProgress: res?.data.totalInProgress,
            totalDonePercentage: res?.data.totalDonePercentage,
            totalTodoPercentage: res?.data.totalTodoPercentage,
            totalReviewPercentage: res?.data.totalReviewPercentage,
            totalInProgressPercentage: res?.data.totalInProgressPercentage,

            totalHigh: res?.data.totalHigh,
            totalMedium: res?.data.totalMedium,
            totalLow: res?.data.totalLow,
            totalHighPercentage: res?.data.totalHighPercentage,
            totalMediumPercentage: res?.data.totalMediumPercentage,
            totalLowPercentage: res?.data.totalLowPercentage
        })
    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllTask()

    }, [authReady, taskStatus, priority, startTaskDate, endTaskDate])

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

    async function singleTaskById(taskid: string) {
        if (!taskid) return
        const [res, error] = await tryCatch(singleTaskApi(taskid))
        if (error) {
            console.log(error);
            return
        }
        setSingleTaskData(res?.data.task)
    }

    useEffect(() => {
        if (!authReady) return

        singleTaskById()
    }, [authReady])

    async function deleteTask(taskid: string) {
        const [res, error] = await tryCatch(deleteTaskApi(taskid))
        if (error) {
            console.log(error);
            return
        }

        await getAllTask()
        setTaskDeletionModal(false)
    }

    async function updateTask(taskid: string) {
        const [res, error] = await tryCatch(updateSingleTaskApi(taskid,
            {
                name: taskUpdate.name,
                description: taskUpdate.description,
                priority: taskUpdate.priority,
                dueDate: taskUpdate.dueDate,
                assignedToId: taskUpdate.assignedToId
            }
        ))
        if (error) {
            console.log(error);
            return
        }

        await getAllTask()
        setTaskUpdateModal(false)
    }

    useEffect(() => {
        if (!singleTaskData) return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        setTaskUpdate(
            {
                name: singleTaskData?.name ?? "",
                description: singleTaskData?.description ?? "",
                priority: singleTaskData?.priority ?? "",
                dueDate: singleTaskData?.dueDate ? singleTaskData?.dueDate.split("T")[0] : "",
                assignedToId: singleTaskData?.assignedTo?.user.id ?? ""
            }
        )

    }, [singleTaskData])

    const printRef = useRef<HTMLDivElement>(null)

    async function handlePdf(data: string) {
        const element = printRef.current
        if (!element) return

        const html2canvas = (await import("html2canvas-pro")).default
        const { default: jsPDF } = await import('jspdf')

        const canvas = await html2canvas(element, {
            scale: 2,
            backgroundColor: "#171A26",
        })

        const pdf = new jsPDF({
            unit: "in",
            format: "letter",
            orientation: "landscape",
        });

        const margin = 0.4
        const pageWidth = pdf.internal.pageSize.getWidth()
        const pageHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = pageWidth - margin * 2;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const image = canvas.toDataURL("image/jpeg", 0.98)
        let remainingHeight = imgHeight
        let position = margin

        pdf.addImage(image, 'JPEG', margin, position, imgWidth, imgHeight)
        remainingHeight -= pageHeight - margin * 2

        while (remainingHeight > 0) {
            position = margin - (imgHeight - (imgHeight - remainingHeight))
            pdf.addPage();
            pdf.addImage(image, 'JPEG', margin, position, imgWidth, imgHeight)
            remainingHeight -= pageHeight - margin * 2
        }

        pdf.save(`flowpilot-${data}-report.pdf`)

    }

    return (
        <taskContext.Provider value={{ taskStats, taskCreation, task, handleTaskChange, getTask, updateTaskByStatus, setGetTask, singleTaskData, singleTaskById, deleteTask, updateTask, taskUpdate, handleTaskUpdateChange, getAllTask }}>
            <taskUiContext1.Provider value={{ projectSelectionModal, setProjectSelectionModal, taskCreationModal, setTaskCreationModal, warningModal, setWarningModal }}>
                <taskUiContext2.Provider value={{ taskDetailModal, setTaskDetailModal, taskDeletionModal, setTaskDeletionModal, taskUpdateModal, setTaskUpdateModal }}>
                    <reportTaskProvider.Provider value={{ taskReport, handlePdf, printRef }}>
                        {children}
                    </reportTaskProvider.Provider>
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

export function useTaskReport() {
    const context = useContext(reportTaskProvider)
    if (!context) {
        throw new Error('useTaskReport is must inside reportTaskProvider')
    }
    return context
}
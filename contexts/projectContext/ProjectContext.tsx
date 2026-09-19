"use client"

import { getProjectApi, projectCreationApi, singleProject, totalCount } from "@/services/Frontend/projectApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { ReactNode, useEffect, useState, createContext, useContext } from "react";
import { useLogin } from "../authContext/AuthContext";
import { ProjectStatsType, ProjectStatType, ProjectType } from "@/types/projectType";


type UiType1 = {
    projectCreationModal: boolean
    setProjectCreationModal: React.Dispatch<React.SetStateAction<boolean>>;
    addMemberModal: boolean;
    setAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const projectProvider = createContext<ProjectType | null>(null)
export const UiProjectProvider1 = createContext<UiType1 | null>(null)


export default function ProjectContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()

    const [projectStats, setProjectStats] = useState<ProjectStatsType>(
        {
            totalCounts: 0,
            totalActive: 0,
            totalComplete: 0,
            totalPending: 0,
            totalCancelled: 0,
            newProject: 0,
            newActiveTask: 0,
            newCompleted: 0,
            newPending: 0
        }
    )

    const [getProject, setGetProject] = useState<[]>([])
    const [projectCreationModal, setProjectCreationModal] = useState<boolean>(false)
    const [project, setProject] = useState<ProjectStatType>(
        {
            name: '',
            description: '',
            startDate: '',
            deadline: ''
        }
    )
    const [addMemberModal, setAddMemberModal] = useState(false)
    const [singleProjectData, setSingleProjectData] = useState<null>(null)

    function handleProjectChange(e: { target: { name: string; value: string; }; }) {
        setProject(
            prev => (
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            )
        )
    }

    async function getAllStatus() {
        const [res, error] = await tryCatch(totalCount())

        if (error) {
            console.log(error);
        }

        setProjectStats(
            {
                totalCounts: res?.data.totalCount,
                totalActive: res?.data.totalActive,
                totalComplete: res?.data.totalComplete,
                totalPending: res?.data.totalPending,
                totalCancelled: res?.data.totalCancelled,
                newProject: res?.data.newProject,
                newActiveTask: res?.data.newActiveTask,
                newCompleted: res?.data.newCompleted,
                newPending: res?.data.newPending
            }
        )

    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllStatus()

    }, [authReady])

    async function getAllProject() {
        const [res, error] = await tryCatch(getProjectApi())

        if (error) {
            console.log(error);
            return
        }

        setGetProject(res?.data.findProject)
    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllProject()
    }, [authReady])

    async function ProjectCreation(e: { preventDefault: () => void; }) {
        e.preventDefault()
        const [res, error] = await tryCatch(projectCreationApi(
            {
                name: project.name,
                description: project.description,
                startDate: project.startDate,
                deadline: project.deadline
            }
        ))

        if (error) {
            console.log(error);
        }

        await getAllProject()
        setProjectCreationModal(false)
    }

    async function getSingleProject(id: string) {
        if (!id) return
        setAddMemberModal(true)
        const [res, error] = await tryCatch(singleProject(id))

        if (error) {
            console.log(error);
            return
        }
        setSingleProjectData(res?.data.singleProject)
    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSingleProject()
    }, [authReady])

    return (
        <projectProvider.Provider value={{ projectStats, getProject, handleProjectChange, project, setProject, ProjectCreation, getAllProject, singleProjectData, getSingleProject }}>
            <UiProjectProvider1 value={{ projectCreationModal, setProjectCreationModal, addMemberModal, setAddMemberModal }}>
                {children}
            </UiProjectProvider1>
        </projectProvider.Provider>
    )
}

export function useProjectUi1() {
    const context = useContext(UiProjectProvider1)

    if (!context) {
        throw new Error('Ui must be add in useProjectUi1')
    }

    return context
}
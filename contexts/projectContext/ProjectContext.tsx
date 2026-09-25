"use client"

import { deleteProjectApi, getProjectApi, projectCreationApi, singleProject, totalCount, updateProjectApi } from "@/services/Frontend/projectApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { ReactNode, useEffect, useState, createContext, useContext } from "react";
import { useLogin } from "../authContext/AuthContext";
import { ProjectStatsType, ProjectStatType, ProjectType, UpdatePropType } from "@/types/projectType";
import { useSearchParams } from "next/navigation";


type UiType1 = {
    projectCreationModal: boolean
    setProjectCreationModal: React.Dispatch<React.SetStateAction<boolean>>;
    addMemberModal: boolean;
    setAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
    projectDeleteModal: boolean;
    setProjectDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
    projectPage: number;
}

type UiType2 = {
    filterModal: boolean
    setFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
    filterDate: string
    setFilterData: React.Dispatch<React.SetStateAction<string>>;
}

type UpdateProjectType = {
    handleUpdate: (e: { target: { name: string; value: string; }; }) => void;
    updateProject: (id: string) => void;
    update: UpdatePropType
    updateProjectModal: boolean
    setUpdateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
    deleteProject: (id: string) => void
}

export const projectProvider = createContext<ProjectType | null>(null)
export const UiProjectProvider1 = createContext<UiType1 | null>(null)
export const updateProjectProvider = createContext<UpdateProjectType | null>(null)
export const UiProjectProvider2 = createContext<UiType2 | null>(null)

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
    const [singleProjectData, setSingleProjectData] = useState<UpdatePropType | null>(null)

    const [update, setUpdate] = useState<UpdatePropType>(
        {
            name: '',
            description: '',
            deadline: '',
            startDate: '',
            status: ''
        }
    )

    const [updateProjectModal, setUpdateProjectModal] = useState(false)
    const [projectDeleteModal, setProjectDeleteModal] = useState(false)
    // const [projectPage, setProjectPage] = useState(1)
    const [filterModal, setFilterModal] = useState(false)
    const [filterDate, setFilterData] = useState('')

    const searchParams = useSearchParams()
    const projectPage = Number(searchParams.get('page')) || 1

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
        const [res, error] = await tryCatch(getProjectApi(projectPage))

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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReady, projectPage])

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

        const [res, error] = await tryCatch(singleProject(id))

        if (error) {
            console.log(error)
            return
        }

        setSingleProjectData(res?.data.singleProject)
    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSingleProject()
    }, [authReady])

    function handleUpdate(e: { target: { name: string; value: string; }; }) {
        setUpdate(
            prev => ({
                ...prev,
                [e.target.name]: e.target.value
            })
        )
    }

    async function updateProject(id: string) {

        const [res, error] = await tryCatch(updateProjectApi(id,
            {
                name: update.name,
                description: update.description,
                deadline: update.deadline,
                startDate: update.startDate,
                status: update.status
            }
        ))

        if (error) {
            console.log(error);
        }

        await getAllProject()
        setUpdateProjectModal(false)
    }

    useEffect(() => {
        if (!singleProjectData) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setUpdate(
            {
                name: singleProjectData?.name ?? "",
                description: singleProjectData?.description ?? "",
                deadline: singleProjectData?.deadline ? singleProjectData?.deadline.split("T")[0] : "",
                startDate: singleProjectData?.startDate ? singleProjectData?.startDate.split("T")[0] : "",
                status: singleProjectData?.status ?? ""
            }
        )
    }, [singleProjectData])

    async function deleteProject(id: string) {
        const [res, error] = await tryCatch(deleteProjectApi(id))

        if (error) {
            console.log(error);
            return
        }
        await getAllProject()
        setProjectDeleteModal(false)
    }

    return (
        <projectProvider.Provider value={{ projectStats, getProject, handleProjectChange, project, setProject, ProjectCreation, getAllProject, singleProjectData, getSingleProject }}>
            <UiProjectProvider1 value={{ projectCreationModal, setProjectCreationModal, addMemberModal, setAddMemberModal, projectDeleteModal, setProjectDeleteModal, projectPage }}>
                <updateProjectProvider.Provider value={{ handleUpdate, updateProject, update, updateProjectModal, setUpdateProjectModal, deleteProject }}>
                    <UiProjectProvider2.Provider value={{ filterModal, setFilterModal, filterDate, setFilterData }}>
                        {children}
                    </UiProjectProvider2.Provider>
                </updateProjectProvider.Provider>
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

export function useUpdateProject() {
    const context = useContext(updateProjectProvider)

    if (!context) {
        throw new Error('update data must inside use project update')
    }
    return context
}

export function useUiProject2() {
    const context = useContext(UiProjectProvider2)
    if (!context) {
        throw new Error('Ui 2 must be inside useUiProject2')
    }
    return context
}
"use client"

import { deleteProjectApi, getProjectApi, projectCreationApi, singleProject, totalCount, updateProjectApi } from "@/services/Frontend/projectApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { ReactNode, useEffect, useState, createContext, useContext, useMemo, useCallback } from "react";
import { useAuth, useLogin } from "../authContext/AuthContext";
import { ProjectStatsType, ProjectStatType, ProjectValue, UpdatePropType } from "@/types/projectType";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/hooks/reduxhooks";


type UiType1 = {
    addMemberModal: boolean;
    setAddMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
    projectPage: number;
}

type UiType2 = {
    filterModal: boolean
    setFilterModal: React.Dispatch<React.SetStateAction<boolean>>;
    setFilterData: React.Dispatch<React.SetStateAction<string>>;
}

type UpdateProjectType = {
    handleUpdate: (e: { target: { name: string; value: string; }; }) => void;
    updateProject: (id: string) => void;
    update: UpdatePropType
    updateProjectModal: boolean
    setUpdateProjectModal: React.Dispatch<React.SetStateAction<boolean>>;
}

type ProjectModal = {
    projectCreationModal: boolean
    setProjectCreationModal: React.Dispatch<React.SetStateAction<boolean>>;
    ProjectCreation: (e: { preventDefault: () => void; }) => void;
}

type ProjectCreationInputType = {
    project: ProjectStatType;
    setProject: React.Dispatch<React.SetStateAction<ProjectStatType>>;
    handleProjectChange: (e: { target: { name: string; value: string; }; }) => void;
}

type StatsProvider = {
    projectStats: ProjectStatsType
}

type DeleteModalType = {
    deleteProject: (id: string) => void
    projectDeleteModal: boolean;
    setProjectDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export type ReportPage = {
    totalActivePercentage: number,
    withOutPagination: number,
    totalCompletePercentage: number,
    totalPendingPercentage: number,
    totalCancelledPercentage: number,
    totalProject: number,
    totalActive: number,
    totalCancelled: number,
    totalPending: number,
    totalCompleted: number,
}

type ReportType = {
    report: ReportPage
}


export const projectProvider = createContext<ProjectValue | null>(null)
export const UiProjectProvider1 = createContext<UiType1 | null>(null)
export const updateProjectProvider = createContext<UpdateProjectType | null>(null)
export const UiProjectProvider2 = createContext<UiType2 | null>(null)
const projectModalProvider = createContext<ProjectModal | null>(null)
export const projectCreationInput = createContext<ProjectCreationInputType | null>(null)
export const projectStatProvider = createContext<StatsProvider | null>(null)
export const projectDeleteProvider = createContext<DeleteModalType | null>(null)
export const reportProjectContext = createContext<ReportType | null>(null)

export default function ProjectContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()
    const { user } = useAuth()

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
    const [report, setReport] = useState<ReportPage>({
        totalProject: 0,
        totalActive: 0,
        totalCancelled: 0,
        totalPending: 0,
        totalCompleted: 0,
        totalActivePercentage: 0,
        totalCompletePercentage: 0,
        totalPendingPercentage: 0,
        totalCancelledPercentage: 0,
        withOutPagination: 0
    })

    const { status, startDate, endDate } = useAppSelector((state) => state.filterData)
    const { searchInput } = useAppSelector((state) => state.searchInput)
    const { searchPage } = useAppSelector((state) => state.searchPage)

    const searchParams = useSearchParams()
    const projectPage = Number(searchParams.get('page')) || 1

    const handleProjectChange = useCallback((e: { target: { name: string; value: string; }; }) => {
        setProject(
            prev => (
                {
                    ...prev,
                    [e.target.name]: e.target.value
                }
            )
        )
    }, [])

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
        if (!authReady || user?.role !=='ADMIN') return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllStatus()

    }, [authReady, user?.role])

    const getAllProject = useCallback(async () => {

        const [res, error] = await tryCatch(getProjectApi(projectPage, status, startDate, endDate))

        if (error) {
            console.log(error);
            return
        }

        setGetProject(res?.data.findProject)
        setReport({
            totalProject: res?.data.totalProject,
            totalActive: res?.data.totalActive,
            totalCancelled: res?.data.totalCancelled,
            totalPending: res?.data.totalPending,
            totalCompleted: res?.data.totalCompleted,
            totalActivePercentage: res?.data.totalActivePercentage,
            totalCompletePercentage: res?.data.totalCompletePercentage,
            totalPendingPercentage: res?.data.totalPendingPercentage,
            totalCancelledPercentage: res?.data.totalCancelledPercentage,
            withOutPagination: res?.data.withOutPagination
        })

    }, [projectPage, status, startDate, endDate,])

    useEffect(() => {
        if (!authReady || user?.role !=='ADMIN') return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getAllProject()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReady, projectPage, endDate, startDate, status, user?.role])

    const ProjectCreation = useCallback(async (e: { preventDefault: () => void; }) => {
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
    }, [getAllProject, project.deadline, project.description, project.name, project.startDate])

    const getSingleProject = useCallback(async (id: string) => {
        if (!id) return

        const [res, error] = await tryCatch(singleProject(id))

        if (error) {
            console.log(error)
            return
        }

        setSingleProjectData(res?.data.singleProject)
    }, [])

    useEffect(() => {
        if (!authReady || user?.role !=='ADMIN') return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        getSingleProject()
    }, [authReady, user?.role])

    const handleUpdate = useCallback((e: { target: { name: string; value: string; }; }) => {
        setUpdate(
            prev => ({
                ...prev,
                [e.target.name]: e.target.value
            })
        )
    }, [])

    const updateProject = useCallback(async (id: string) => {

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
    }, [getAllProject, update.deadline, update.description, update.name, update.startDate, update.status])

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

    const deleteProject = useCallback(async (id: string) => {
        const [res, error] = await tryCatch(deleteProjectApi(id))

        if (error) {
            console.log(error);
            return
        }
        await getAllProject()
        setProjectDeleteModal(false)
    }, [getAllProject])



    const projectValue = useMemo(() => ({
        getProject, getAllProject, singleProjectData, getSingleProject, filterDate, setSingleProjectData
    }), [getAllProject, getProject, singleProjectData, getSingleProject, filterDate])

    const StatsProvider = useMemo(() => ({
        projectStats
    }), [projectStats])

    const ProjectModal = useMemo(() => ({
        projectCreationModal, setProjectCreationModal, ProjectCreation
    }), [projectCreationModal, setProjectCreationModal, ProjectCreation])

    const UiType2 = useMemo(() => ({
        filterModal, setFilterModal, setFilterData
    }), [filterModal, setFilterModal, setFilterData])

    const ProjectCreationInputType = useMemo(() => ({
        handleProjectChange, project, setProject
    }), [handleProjectChange, project, setProject])

    const UpdateProjectType = useMemo(() => ({
        handleUpdate, updateProject, update, updateProjectModal, setUpdateProjectModal
    }), [handleUpdate, updateProject, update, updateProjectModal, setUpdateProjectModal])


    const UiType1 = useMemo(() => ({
        addMemberModal, setAddMemberModal, projectPage
    }), [addMemberModal, setAddMemberModal, projectPage])

    const DeleteModalType = useMemo(() => ({
        projectDeleteModal, setProjectDeleteModal, deleteProject
    }), [projectDeleteModal, setProjectDeleteModal, deleteProject])



    return (
        <projectStatProvider.Provider value={StatsProvider}>
            <projectProvider.Provider value={projectValue}>
                <UiProjectProvider1 value={UiType1}>
                    <updateProjectProvider.Provider value={UpdateProjectType}>
                        <UiProjectProvider2.Provider value={UiType2}>
                            <projectModalProvider.Provider value={ProjectModal}>
                                <projectCreationInput.Provider value={ProjectCreationInputType}>
                                    <projectDeleteProvider.Provider value={DeleteModalType}>
                                        <reportProjectContext.Provider value={{ report }}>
                                            {children}
                                        </reportProjectContext.Provider>
                                    </projectDeleteProvider.Provider>
                                </projectCreationInput.Provider>
                            </projectModalProvider.Provider>
                        </UiProjectProvider2.Provider>
                    </updateProjectProvider.Provider>
                </UiProjectProvider1>
            </projectProvider.Provider>
        </projectStatProvider.Provider>
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

export function useProjectModal() {
    const context = useContext(projectModalProvider)

    if (!context) {
        throw new Error('useProjectModal must be inside projectModalProvider')
    }
    return context
}

export function useProjectDelete() {
    const context = useContext(projectDeleteProvider)

    if (!context) {
        throw new Error('projectDeleteProvider must be inside useProjectDelete')
    }

    return context
}

export function useReport() {
    const context = useContext(reportProjectContext)

    if (!context) {
        throw new Error('useReport must be inside reportProjectContext')
    }

    return context
}
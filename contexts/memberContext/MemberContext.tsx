"use client"

import { useProject } from "@/hooks/useProject";
import { useUser } from "@/hooks/useUser";
import { AllUser } from "@/services/Frontend/adminApi";
import { addMemberToProjectApi, removeMemberToProjectApi } from "@/services/Frontend/projectApi";
import { tryCatch } from "@/utils/tryCatch";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "../authContext/AuthContext";
import { userType } from "@/types/usertype";
import { useProjectUi1 } from "../projectContext/ProjectContext";



type ProjectMember = {
    AddMember: (projectId: string, userId: string) => void;
    allUser: userType | [];
    removeMember: (projectId: string, userId: string) => void;
}



export const memberProvider = createContext<ProjectMember | null>(null)

export default function MemberContext({ children }: { children: ReactNode }) {
    const { getAllProject } = useProject()
    const [allUser, setAllUser] = useState<userType | []>([])
    const { authReady } = useLogin()
    const { setAddMemberModal } = useProjectUi1()
    async function GetAllUser() {
        const [res, error] = await tryCatch(AllUser())

        if (error) {
            console.log(error);
        }

        setAllUser(res?.data.users)
    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        GetAllUser()
    }, [authReady])

    async function AddMember(projectId: string, userId: string) {
        setAddMemberModal(false)
        const [res, error] = await tryCatch(addMemberToProjectApi(projectId, userId
        ))

        if (error) {
            console.log(error)
            return
        }

        console.log(res?.data)

        await getAllProject()

    }

    async function removeMember(projectId: string, userId: string) {
        setAddMemberModal(false)
        const [res, error] = await tryCatch(removeMemberToProjectApi(projectId, userId))

        if (error) {
            console.log(error);
        }

        await getAllProject()
    }

    return (
        <memberProvider.Provider value={{ AddMember, allUser, removeMember }}>
            {children}
        </memberProvider.Provider>
    )
}


export function useMember() {
    const context = useContext(memberProvider)

    if (!context) {
        throw new Error('memberProvider must inside in useMember')
    }

    return context
}
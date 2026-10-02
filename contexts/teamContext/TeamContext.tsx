"use client"
import { tryCatch } from "@/utils/tryCatch";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "../authContext/AuthContext";
import { addMemberApi, countTeamApi, getMemberApi, removeTeamMemberApi } from "@/services/Frontend/teamApi";
import { userType } from "@/types/usertype";

type TeamType = {
    totalMember: number,
    newTotal: number
}

type AdminType = {
    admins: userType
    member: userType[]
}

type TeamContextType = {
    teamMember: TeamType,
    memberData: AdminType | null,
    inviteMember: (userid: string) => void;
    removeTeamMember: (userid: string) => void;
}

type TeamUi1 = {
    teamMemberModal: boolean
    setTeamMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
    deleteMemberModal: string | null;
    setDeleteMemberModal: React.Dispatch<React.SetStateAction<string | null>>;
}

const teamProvider = createContext<TeamContextType | null>(null)
const teamUi1 = createContext<TeamUi1 | null>(null)

export default function TeamContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()

    const [teamMember, setTeamMember] = useState({
        totalMember: 0,
        newTotal: 0
    })

    const [memberData, setMemberData] = useState<AdminType | null>(null)
    const [teamMemberModal, setTeamMemberModal] = useState<boolean>(false)
    const [deleteMemberModal, setDeleteMemberModal] = useState<string | null>(null)

    async function countMember() {
        const [res, error] = await tryCatch(countTeamApi())

        if (error) {
            console.log(error);
        }

        setTeamMember({
            totalMember: res?.data.totalMember,
            newTotal: res?.data.newTotal
        })

    }

    useEffect(() => {
        if (!authReady) return
        // eslint-disable-next-line react-hooks/set-state-in-effect
        countMember()
    }, [authReady])

    async function getMember() {
        const [res, error] = await tryCatch(getMemberApi())

        if (error) {
            console.log(error);
            return
        }
        setMemberData(res?.data.getMember)

    }

    useEffect(() => {
        if (!authReady) return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getMember()
    }, [authReady])

    async function inviteMember(userid: string) {
        const [res, error] = await tryCatch(addMemberApi(userid))
        if (error) {
            console.log(error)
            return
        }
        await getMember()
        setTeamMemberModal(false)
        await countMember()
    }

    async function removeTeamMember(userid: string) {
        const [res, error] = await tryCatch(removeTeamMemberApi(userid))
        if (error) {
            console.log(error);
        }
        await getMember()
        setTeamMemberModal(false)
        await countMember()
    }

    return (
        <teamProvider.Provider value={{ teamMember, memberData, inviteMember, removeTeamMember }}>
            <teamUi1.Provider value={{ teamMemberModal, setTeamMemberModal, deleteMemberModal, setDeleteMemberModal, }}>
                {children}
            </teamUi1.Provider>
        </teamProvider.Provider>
    )
}


export function useTeam() {
    const context = useContext(teamProvider)
    if (!context) {
        throw new Error('teamProvider must be inside useTeam')
    }
    return context
}

export function useTeamUi1() {
    const context = useContext(teamUi1)
    if (!context) {
        throw new Error('teamUi1 must be inside useTeamUi1')
    }

    return context
}
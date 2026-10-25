"use client"
import { tryCatch } from "@/utils/tryCatch";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useLogin } from "../authContext/AuthContext";
import { addMemberApi, countTeamApi, getMemberApi, removeTeamMemberApi } from "@/services/Frontend/teamApi";
import { userType } from "@/types/usertype";
import { useAppSelector } from "@/hooks/reduxhooks";
import useDebounce from "@/hooks/useDebounce";

type TeamType = {
    totalMember: number,
    newTotal: number
}

type TaskName = {
    id: string,
    name: string
}

type UserType = {
    createdAt: string
    id: string,
    username: string,
    email: string,
    role: string,
    assignedTask: TaskName[]
}

type AdminType = {
    admins: userType
    member: UserType[]
}

export type SearchTeamMember = {
    user: {
        username: string,
        id: string,
        email: string,
        pfp:true,
        createdAt:string,
        role:string
    }
}

type TeamContextType = {
    teamMember: TeamType,
    memberData: AdminType | null,
    inviteMember: (userid: string) => void;
    removeTeamMember: (userid: string) => void;
    getMember: () => void;
}

type TeamUi1 = {
    teamMemberModal: boolean
    setTeamMemberModal: React.Dispatch<React.SetStateAction<boolean>>;
    deleteMemberModal: string | null;
    setDeleteMemberModal: React.Dispatch<React.SetStateAction<string | null>>;
}

type ReportType = {
    teamReport: {
        totalMember: number,
        memberWithTask: number,
        memberWithOutTask: number,
        totalTask: number
    },

}

const teamProvider = createContext<TeamContextType | null>(null)
const teamUi1 = createContext<TeamUi1 | null>(null)
const teamReportProvider = createContext<ReportType | null>(null)

export default function TeamContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()

    const [teamMember, setTeamMember] = useState({
        totalMember: 0,
        newTotal: 0
    })

    const [memberData, setMemberData] = useState<AdminType | null>(null)
    const [teamMemberModal, setTeamMemberModal] = useState<boolean>(false)
    const [deleteMemberModal, setDeleteMemberModal] = useState<string | null>(null)
    const { teamStartDate, teamEndDate } = useAppSelector((state) => state.filterTeam)
    const [teamReport, setTeamReport] = useState(
        {
            totalMember: 0,
            memberWithTask: 0,
            memberWithOutTask: 0,
            totalTask: 0
        }
    )

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
       
        const [res, error] = await tryCatch(getMemberApi(teamStartDate, teamEndDate))

        if (error) {
            console.log(error);
            return
        }
        setMemberData(res?.data.getMember)

        setTeamReport({
            totalMember: res?.data.getMember.totalMember,
            memberWithTask: res?.data.getMember.memberWithTask,
            memberWithOutTask: res?.data.getMember.memberWithOutTask,
            totalTask: res?.data.getMember.totalTask
        })

    }

    useEffect(() => {
        if (!authReady) return

        // eslint-disable-next-line react-hooks/set-state-in-effect
        getMember()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [authReady, teamStartDate, teamEndDate])

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
        <teamProvider.Provider value={{ teamMember, memberData, inviteMember, removeTeamMember, getMember }}>
            <teamUi1.Provider value={{ teamMemberModal, setTeamMemberModal, deleteMemberModal, setDeleteMemberModal, }}>
                <teamReportProvider.Provider value={{ teamReport }}>
                    {children}
                </teamReportProvider.Provider>
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

export function useTeamReport() {
    const context = useContext(teamReportProvider)

    if (!context) {
        throw new Error('teamReportProvider must be inside useTeamReport')
    }

    return context

}
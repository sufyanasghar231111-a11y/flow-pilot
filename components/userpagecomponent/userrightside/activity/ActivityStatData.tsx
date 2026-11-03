"use client"
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { totalStatThunk } from "@/store/thunks/userThunk";
import { RiCheckboxCircleFill, RiFolderUserFill, RiTaskFill, RiTeamFill } from "@remixicon/react";
import { useEffect } from "react";


export default function ActivityStatData() {

    const { recentActivity } = useAppSelector((state) => state.recentActivity)
    const { totalStat } = useAppSelector((state) => state.totalStat)
    const { user } = useAuth()
    const { authReady } = useLogin()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return
        dispatch(totalStatThunk())
    }, [authReady, dispatch, user?.role])


    const data = [
        {
            total: recentActivity?.joinedInTeam,
            name: 'Joined As Team',
            icon: RiTeamFill,
            new: recentActivity?.newJoinedInTeam,
            text: 'text-amber-500',
            hover: 'hover:border-amber-500/30 hover:bg-amber-500/5',
            month: 'new this month'
        },
        {
            total: totalStat.taskCompleted,
            name: 'Tasks Completed',
            icon: RiCheckboxCircleFill,
            new: totalStat.newCompletedTask,
            text: 'text-green-500',
            hover: 'hover:border-green-500/30 hover:bg-green-500/5',
            month: 'new this month'
        },
        {
            total: totalStat.taskAssign,
            name: 'Assigned Tasks',
            icon: RiTaskFill,
            new: totalStat.newTask,
            text: 'text-purple-500',
            hover: 'hover:border-purple-500/30 hover:bg-purple-500/5',
            month: 'new this month'
        },
        {
            total: totalStat.totalProject,
            name: 'Projects Joined',
            icon: RiFolderUserFill,
            new: totalStat.newMonthProject,
            text: 'text-blue-500',
            hover: 'hover:border-blue-500/30 hover:bg-blue-500/5',
            month: 'new this month'
        },
    ]

    return data
}
import { useLogin } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { reportCompareThunk } from "@/store/thunks/thunks";
import { RiCheckboxCircleFill, RiFolderFill, RiListOrdered, RiTaskFill, RiTaskLine, RiTeamFill } from "@remixicon/react";
import { useEffect } from "react";

export type DataType = {
    name: string,
    total: number,
    icon: string,
    lastmonth: string,
    text: string,
    hover: string
}

export default function ReportStats() {
    const { authReady } = useLogin()
    const dispatch = useAppDispatch()

    const { lastMonth} = useAppSelector(
        (state) => state.comparison
    )


    useEffect(() => {
        if (!authReady) return
        dispatch(reportCompareThunk())
    }, [dispatch, authReady])

   

    const data = [
        {
            name: 'Total Projects',
            total: 10,
            icon: RiFolderFill,
            lastmonth: `${lastMonth.percentageProject}`,
            text: 'text-indigo-400',
            hover: 'hover:border-indigo-500/30 hover:bg-indigo-500/5'
        },
        {
            name: 'Completed Projects',
            total: 10,
            icon: RiCheckboxCircleFill,
            lastmonth: `${lastMonth.projectCompleted}`,
            text: 'text-emerald-400',
            hover: 'hover:border-emerald-500/30 hover:bg-emerald-500/5'
        },
        {
            name: 'Total Tasks',
            total: 10,
            icon: RiListOrdered,
            lastmonth: `${lastMonth.percentageTask}`,
            text: 'text-blue-400',
            hover: 'hover:border-blue-500/30 hover:bg-blue-500/5'
        },
        {
            name: 'Completed Tasks',
            total: 10,
            icon: RiTaskFill,
            lastmonth: `${lastMonth.taskCompleted}`,
            text: 'text-cyan-400',
            hover: 'hover:border-cyan-500/30 hover:bg-cyan-500/5'
        },
        {
            name: 'Team Members',
            total: 10,
            icon: RiTeamFill,
            lastmonth: `${lastMonth.percentageTeam}`,
            text: 'text-violet-400',
            hover: 'hover:border-violet-500/30 hover:bg-violet-500/5'
        },
    ]

    return data
}
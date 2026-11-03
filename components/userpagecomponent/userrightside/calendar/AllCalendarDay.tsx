"use client"
import UserCalendarDays from "@/utils/UserCalendarDays";
import CalendarSheetHeader from "./CalendarSheetHeader";
import CalendarDays from "./CalendarDays";
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { totalUserData } from "@/store/thunks/userThunk";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { useEffect } from "react";
import { useUserEvent } from "@/contexts/userMemberContext/UserMemberContext";
import { UpdatePropType } from "@/types/projectType";
import { TaskState } from "@/contexts/taskContext/TaskContext";
import { EventTypes } from "@/contexts/eventcontext/EventContext";

export type CalendarData =
    | (UpdatePropType & {
        date: string,
        types: 'deadline-project' | 'complete-project'
    })
    | (TaskState & {
        date: string,
        types: 'due-task'
    })
    | (EventTypes & {
        date: string,
        types: "event"
    })

export default function AllCalendarDay() {
    const days = UserCalendarDays()
    const { user } = useAuth()
    const { allDetail } = useAppSelector((state) => state.allData)
    const combine = [
        ...(allDetail?.taskTodo ?? []),
        ...(allDetail?.taskInProgress ?? []),
        ...(allDetail?.taskReview ?? []),
        ...(allDetail?.taskDone ?? []),
    ]
    const { authReady } = useLogin()
    const dispatch = useAppDispatch()
    const { eventData } = useUserEvent()

    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return
        dispatch(totalUserData({ pagination: 1, toDoPagination: 1, progressPagination: 1, reviewPagination: 1, donePagination: 1 }))
    }, [authReady, dispatch, user?.role])

    const data = [
        ...(allDetail?.project.map((elem) => ({
            ...elem.project,
            date: elem.project.deadline,
            types: 'deadline-project' as const
        })) ?? []),
        ...(allDetail?.project.map((elem) => ({
            ...elem.project,
            date: elem.project.completedAt,
            types: 'complete-project' as const
        })) ?? []),
        ...(combine.map((elem) => ({
            ...elem,
            date: elem.dueDate,
            types: 'due-task' as const
        }))),
        ...(eventData.map((elem) => ({
            ...elem,
            date: elem.date,
            types: "event" as const
        })))
    ]


    return (
        <div className="px-4 bg-[#11131D] pb-4">
            <div className="card w-full px-3 py-3   rounded-md">
                <CalendarSheetHeader />
                <div className="grid grid-cols-7 overflow-hidden rounded-t-xl border border-[#252938] bg-[#0F111A] mt-4">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((elem, index) => (
                        <div
                            key={index}
                            className="py-3 text-center text-[11px] sm:text-xs font-semibold  tracking-wider text-gray-500"
                        >
                            {elem}
                        </div>
                    ))}
                </div>
                <div className="grid grid-cols-7 overflow-hidden rounded-b-xl border-x border-b  border-[#252938] bg-[#171A26]">
                    {
                        days.map((day, index) => {
                            return <div key={day ? day.toISOString() : `empty-${index}`} className="min-w-0 h-41  border-[#252938]">
                                {day && <CalendarDays day={day} data={data} />}
                            </div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}
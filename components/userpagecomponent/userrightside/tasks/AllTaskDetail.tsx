'use client'
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import TaskColumn from "./TaskColumn";
import { useEffect, useState } from "react";
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext";
import { taskUpdate, totalUserData } from "@/store/thunks/userThunk";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import TaskCard from "./TaskCard";
import { Status, TaskState, useTaskUi1 } from "@/contexts/taskContext/TaskContext";
import { moveTask } from "@/store/slices/userSlice";
import TaskPagination from "./TaskPagination";

export default function AllTaskDetail() {

    const { allDetail } = useAppSelector((state) => state.allData)
    const { user } = useAuth()
    const { authReady } = useLogin()
    const dispatch = useAppDispatch()
    const [toDoPagination, setToDoPagination] = useState(1)
    const [progressPagination, setProgressPagination] = useState(1)
    const [reviewPagination, setReviewPagination] = useState(1)
    const [donePagination, setDonePagination] = useState(1)
    const { setWarningModal } = useTaskUi1()

    useEffect(() => {
        if (user?.role !== 'USER' || !authReady) return
        dispatch(totalUserData({ pagination: 1, toDoPagination, progressPagination, reviewPagination, donePagination }))
    }, [authReady, dispatch, user?.role, toDoPagination, progressPagination, reviewPagination, donePagination])
    const [active, setActive] = useState<TaskState | null>(null)

    const combine = [
        ...(allDetail?.taskTodo ?? []),
        ...(allDetail?.taskInProgress ?? []),
        ...(allDetail?.taskReview ?? []),
        ...(allDetail?.taskDone ?? []),
    ]

    function handleDragStart(event: DragStartEvent) {

        const find = combine.find(elem => elem.id === event.active.id)
        if (!find) return
        setActive(find)
    }

    function handleDragEnd(event: DragEndEvent) {
        setActive(null)

        const { active, over } = event
        if (!over) return

        const taskid = String(active.id)
        const status = String(over?.id) as Status

        const find = combine.find(elem => elem.id === taskid)
        if (!find) return

        if (status === find.status) {
            return
        }

        if (status === 'DONE') {
            setWarningModal(true)
            return
        }

        dispatch(moveTask({ taskid, status }))
        dispatch(taskUpdate({ taskid, status }))
    }

    return (
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} autoScroll={false}>
            <div className="px-4 py-3">
                <div className="flex items-center gap-3">
                    <TaskColumn name='To Do' id='TODO' task={allDetail?.taskTodo ?? []} />
                    <TaskColumn name='In Progress' id='IN_PROGRESS' task={allDetail?.taskInProgress ?? []} />
                    <TaskColumn name='Review' id='REVIEW' task={allDetail?.taskReview ?? []} />
                    <TaskColumn name='Done' id='DONE' task={allDetail?.taskDone ?? []} />
                </div>
                <div className="flex items-center relative">
                    <TaskPagination location='' id='TODO' page={toDoPagination} setPage={setToDoPagination} task={allDetail?.taskTodo ?? []} />
                    <TaskPagination location='left-[40%]' id='IN_PROGRESS' page={progressPagination} setPage={setProgressPagination} task={allDetail?.taskInProgress ?? []} />
                    <TaskPagination location='left-[60%]' id='REVIEW' page={reviewPagination} setPage={setReviewPagination} task={allDetail?.taskReview ?? []} />
                    <TaskPagination location='left-[80%]' id='DONE' page={donePagination} setPage={setDonePagination} task={allDetail?.taskDone ?? []} />
                </div>
            </div>
            <DragOverlay>
                {
                    active ? (<TaskCard elem={active} handleOpen={function (): void {
                        throw new Error("Function not implemented.");
                    }} />) : null
                }
            </DragOverlay>
        </DndContext>
    )
}
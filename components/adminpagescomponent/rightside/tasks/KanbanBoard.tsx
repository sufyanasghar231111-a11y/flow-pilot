"use client"
import { useTask } from "@/hooks/useTask";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from '@dnd-kit/core'
import TaskColumn from "./TaskColumn";
import { act, useState } from "react";
import { Task } from "@/app/generated/prisma/client";
import TaskCard from "./TaskCard";
import { Status, useTaskUi1 } from "@/contexts/taskContext/TaskContext";


export default function KanbanBoard() {

    const [activeId, setActiveId] = useState<Task | null>(null)
    const { getTask, updateTaskByStatus, setGetTask } = useTask()
    const { setWarningModal } = useTaskUi1()


    function handleDragStart(event: DragStartEvent) {
        const activeTask = getTask.find((task) => task.id === event.active.id)
        setActiveId(activeTask)
    }

    function handleDragEnd(event: DragEndEvent) {

        setActiveId(null)

        const { active, over } = event

        if (!over) return

        const taskId = String(active.id)
        const status = String(over?.id) as Status

        const task = getTask.find(task => task.id === taskId)

        if (!task) return

        const taskStatus = task?.status

        if (taskStatus === status) {
            return
        }

        if(taskStatus !== "REVIEW"){
            return 
        }

        if (status !== 'DONE') {
            setWarningModal(true)
            return
        }

        setGetTask(prev =>
            prev.map(task =>
                task.id === taskId ?
                    { ...task, status: status }
                    : task
            )
        )

        updateTaskByStatus(taskId, status)
    }


    return (
        <DndContext autoScroll={false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
            <div className="px-5 pt-5 w-full  flex gap-2">
                <TaskColumn id='TODO' title='To Do' getTask={getTask} />
                <TaskColumn id='IN_PROGRESS' title='In_Progress' getTask={getTask} />
                <TaskColumn id='REVIEW' title='Review' getTask={getTask} />
                <TaskColumn id='DONE' title='Complete' getTask={getTask} />

            </div>
            <DragOverlay>
                {activeId ? (
                    <div className="">
                        <TaskCard elem={activeId}  />
                    </div>
                ) : null}
            </DragOverlay>
        </DndContext>
    )
}
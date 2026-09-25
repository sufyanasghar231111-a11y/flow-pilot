import { TaskState } from "@/contexts/taskContext/TaskContext"
import api from "@/libs/axios/axios"

export const countApi = () => {
    return api.get('/tasks/count-task')
}

export const taskCreationApi = (projectId: string, data: TaskState) => {
    return api.post(`/tasks/create-task/${projectId}`, data)
}

export const getAllTaskApi = () => {
    return api.get(`/tasks/get-all-task`)
}

export const updateTaskApi = (projectid: string, data: { status: string | null }) => {
    return api.patch(`/tasks/update-task-status/${projectid}`, data)
}

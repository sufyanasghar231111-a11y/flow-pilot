import api from "@/libs/axios/axios"

export const dailyProjectApi = () => {
    return api.get('/analytics/dailyProject')
}

export const dailyTaskApi = () => {
    return api.get('/analytics/daily-task')
}

export const overDueApi = () => {
    return api.get('/analytics/over-due')
}

export const recentActivityApi = () => {
    return api.get('/analytics/recent-activity')
}

export const taskPriorityApi = () => {
    return api.get('/analytics/task-priority')
}

export const weekActivityApi = () => {
    return api.get('/analytics/week-activity')
}
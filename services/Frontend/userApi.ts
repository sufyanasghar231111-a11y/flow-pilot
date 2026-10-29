import api from "@/libs/axios/axios"

export const totalUserApi = () => {
    return api.get('/user/count-user')
}

export const totalStatApi = () => {
    return api.get('/user/totalStat')
}

export const userAllDataApi = (pagination: number, toDoPagination: number, progressPagination: number, reviewPagination: number, donePagination: number) => {
    return api.get('/user-all/user-all-project-task',
        {
            params: {
                page: pagination,
                todopage: toDoPagination,
                inprogresspage: progressPagination,
                reviewpage: reviewPagination,
                donepage: donePagination
            }
        }
    )
}

export const recentActivityApi = () => {
    return api.get('/user-all/recent-activity',

    )
}

export const updateTaskApi = (taskid: string, status: string) => {
    return api.patch(`/user-all/update-task/${taskid}`, { status })
}

export const singleTaskApi = (taskid: string) => {
    return api.get(`/user-all/single-task/${taskid}`)
}
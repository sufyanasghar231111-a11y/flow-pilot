import api from "@/libs/axios/axios"

export const statApi = () => {
    return api.get('/notification/last-week-compare')
}

export const getNotification = (type: string, startDate: string, endDate: string, page: number) => {
    return api.get('/notification/notification-admin', {
        params: {
            type: type,
            startdate: startDate,
            enddate: endDate,
            page: page,
        }
    })
}

export const markAllApi = () => {
    return api.post('/notification/mark-all-read')
}

export const markSingleApi = (notificationid: string) => {
    return api.patch(`/notification/single-mark/${notificationid}`)
}

export const deleteSingleApi = (notificationid: string) => {
    return api.delete(`/notification/single-delete/${notificationid}`)
}

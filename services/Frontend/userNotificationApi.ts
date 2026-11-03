import api from "@/libs/axios/axios"

export const getAllNotificationApi = (type: string, startDate: string, endDate: string, page: number) => {
    return api.get(`/notification/notification-user`,
        {
            params: {
                type: type,
                startDate: startDate,
                endDate: endDate,
                page: page
            }
        }
    )
}

export const singleMarkNotificationApi = (id: string) => {
    return api.patch(`/user.notification/single-mark/${id}`)
}

export const singleDeleteNotificationApi = (id: string) => {
    return api.delete(`/user.notification/single-delete/${id}`)
}

export const allMarkApi = () => {
    return api.patch(`/user.notification/mark-all/`)
}
import api from "@/libs/axios/axios"

export const timeZoneApi = ( data: { timeZone: string; dateFormat: string} ) => {
    return api.patch('/settings/time-zone', data)
}
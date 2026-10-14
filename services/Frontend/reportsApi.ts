import api from "@/libs/axios/axios"

export const monthCompare = () => {
    return api.get('/reports/last-month')
}
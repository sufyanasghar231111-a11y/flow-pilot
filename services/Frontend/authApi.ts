import api, { refreshApi } from "@/libs/axios/axios"

export const loginApi = (data: { email: string; password: string }) => {
    return api.post('/auth/login', data)
}

export const refreshToken = () => {
    return refreshApi.get(`/auth/refresh-token`)
}

export const logoutApi = () => {
    return refreshApi.get(`/logout/logout-all-device`)
}

export const registerApi = (data: {username:string, email:string, password:string}) => {
    return api.post(`/auth/register`, data)
}
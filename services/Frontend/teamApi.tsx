import api from "@/libs/axios/axios"

export const countTeamApi = () => {
    return api.get('/teams/count-member')
}

export const addMemberApi = (userid: string) => {
    return api.post(`/teams/add-member/${userid}`)
}

export const getMemberApi = () => {
    return api.get(`/teams/get-member`)
}

export const removeTeamMemberApi = (userid: string) => {
    return api.delete(`/teams/remove-member/${userid}`)
}
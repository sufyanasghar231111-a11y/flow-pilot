import api from "@/libs/axios/axios"

export const totalCount = () => {
    return api.get('/project/count-project')
}

export const getProjectApi = () => {
    return api.get('/project/get-project')
}

export const projectCreationApi = (data: { name: string; description: string; startDate: string; deadline: string }) => {
    return api.post(`/project/create-project`, data)
}

export const projectUpdateApi = (id: string) => {
    return api.patch(`/project/update-project/${id}`)
}

export const projectDeleteApi = (id: string) => {
    return api.delete(`/project/delete-project/${id}`)
}

export const addMemberToProjectApi = (projectId: string, userId:string) => {
    return api.post(`/project/addMember/${projectId}/${userId}`, )
}

export const removeMemberToProjectApi = (projectId: string, userId:string) => {
    return api.delete(`/project/remove-member/${projectId}/${userId}`, )
}

export const singleProject = (id: string) => {
    return api.get(`/project/single-project/${id}`)
}

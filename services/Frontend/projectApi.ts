import api from "@/libs/axios/axios"
import { UpdatePropType } from "@/types/projectType"

export const totalCount = () => {
    return api.get('/project/count-project')
}

export const getProjectApi = (projectPage: number) => {
    return api.get(`/project/get-project` , {
        params:{
            page:projectPage
        }
    } )
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

export const addMemberToProjectApi = (projectId: string, userId: string) => {
    return api.post(`/project/addMember/${projectId}/${userId}`,)
}

export const removeMemberToProjectApi = (projectId: string, userId: string) => {
    return api.delete(`/project/remove-member/${projectId}/${userId}`,)
}

export const singleProject = (id: string) => {
    return api.get(`/project/single-project/${id}`)
}

export const updateProjectApi = (id: string, data: UpdatePropType) => {
    return api.patch(`/project/update-project/${id}`, data)
}

export const deleteProjectApi = (id: string) => {
    return api.delete(`/project/delete-project/${id}`)
}
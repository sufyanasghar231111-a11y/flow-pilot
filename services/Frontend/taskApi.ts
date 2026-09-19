import api from "@/libs/axios/axios"

export const countApi = () =>{
    return api.get('/tasks/count-task')
}
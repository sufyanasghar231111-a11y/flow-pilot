import api from "@/libs/axios/axios"

export const totalUserApi = () =>{
    return api.get('/user/count-user')
}
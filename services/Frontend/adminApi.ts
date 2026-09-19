import api from "@/libs/axios/axios"

export const AllUser = () =>{
    return api.get('/admin/get-all-user')
}
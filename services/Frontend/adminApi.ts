import api from "@/libs/axios/axios"

export const AllUser = (userPage:number) =>{
    return api.get('/admin/get-all-user', {
        params:{
            page:userPage
        }
    })
}
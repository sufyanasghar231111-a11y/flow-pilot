import api from "@/libs/axios/axios"

export const searchInputApi = (debounce: string, searchPage: number) => {
    return api.get('/search/project-task-team', {
        params:{
            searchpage:searchPage,
            search:debounce
        }
    })
}
"use client"
import { useAuth, useLogin } from "@/contexts/authContext/AuthContext"
import { SearchData, useUserSearch } from "@/contexts/searchcontext/userSearchContext"
import { userSearchApi } from "@/services/Frontend/userApi"
import { tryCatch } from "@/utils/tryCatch"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ProjectSearchResult from "./ProjectSearchResult"
import TaskSearchResult from "./TaskSearchResult"

export default function SearchResult() {

    const { authReady } = useLogin()
    const { user } = useAuth()
    const searchParams = useSearchParams()
    const selected = searchParams.get('selected')
    const query = searchParams.get('query') || ""
    const { searchPage } = useUserSearch()
    const [result, setResult] = useState<SearchData[]>([])

    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return

        async function searchData() {
            const [res, error] = await tryCatch(userSearchApi(query, searchPage))
            if (error) {
                console.log(error);
            }
            setResult(res?.data.usersearch)
        }
        searchData()

    }, [authReady, query, searchPage, setResult, user?.role])

    const selectedOption = result ? [
        ...(result.filter(elem => elem.id === selected)),
        ...(result.filter(elem => elem.id !== selected))
    ] : result

    return (
        <div className="pt-25 pb-5 px-4 bg-[#11131D]">
            <div className="flex flex-col gap-3">

                {
                    selectedOption.map((elem) => {
                        return <div key={elem.id}>
                            {
                                elem.types === 'project' && (
                                    <ProjectSearchResult elem={elem} selected={selected} />
                                )
                            }
                            {
                                elem.types === 'task' && (
                                    <TaskSearchResult elem={elem} selected={selected} />
                                )
                            }
                        </div>
                    })
                }
            </div>
        </div>
    )
}
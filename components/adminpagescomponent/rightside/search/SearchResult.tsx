"use client"
import { useLogin } from "@/contexts/authContext/AuthContext"
import { SearchData } from "@/contexts/SearchContext"
import { useAppSelector } from "@/hooks/reduxhooks"
import { searchInputApi } from "@/services/Frontend/searchApi"
import { tryCatch } from "@/utils/tryCatch"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import ProjectResult from "./ProjectResult"
import TaskResult from "./TaskResult"
import TeamResult from "./TeamResult"
export default function SearchResult() {

    const searchParams = useSearchParams()
    const q = searchParams.get('q') || ''
    const [result, setResult] = useState<SearchData[]>([])
    const { searchPage } = useAppSelector((state) => state.searchPage)
    const selected = searchParams.get('selected')
    const { authReady } = useLogin()

    useEffect(() => {
        if (!authReady) return
        async function getSearchData() {
            const [res, err] = await tryCatch(searchInputApi(q, searchPage))

            if (err) {
                console.log(err);
            }

            setResult(res?.data.completeSearchData)
        }

        getSearchData()

    }, [authReady, q, searchPage])

    const selectedData = selected ? [
        ...(result.filter(elem => elem.id === selected)),
        ...(result.filter(elem => elem.id !== selected)),
    ] : result


    return (
        <div className="flex flex-col gap-2 pt-23 pb-6 bg-[#11131D]">
            {
                selectedData.map((elem) => {
                    return <>
                        {
                            elem.types === 'project' && (
                                <ProjectResult selected={selected ?? ''} elem={elem} />
                            )
                        }
                        {
                            elem.types === 'task' && (
                                <TaskResult elem={elem} selected={selected ?? ''} />
                            )
                        }
                        {
                            elem.types === 'team' && (
                               <TeamResult elem={elem} selected={selected ?? ''} />
                            )
                        }
                    </>
                })
            }
        </div>
    )
}
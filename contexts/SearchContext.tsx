"use client"

import { ReactNode, useContext, useEffect, useRef, useState } from "react";
import { createContext } from "react";
import { useAppSelector } from "@/hooks/reduxhooks";
import useDebounce from "@/hooks/useDebounce";
import { tryCatch } from "@/utils/tryCatch";
import { searchInputApi } from "@/services/Frontend/searchApi";
import { UpdatePropType } from "@/types/projectType";
import { SearchTeamMember } from "./teamContext/TeamContext";
import { TaskState } from "./taskContext/TaskContext";
import { useAuth, useLogin } from "./authContext/AuthContext";

export type SearchData =
    | (UpdatePropType & { types: 'project', id: UpdatePropType['id'] })
    | (SearchTeamMember & { types: 'team', id: SearchTeamMember['user']['id'] })
    | (TaskState & { types: 'task', id: TaskState['id'] })


type SearchType = {
    search: SearchData[];
    searchLoading: boolean
}

const searchprovider = createContext<SearchType | null>(null)
export default function SearchContext({ children }: { children: ReactNode }) {

    const [search, setSearch] = useState<SearchData[]>([])
    const requestRef = useRef(0)
    const cacheRef = useRef(new Map())
    const { searchInput } = useAppSelector((state) => state.searchInput)
    const { searchPage } = useAppSelector((state) => state.searchPage)
    const debounce = useDebounce(searchInput, 600)
    const { authReady } = useLogin()
    const { user } = useAuth()
    const [searchLoading, setSearchLoading] = useState(false)

    useEffect(() => {

        if (!authReady || user?.role !== 'ADMIN') return

        if (debounce.trim().toLowerCase().length < 2) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearch([])
            return
        }

        const key = `${debounce}-page-${searchPage}`

        if (cacheRef.current.has(key)) {
            const cache = cacheRef.current.get(key)
            setSearch(cache.search)
            return
        }

        setSearchLoading(true)

        const current = ++requestRef.current

        async function searchData() {

            setSearchLoading(true)

            const [res, error] = await tryCatch(searchInputApi(debounce, searchPage))

            if (current !== requestRef.current) return

            if (error) {
                console.log(error);
            }

            setSearch(res?.data.completeSearchData)

            cacheRef.current.set(key, {
                search: res?.data.completeSearchData
            })

            setSearchLoading(false)

        }

        searchData()

    }, [debounce, searchPage, authReady, user?.role])


    return (
        <searchprovider.Provider value={{ search, searchLoading }}>
            {children}
        </searchprovider.Provider>
    )
}

export const useSearch = () => {
    const context = useContext(searchprovider)

    if (!context) {
        throw new Error('searchprovider must inside useSearch')
    }

    return context
}
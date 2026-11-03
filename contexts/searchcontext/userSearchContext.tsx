"use client"
import React, { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { useAuth, useLogin } from "../authContext/AuthContext";
import { tryCatch } from "@/utils/tryCatch";
import { userSearchApi } from "@/services/Frontend/userApi";
import useDebounce from "@/hooks/useDebounce";
import { UpdatePropType } from "@/types/projectType";
import { TaskState } from "../taskContext/TaskContext";

export type projects = {
    project: UpdatePropType,
    projectId: string
}

export type SearchData =
    | (projects & { types: 'project', id: projects['projectId'] })
    | (TaskState & { types: 'task', id: TaskState['id'] })

type SearchProvider = {
    searchData: SearchData[]
    searchInput: string
    setSearchInput: React.Dispatch<React.SetStateAction<string>>
    openSearchModal: boolean
    setOpenSearchModal: React.Dispatch<React.SetStateAction<boolean>>
    searchPage: number;
    setSearchData: React.Dispatch<React.SetStateAction<SearchData[]>>
    userSearchLoader: boolean;
    
}

export const userSearchProvider = createContext<SearchProvider | null>(null)
export default function UserSearchContext({ children }: { children: ReactNode }) {

    const { authReady } = useLogin()
    const { user } = useAuth()
    const [searchData, setSearchData] = useState<SearchData[]>([])
    const [searchInput, setSearchInput] = useState('')
    const [searchPage, setSearchPage] = useState(1)
    const requestRef = useRef(0)
    const cacheRef = useRef(new Map())
    const debounce = useDebounce(searchInput, 600)
    const [openSearchModal, setOpenSearchModal] = useState(false)
    const [userSearchLoader, setUserSearchLoader] = useState(false)

    useEffect(() => {
        if (!authReady || user?.role !== 'USER') return

        if (debounce?.trim().toLowerCase().length < 2) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSearchData([])
            return
        }

        const key = `${debounce.trim().toLowerCase()}-page-${searchPage}`

        if (cacheRef.current.has(key)) {
            const data = cacheRef.current.get(key)
            setSearchData(data.searchData)
            return
        }

        const current = ++requestRef.current

        setUserSearchLoader(true)

        async function UserSearch() {

            const [res, error] = await tryCatch(userSearchApi(debounce, searchPage))

            if (current !== requestRef.current) {
                return
            }

            if (error) {
                console.log(error)
            }

            setSearchData(res?.data.usersearch)

            setUserSearchLoader(false)

            cacheRef.current.set(key, {
                searchData: res?.data.usersearch
            })



        }

        UserSearch()

    }, [authReady, debounce, searchInput, searchPage, user?.role])

    return (
        <userSearchProvider.Provider value={{ searchData, searchInput, setSearchInput, openSearchModal, setOpenSearchModal, searchPage, setSearchData, userSearchLoader }}>
            {children}
        </userSearchProvider.Provider>
    )
}

export const useUserSearch = () => {
    const context = useContext(userSearchProvider)

    if (!context) {
        throw new Error(`userSearchProvider is must inside useUser`)
    }

    return context
}
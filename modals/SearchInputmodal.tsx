"use client"

import ProjectSearch from "@/components/adminpagescomponent/rightside/search/ProjectSearch"
import TaskSearch from "@/components/adminpagescomponent/rightside/search/TaskSearch"
import TeamMemberSearch from "@/components/adminpagescomponent/rightside/search/TeamMemberSearch"
import CannotFind from "@/components/userpagecomponent/userrightside/searchcomponent/CannotFind"
import EmptySearchModal from "@/components/userpagecomponent/userrightside/searchcomponent/EmptySearchModal"
import SearchBarLoader from "@/components/userpagecomponent/userrightside/searchcomponent/SearchBarLoader"
import { SearchData, useSearch } from "@/contexts/SearchContext"
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks"
import { setSearchInput, setSearchModal } from "@/store/slices/ThemeSlice"
import { RiSearch2Line, RiSearchEyeLine } from "@remixicon/react"
import { useRouter } from "next/navigation"


export default function SearchInputModal() {

    const dispatch = useAppDispatch()
    const { searchModal } = useAppSelector((state) => state.searchModal)
    const { search, searchLoading } = useSearch()
    const { searchInput } = useAppSelector((state) => state.searchInput)

    const router = useRouter()

    function handleClick(id: string) {
        dispatch(setSearchModal(false))
        router.push(`/admin/search?selected=${encodeURIComponent(id)}&q=${searchInput}`)
        dispatch(setSearchInput(''))
    }


    return (
        <>
            {
                searchModal && (
                    <>
                        <div onClick={() => { dispatch(setSearchModal(false)) }}
                            className="fixed inset-0  z-297 bg-black/20"
                        />

                        <div className={`fixed top-17 left-77 z-[299] w-110.5 max-h-80 overflow-y-auto rounded-lg border border-white/10 bg-[#171A26] p-5 text-gray-200 shadow-2xl custom-scrollbar`}>
                            <div className=" relative">
                                {
                                    searchLoading && (

                                        <SearchBarLoader />

                                    )
                                }

                                {searchInput.trim().length > 2 && !searchLoading ? (
                                    search?.map((elem: SearchData) => {
                                        return <div onClick={() => {
                                            if (!elem.id) return
                                            handleClick(elem.id)
                                        }} key={`${elem.types}-${elem.id}`}>
                                            {
                                                elem.types === 'project' && (
                                                    <ProjectSearch elem={elem} />
                                                )
                                            }
                                            {
                                                elem.types === 'task' && (
                                                    <TaskSearch elem={elem} />
                                                )
                                            }

                                            {
                                                elem.types === 'team' && (
                                                    <TeamMemberSearch elem={elem} />
                                                )
                                            }
                                        </div>
                                    })
                                ) : (
                                    <EmptySearchModal />
                                )
                                }
                                {
                                    searchInput.trim().toLowerCase() !== '' && !searchLoading && searchInput.trim().length > 2 && search.length === 0 && (
                                        <CannotFind />
                                    )}
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
"use client"

import ProjectSearch from "@/components/adminpagescomponent/rightside/search/ProjectSearch"
import TaskSearch from "@/components/adminpagescomponent/rightside/search/TaskSearch"
import TeamMemberSearch from "@/components/adminpagescomponent/rightside/search/TeamMemberSearch"
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

                                        <div className="absolute inset-0 h-fit w-full  space-y-5 rounded-xl bg-[#171A26]">
                                            {[1, 2, 3, 4].map((item) => (

                                                <div
                                                    key={item}
                                                    className="flex w-full animate-pulse items-center justify-between gap-4"
                                                >
                                                    <div className="flex min-w-0 flex-1 items-center gap-3">
                                                        <div className="h-8 w-8 shrink-0 rounded-lg border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-indigo-500/10" />

                                                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                                                            <div className="h-2.5 w-1/3 rounded-full bg-gradient-to-r from-blue-400/50 to-indigo-400/30" />
                                                            <div className="h-2 w-4/5 rounded-full bg-gradient-to-r from-indigo-400/30 to-slate-400/10" />
                                                        </div>
                                                    </div>

                                                    <div className="h-5 w-16 shrink-0 rounded-md bg-gradient-to-r from-blue-400/20 to-indigo-400/30" />
                                                </div>

                                            ))}
                                        </div>

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
                                    <div className="flex h-50 flex-col items-center justify-center gap-3 px-4 text-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#343B52] bg-[#202638]">
                                            <RiSearch2Line className="h-6 w-6 text-blue-400" />
                                        </div>

                                        <div className="space-y-1">
                                            <h3 className="text-sm font-semibold text-white">
                                                What are you looking for?
                                            </h3>

                                            <p className="text-xs leading-5 text-gray-400">
                                                Search for projects, tasks, or team members to find what you need.
                                            </p>
                                        </div>
                                    </div>
                                )
                                }
                                {
                                    searchInput.trim().toLowerCase() !== '' && !searchLoading && searchInput.trim().length > 2 && search.length === 0 && (
                                        <div className="flex h-50 flex-col items-center justify-center gap-3 px-4 text-center">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#343B52] bg-[#202638]">
                                                <RiSearchEyeLine className="h-6 w-6 text-gray-400" />
                                            </div>

                                            <div className="space-y-1">
                                                <h3 className="text-sm font-semibold text-white">
                                                    No results found
                                                </h3>

                                                <p className="max-w-xs text-xs leading-5 text-gray-400">
                                                    We couldn&apos;t find any projects, tasks, or team members matching your search.
                                                    Try another keyword.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}
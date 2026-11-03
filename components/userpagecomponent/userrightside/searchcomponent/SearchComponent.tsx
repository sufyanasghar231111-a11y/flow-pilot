"use client"
import { useUserSearch } from "@/contexts/searchcontext/userSearchContext"
import { useRouter } from "next/navigation"
import SearchProject from "./SearchProject"
import SearchTask from "./SearchTask"
import EmptySearchModal from "./EmptySearchModal"
import CannotFind from "./CannotFind"
import SearchBarLoader from "./SearchBarLoader"

export default function SearchComponent() {

    const { openSearchModal, setOpenSearchModal, searchData, searchInput, setSearchInput, userSearchLoader } = useUserSearch()
    const router = useRouter()
    function handleClick(id: string) {
        const query = searchInput.trim()
        router.push(`/user/search?selected=${encodeURIComponent(id)}&query=${query}`)
        setOpenSearchModal(false)
        setSearchInput('')
    }

    return (
        <>
            {
                openSearchModal && (
                    <>
                        <div onClick={() => { setOpenSearchModal(false) }}
                            className="fixed inset-0  z-[290] bg-black/20"
                        />

                        <div className={`fixed top-17 left-70 z-[291] w-111.5 max-h-80 overflow-y-auto rounded-lg border border-white/10 bg-[#171A26] p-5 text-gray-200 shadow-2xl custom-scrollbar`}>
                            <div className=" relative">
                                {
                                    userSearchLoader && (
                                        <SearchBarLoader />
                                    )
                                }
                            </div>
                            {
                                searchInput.length > 1 ? (
                                    searchData?.map((elem) => {
                                        const id = elem.types === 'project' ? elem.project.id : elem.id
                                        return <div onClick={() => {
                                            if (!id) return
                                            handleClick(id)
                                        }} key={id}>
                                            {
                                                elem.types === 'project' && (
                                                    <SearchProject elem={elem} />
                                                )
                                            }
                                            {
                                                elem.types === 'task' && (
                                                    <SearchTask elem={elem} />
                                                )
                                            }
                                        </div>
                                    })
                                ) : (
                                    <EmptySearchModal />
                                )
                            }

                            {
                                searchInput.trim() !== '' && searchInput.trim().length > 2 && searchData?.length === 0 && (
                                    <CannotFind />
                                )
                            }
                        </div>
                    </>
                )
            }
        </>
    )
}
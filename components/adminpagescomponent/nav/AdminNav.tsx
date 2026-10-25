"use client"
import { useAuth } from "@/contexts/authContext/AuthContext";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxhooks";
import { setSearchInput, setSearchModal } from "@/store/slices/ThemeSlice";
import { RiMessage2Line, RiNotification2Line, RiSearch2Line } from "@remixicon/react";
import { useRouter } from "next/navigation";

export default function AdminNav() {
    const { user } = useAuth()
    const dispatch = useAppDispatch()
    const { searchInput } = useAppSelector((state) => state.searchInput)

    const router = useRouter()


    function handleSubmitSearch(e: { preventDefault: () => void; }) {
        e.preventDefault()
        const query = searchInput.trim()
        if (!query) return
        dispatch(setSearchModal(false))
        router.push(`/admin/search?q=${encodeURIComponent(query)}`)
        dispatch(setSearchInput(''))
    }

    return (
        <div className="w-[79%] h-20 bg-[#0F111A] border-b fixed right-0  border-[#252938] z-298">
            <div className=" flex items-center justify-between w-full h-full px-6 ">
                <form onSubmit={handleSubmitSearch} className="w-full" >
                    <div onClick={() => { dispatch(setSearchModal(true)) }} className="w-[53%] border flex items-center gap-3 px-3  py-3 border-[#3b4157] rounded-md">
                        <RiSearch2Line className="text-[#A1A7B8] w-5 h-5" />
                        <input value={searchInput} onChange={(elem) => { dispatch(setSearchInput(elem.target.value)) }} type="text" placeholder="Search Anthing..." className="outline-0 text-[14px] w-full" />
                    </div>
                </form>
                <div className="flex items-center gap-6 ">
                    <RiNotification2Line className="w-5 h-5 text-[#A1A7B8] hover:text-[#E5E7EB]" />
                    <RiMessage2Line className="w-5 h-5 text-[#A1A7B8] hover:text-[#E5E7EB]" />
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full overflow-hidden">
                            {
                                user?.pfp && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img key={user.pfp} src={user?.pfp} alt='admin pfp' className="w-full h-full object-cover scale-102" />
                                )
                            }
                        </div>
                        <div className="text-[13px] font-semibold">
                            <div className="text-[#dfe1e4]">{user?.username}</div>
                            <div className="text-[10px] border rounded w-fit p-0.5 border-[#223064] text-[#6366F1]">Admin</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
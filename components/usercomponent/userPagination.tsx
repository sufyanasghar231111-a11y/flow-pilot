import { useMember } from "@/contexts/memberContext/MemberContext"
import { useUser } from "@/hooks/useUser"
import { userType } from "@/types/usertype"
import { RiArrowLeftSLine, RiArrowRightSLine } from "@remixicon/react"

export default function UserPagination() {

    const { userPage, setUserPage, allUser } = useMember()
    const { userStats } = useUser()
    const total = Math.ceil(userStats.totalUser / 8)

    return (
        <div className="flex items-center justify-between px-6 py-3 border-t border-white/[0.06]">
            <button disabled={userPage === 1} onClick={() => { setUserPage(prev => prev - 1) }} className="text-xs text-gray-200 px-2 py-1 rounded bg-blue-700/60 disabled:cursor-not-allowed  disabled:opacity-45 ">
                <RiArrowLeftSLine className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
                {[1, 2, 3].map((elem, index) => {
                    return <button disabled={elem > total} key={index} onClick={() => { setUserPage(elem) }} className={`w-6 h-6 rounded-md text-xs font-medium bg-blue-700/60 disabled:opacity-55 ${userPage === elem ? 'border border-blue-500':'border-none'}  disabled:border-none  text-white`}>
                        {elem}
                    </button>

                })}

                <span className="px-1 text-xs text-gray-600">
                    …
                </span>
            </div>

            <button disabled={allUser.length < 8} onClick={() => { setUserPage(prev => prev + 1) }} className="text-xs text-gray-200 px-2 py-1 rounded bg-blue-700/60 disabled:cursor-not-allowed  disabled:opacity-45 ">
                <RiArrowRightSLine className="w-5 h-5" />
            </button>
        </div>
    )
}
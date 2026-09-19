import { useAuth } from "@/contexts/authContext/AuthContext";
import { RiMessage2Line, RiNotification2Line, RiSearch2Line } from "@remixicon/react";

export default function AdminNav() {
    const { user } = useAuth()
    return (
        <div className="w-[79%] h-20 bg-[#0F111A] border-b fixed right-0 w- border-[#252938] z-200">
            <div className=" flex items-center justify-between w-full h-full px-6 ">
                <div className="w-[43%] border flex items-center gap-3 px-3  py-3 border-[#3b4157] rounded-md">
                    <RiSearch2Line className="text-[#A1A7B8] w-5 h-5" />
                    <input type="text" placeholder="Search Anthing..." className="outline-0 text-[14px] w-full" />
                </div>
                <div className="flex items-center gap-6 ">
                    <RiNotification2Line className="w-5 h-5 text-[#A1A7B8] hover:text-[#E5E7EB]" />
                    <RiMessage2Line className="w-5 h-5 text-[#A1A7B8] hover:text-[#E5E7EB]" />
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 border rounded-full">
                            {/* <Image src={ } alt="Admin pfp" /> */}
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
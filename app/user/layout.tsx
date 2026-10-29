import UserLeftSide from "@/components/userpagecomponent/userleftside/UserLeftSide";
import { checkPageRole } from "@/libs/auth/checkPageRole";
import UserUpdateStatus from "@/modals/UserUpdateStatus";
import WarningModalForUser from "@/modals/WarningModalForUser";
import { ReactNode } from "react";

export default async function UserLayout({ children }: { children: ReactNode }) {
    await checkPageRole('USER')
    return (
        <div className=" relative w-full h-full">
            <UserUpdateStatus />
            <WarningModalForUser />

            <div className="w-full h-screen flex  relative">
                <div className="w-[19%] h-full">
                    <UserLeftSide />
                </div>
                <div className="w-[81%] h-full bg-[#11131D]">
                    {children}
                </div>
            </div>

        </div>
    )
}
import AdminLeftSide from "@/components/adminpagescomponent/leftside/AdminLeftSide";
import { checkPageRole } from "@/libs/auth/checkPageRole";
import AddMemberModal from "@/modals/AddMemberModal";
import ProjectCreationModal from "@/modals/ProjectCreationModal";
import { ReactNode } from "react";

export default async function AdminLayout({ children }: { children: ReactNode }) {
    await checkPageRole('ADMIN')
    return (
        <div className="w-full h-screen flex  relative ">

            {/* ProjectCreation modal */}
            <ProjectCreationModal />

            {/* admin can add member in project  */}
            <AddMemberModal />

            <div className="w-[21%] h-[100%]">
                <AdminLeftSide />
            </div>
            <div className="w-[79%] h-[100%] bg-[#11131D]">
                {children}
            </div>
        </div>
    )
}
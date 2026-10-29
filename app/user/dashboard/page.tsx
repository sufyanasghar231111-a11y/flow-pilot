import AllUserProjectStat from "@/components/userpagecomponent/userrightside/dashboard/AllUserProjectStat";
import DashboardHeader from "@/components/userpagecomponent/userrightside/dashboard/DashboardHeader";
import ProjectLittleDetail from "@/components/userpagecomponent/userrightside/dashboard/ProjectLittleDetail";
import UserRecentActivity from "@/components/userpagecomponent/userrightside/dashboard/UserRecentActivity";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";

export default function User() {
    return (
        <div className="w-full h-full bg-[#11131D]">
            <UserNav />
            <DashboardHeader />
            <AllUserProjectStat />
            <div className="flex gap-3 px-4 py-4 bg-[#11131D]">
            <ProjectLittleDetail />
            <UserRecentActivity />
            </div>
        </div>
    )
}
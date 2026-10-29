import AllProjectDetail from "@/components/userpagecomponent/userrightside/projects/AllProjectDetail";
import ProjectHeader from "@/components/userpagecomponent/userrightside/projects/ProjectHeader";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";

export default function MyProjects(){
    return (
        <div className="w-full h-full">
            <UserNav />
            <ProjectHeader />
            <AllProjectDetail />
        </div>
    )
}
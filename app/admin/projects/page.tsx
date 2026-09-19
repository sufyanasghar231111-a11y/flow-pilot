"use client"
import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import AllProjectDetail from "@/components/adminpagescomponent/rightside/project/AllProjectDetail";
import AllProjectStat from "@/components/adminpagescomponent/rightside/project/AllProjectStat";
import ProjectHeader from "@/components/adminpagescomponent/rightside/project/ProjectHeader";

export default function Projects() {
    return (
        <div className="w-full h-full">
            <AdminNav />
            <ProjectHeader />
            <AllProjectStat />
            <AllProjectDetail />
        </div>
    )
}
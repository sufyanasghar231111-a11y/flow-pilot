import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import AllTeamDetail from "@/components/adminpagescomponent/rightside/team/AllTeamDetail";
import TeamHeader from "@/components/adminpagescomponent/rightside/team/TeamHeader";
import TeamStats from "@/components/adminpagescomponent/rightside/team/TeamStats";

export default function Teams (){
    return (
        <div className="w-full h-full ">
            <AdminNav />
            <TeamHeader />
            <TeamStats />
            <AllTeamDetail />
        </div>
    )
}
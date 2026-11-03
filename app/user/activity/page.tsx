import ActivityHeader from "@/components/userpagecomponent/userrightside/activity/ActivityHeader";
import ActivityStats from "@/components/userpagecomponent/userrightside/activity/ActivityStats";
import CustomTab from "@/components/userpagecomponent/userrightside/activity/CustomTab";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";

export default function Activity(){
    return (
        <div className="w-full h-full">
            <UserNav />
            <ActivityHeader />
            <ActivityStats />
            <CustomTab />
        </div>
    )
}
import AllNotificationDetail from "@/components/userpagecomponent/userrightside/notification/AllNotificationDetail";
import NotificationHeader from "@/components/userpagecomponent/userrightside/notification/NotificationHeader";
import NotificationStat from "@/components/userpagecomponent/userrightside/notification/NotificationStat";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";
export default function Notification() {

    return (
        <div className="w-full h-full bg-[#11131D]">
            <UserNav />
            <NotificationHeader />
            <NotificationStat />
            <AllNotificationDetail />
        </div>
    )
}
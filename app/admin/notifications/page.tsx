import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import AllNotificationDetail from "@/components/adminpagescomponent/rightside/notification/AllNotificationDetail";
import NotificationHeader from "@/components/adminpagescomponent/rightside/notification/Notificationheader";
import NotificationRightSide from "@/components/adminpagescomponent/rightside/notification/NotificationRightSide";
import NotificationStat from "@/components/adminpagescomponent/rightside/notification/NotificationStat";

export default function Notifications() {
    return (
        <div className="w-full h-full ">
            <AdminNav />
            <NotificationHeader />
            <NotificationStat />
            <div className="flex gap-3 px-4 bg-[#11131D] pb-3">
                <AllNotificationDetail />
                <NotificationRightSide />
            </div>
        </div>
    )
}
import SettingHeader from "@/components/adminpagescomponent/rightside/settings/SettingHeader";
import SettingDetail from "@/components/userpagecomponent/userrightside/setting/SettingDetail";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";

export default function Setting() {
    return (
        <div className="w-full h-full ">
            <UserNav />
            <SettingHeader role="User" />
            <SettingDetail />
        </div>
    )
}
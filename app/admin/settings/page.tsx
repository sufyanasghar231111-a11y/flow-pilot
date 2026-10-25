import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import SettingDetail from "@/components/adminpagescomponent/rightside/settings/SettingDetail";
import SettingHeader from "@/components/adminpagescomponent/rightside/settings/SettingHeader";

export default function Settings() {
    return (
        <div className="w-full h-full">
            <AdminNav />
            <SettingHeader />
            <SettingDetail />
        </div>
    )
}
import ProfileUpdateForUser from "./ProfileUpdateForUser";
import UserGeneralSetting from "./UserGeneralSetting";

export default function SettingDetail() {
    return (
        <div className="px-4 py-3 bg-[#11131D]">
            <div className="flex  gap-3">
                <ProfileUpdateForUser />
                <UserGeneralSetting />
            </div>
        </div>
    )
}
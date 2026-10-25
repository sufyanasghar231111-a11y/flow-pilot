import GeneralSetting from "./GeneralSetting";
import UpdateProfile from "./UpdateProfile";

export default function SettingDetail() {
    return (
        <div className="px-4 pt-5 pb-2 flex gap-2 bg-[#11131D] ">
            <UpdateProfile />
            <GeneralSetting />
        </div>
    )
}
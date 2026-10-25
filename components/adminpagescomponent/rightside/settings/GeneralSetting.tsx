import ApplicationPreference from "./ApplicationPreference";
import ApplicationSetting from "./ApplicationSetting";

export default function GeneralSetting() {

    return (
        <div className="w-[55%]  mt-3 flex flex-col gap-2">
            <ApplicationSetting />
            <ApplicationPreference />
        </div>
    )
}
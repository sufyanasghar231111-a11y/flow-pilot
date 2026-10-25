import { RiSettings2Line } from "@remixicon/react";

export default function SettingHeader() {
    return (
        <div className="pt-24 px-4 ">
            <div className="flex items-center gap-3 px-1">
                <div className="w-10 h-10 rounded-lg bg-blue-600/40 border border-blue-500 flex items-center justify-center shadow-[0_0_12px_rgba(59,130,246,0.35)]">
                    <RiSettings2Line className="text-white" size={20} />
                </div>
                <div>
                    <h1 className="text-xl font-semibold">Admin Settings</h1>
                    <h1 className="text-xs text-gray-400">Manage Your account, system preferences, and application Settings</h1>
                </div>
            </div>
        </div>
    )
}
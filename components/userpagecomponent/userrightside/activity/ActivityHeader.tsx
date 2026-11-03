import { RiPulseLine } from "@remixicon/react";

export default function ActivityHeader() {
    return (
        <div className="pt-23 px-4">
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded flex items-center justify-center bg-blue-500/10">
                    <RiPulseLine className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                    <h1 className="text-2xl font-semibold text-white">My Activity</h1>
                    <p className="mt-1 text-sm text-[#7d8794]">Track your work and see your recent contributions across projects, tasks and teams.</p>
                </div>
            </div>
        </div>
    )
}
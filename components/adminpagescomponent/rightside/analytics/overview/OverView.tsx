import KeyInsight from "./KeyInsight";
import RecentActivity from "./RecentActivity";

export default function OverView() {
    return (
        <div className="px-4 pb-2 bg-[#11131D] flex gap-3 ">
            <div className="w-[45%]">
            <RecentActivity />
            </div>
            <KeyInsight />
        </div>
    )
}
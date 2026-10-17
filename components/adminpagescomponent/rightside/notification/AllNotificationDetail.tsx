
import NotificationMainDetail from "./NotificationMainDetail";
import NotificationTab from "./NotificationTab";

export default function AllNotificationDetail() {

    return (
        <div className="w-[69%] border  border-[#252938] bg-[#171A26] rounded-md py-3 h-fit">
            <div className="flex items-center gap-4 text-sm border-b border-gray-700  px-3">
                <NotificationTab />
            </div>
            <div className="px-3 py-2">
                <NotificationMainDetail />
            </div>
        </div>
    )
}
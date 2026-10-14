import { useAppSelector } from "@/hooks/reduxhooks";
import AllEventDetail from "../AllEventDetail";
import EventTabHeader from "../EventTabHeader";
import EventReport from "../EventReport";


export default function EventTab() {
    const { eventShowReport } = useAppSelector((state) => state.filterEvent)

    return (
        <div className="bg-[#11131D] w-full h-full px-4">
            <EventTabHeader />
            {
                eventShowReport ? (<div className="pb-4"><EventReport /></div>) : <AllEventDetail />
            }

        </div>
    )
}
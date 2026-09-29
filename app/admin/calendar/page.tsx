import AdminNav from "@/components/adminpagescomponent/nav/AdminNav";
import CalendarHeader from "@/components/adminpagescomponent/rightside/calendar/CalendarHeader";
import CalendarSheet from "@/components/adminpagescomponent/rightside/calendar/CalendarSheet";
import CalendarStats from "@/components/adminpagescomponent/rightside/calendar/CalendarStats";

export default function Calendar() {
    return (
        <div className="w-full h-full">
            <AdminNav />
            <CalendarHeader />
            <CalendarStats />
            <CalendarSheet />
        </div>
    )
}
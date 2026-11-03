import AllCalendarDay from "@/components/userpagecomponent/userrightside/calendar/AllCalendarDay";
import CalendarHeader from "@/components/userpagecomponent/userrightside/calendar/CalendarHeader";
import CalendarStat from "@/components/userpagecomponent/userrightside/calendar/CalendarStat";
import UserNav from "@/components/userpagecomponent/userrightside/UserNav";

export default function MyCalendar() {
    return (
        <div className="w-full h-full">
            <UserNav />
            <CalendarHeader />
            <CalendarStat />
            <AllCalendarDay />
        </div>
    )
}
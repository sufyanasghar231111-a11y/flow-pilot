import { useAppSelector } from "@/hooks/reduxhooks";
import {
    RiFolder3Line,
    RiCheckboxCircleLine,
    RiTimeLine,
    type RemixiconComponentType,
    RiCalendarEventLine,
} from "@remixicon/react";

type NotificationType = {
    id: string;
    label: string;
    total: number;
    icon: RemixiconComponentType;
    iconBg: string;
};



export default function NotificationTypes() {

    const { notificationStat } = useAppSelector((state) => state.notificationStat)

    const notificationTypes: NotificationType[] = [
        {
            id: "task-complete",
            label: "Tasks Completed",
            total: notificationStat.totalTaskComplete,
            icon: RiCheckboxCircleLine,
            iconBg: "bg-[#10B981]",
        },
        {
            id: "project-deadline",
            label: "Project Deadlines",
            total: notificationStat.totalProjectDeadline,
            icon: RiFolder3Line,
            iconBg: "bg-[#7C3AED]",
        },
        {
            id: "task-deadline",
            label: "Task Deadlines",
            total: notificationStat.totalTaskDeadline,
            icon: RiTimeLine,
            iconBg: "bg-[#F59E0B]",
        },
        {
            id: "event-reminder",
            label: "Event Reminders",
            total: notificationStat.eventReminder,
            icon: RiCalendarEventLine,
            iconBg: "bg-[#3B82F6]",
        },
    ];

    return (
        <div className="h-fit rounded-xl border border-[#252938] bg-[#171A26] p-2 sm:p-5">
            <h1 className="mb-4 text-base font-semibold text-white sm:text-lg">
                Notification Types
            </h1>

            <ul className="flex flex-col gap-1">
                {notificationTypes.map(({ id, label, total, icon: Icon, iconBg }) => (
                    <li
                        key={id}
                        className="flex items-center justify-between rounded-lg px-2 py-2 transition-colors hover:bg-[#1F2333]"
                    >
                        <div className="flex items-center gap-3">
                            <span
                                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${iconBg}`}
                            >
                                <Icon className="h-4 w-4 text-white" />
                            </span>
                            <span className="text-sm font-medium text-white">{label}</span>
                        </div>
                        <span className="text-sm font-semibold text-white">{total}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
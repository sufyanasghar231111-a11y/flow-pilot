"use client"
import { useEvent } from "@/contexts/eventcontext/EventContext";
import { useProject } from "@/hooks/useProject";
import { RiAlarmWarningFill, RiCalendarEventFill, RiTeamFill, RiUser3Fill } from "@remixicon/react";

export default function EventStats() {
    const { eventStat } = useEvent()
    const { getProject } = useProject()

    const deadLinData = getProject.filter(elem => elem.deadline).length


    const data = [
        {
            name: 'Total Events',
            total: eventStat.totalEvent,
            icon: RiCalendarEventFill,
            new: eventStat.newEvent,
            text: 'text-blue-500',
            hover: 'hover:border-blue-500/30 hover:bg-blue-500/5',
            month: 'new this month'
        },
        {
            name: 'Project Meetings',
            total: eventStat.totalProjectMeeting,
            icon: RiTeamFill,
            new: eventStat.newProjectMeeting,
            text: 'text-violet-500',
            hover: 'hover:border-violet-500/30 hover:bg-violet-500/5',
            month: 'new this month'
        },
        {
            name: 'Deadlines',
            total: eventStat.totalDeadLine,
            icon: RiAlarmWarningFill,
            new: eventStat.newDeadline,
            text: 'text-rose-500',
            hover: 'hover:border-rose-500/30 hover:bg-rose-500/5',
            month: 'new this month'
        },
        {
            name: 'Personal Meetings',
            total: eventStat.totalPersonalMeeting,
            icon: RiUser3Fill,
            new: eventStat.newPersonalMeeting,
            text: 'text-emerald-500',
            hover: 'hover:border-emerald-500/30 hover:bg-emerald-500/5',
            month: 'new this month'
        },
    ]
    return data
}
import { TZDate } from "@date-fns/tz";
import { isSameDay } from "date-fns";

type TimeType = {
    time: string | Date | null
}

type TimeAgoProps = {
    time: Date | string | null;
    timeZone: string;
    dateFormat: string
};

type TimeInHourProps = {
    time: Date | string | number;
    timeZone: string;
};


export function TimeAgo({ time }: TimeType) {
    if (!time) return

    const date = new Date(time)

    const format = date.toLocaleDateString('en', {
        month: "short",
        day: 'numeric',
        year: 'numeric',
        timeZone: 'UTC'
    })

    return format
}


export function TimeZone({ time, timeZone, dateFormat }: TimeAgoProps) {
    // if (!time || !timeZone) return
    if(!time) return
    const data = new Date(time)

    const format = new Intl.DateTimeFormat("en-GB", {
        day: '2-digit',
        month: '2-digit',
        year: "numeric",
        timeZone
    }).formatToParts(data)

    const day = format.find(p => p.type === 'day')?.value ?? ""
    const month = format.find(p => p.type === 'month')?.value ?? ""
    const year = format.find(p => p.type === 'year')?.value ?? ""

    switch (dateFormat) {
        case "DD/MM/YYYY":
            return `${day}-${month}-${year}`;

        case 'MM/DD/YYYY':
            return `${month}-${day}-${year}`;

        case 'DD-MMM-YYYY':
            {
                const monthName = new Intl.DateTimeFormat("en-GB", {
                    month: "short",
                    timeZone
                }).format(data)

                return `${day}-${monthName}-${year}`
            }

        case 'MMM DD, YYYY': {
            const monthName = new Intl.DateTimeFormat('en-GB', {
                month: 'short',
            }).format(data)

            return `${monthName} ${day}, ${year}`
        }

        case 'YYYY-MM-DD':
        default:
            return `${year}-${month}-${day}`
    }

}

export function IsEventOnDay(eventDate: string | Date | number, calendarDate: Date, timeZone: string) {
    const event = new TZDate(new Date(eventDate), timeZone)

    const day = new TZDate(calendarDate.getFullYear(), calendarDate.getMonth(), calendarDate.getDate(), timeZone)

    return isSameDay(event, day)
}

export function TimeInHour({ time, timeZone }: TimeInHourProps) {
    const now = new Date(time)
    const format = new Intl.DateTimeFormat("en-GB",
        {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone
        }
    ).format(now)

    return format
}
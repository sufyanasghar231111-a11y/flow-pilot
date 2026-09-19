
type TimeType = {
    time: string
}

export function TimeAgo({ time }: TimeType) {
    const date = new Date(time)

    const format = date.toLocaleDateString('en', {
        month:"short",
        day:'numeric',
        year:'numeric',
        timeZone:'UTC'
    })

    return format
}
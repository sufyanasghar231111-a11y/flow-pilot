
type TimeType = {
    time: string | Date | null
}

export function TimeAgo({ time }: TimeType) {
    if(!time) return
    
    const date = new Date(time)

    const format = date.toLocaleDateString('en', {
        month:"short",
        day:'numeric',
        year:'numeric',
        timeZone:'UTC'
    })

    return format
}
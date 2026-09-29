import api from "@/libs/axios/axios"
import { EventTypeState } from "@/types/eventType"

export const countEventStats = () => {
    return api.get('/events/count-event')
}

export const getAllEvent = () => {
    return api.get('/events/get-event')
}

export const getSingleEventApi = (eventid: string) => {
    return api.get(`/events/single-event/${eventid}`)
}

export const updateEventApi = (eventid: string, userid: string) => {
    return api.post(`/events/create-event-member/${eventid}/${userid}`)
}

export const removeEventApi = (eventid: string, userid: string) => {
    return api.delete(`/events/remove-member/${eventid}/${userid}`)
}

export const createEventApi = (data: EventTypeState) => {
    return api.post(`/events/create-event`, data)
}
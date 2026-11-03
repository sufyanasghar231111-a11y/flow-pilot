import { allMarkApi, getAllNotificationApi, singleDeleteNotificationApi, singleMarkNotificationApi } from "@/services/Frontend/userNotificationApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUserNotificationThunk = createAsyncThunk(
    '/user.notification/get',
    async ({ type, startDate, endDate, page }: { type: string, startDate: string, endDate: string, page:number }) => {
        const res = await getAllNotificationApi(type, startDate, endDate, page)
        return res.data
    }
)

export const markAllNotificationThunk = createAsyncThunk(
    '/user.notification/mark-all',
    async () => {
        const res = await allMarkApi()
        return res.data.markAllRead
    }
)

export const singleMarkThunk = createAsyncThunk(
    '/user.notification/getsingle',
    async (id: string) => {
        const res = await singleMarkNotificationApi(id)
        return res.data.singleMark
    }
)

export const deleteThunk = createAsyncThunk(
    '/user.notification/deletesingle',
    async (id: string) => {
        const res = await singleDeleteNotificationApi(id)
        return res.data.deleteSingle
    }
)
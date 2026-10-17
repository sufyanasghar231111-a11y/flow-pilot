import { deleteSingleApi, getNotification, markAllApi, markSingleApi, statApi } from "@/services/Frontend/notificationApi";
import { monthCompare } from "@/services/Frontend/reportsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const reportCompareThunk = createAsyncThunk(
    '/reports/last-month',
    async () => {
        const res = await monthCompare()
        return res.data
    }
)

export const notificationStat = createAsyncThunk(
    '/notification/last-week-compare',
    async () => {
        const res = await statApi()
        return res.data
    }
)

export const notificationAdmin = createAsyncThunk(
    '/notification/admin',
    async ({ type, startDate, endDate, page }: { type: string, startDate: string, endDate: string, page: number }) => {
        const res = await getNotification(type, startDate, endDate, page)
        return res.data.getNotification
    }
)

export const markAll = createAsyncThunk(
    '/notification/mark',
    async () => {
        const res = await markAllApi()
        return res.data.getNotification
    }
)

export const markSingle = createAsyncThunk(
    '/notification/singlemark',
    async (notificationid: string) => {
        const res = await markSingleApi(notificationid)
        return res.data.singleMark
    }
)

export const deleteSingle = createAsyncThunk(
    '/notification/deletemark',
    async (notificationid: string) => {
        const res = await deleteSingleApi(notificationid)
        return res.data.singleDelete
    }
)
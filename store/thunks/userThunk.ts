import { getEventApi, recentActivityApi, singleTaskApi, updateTaskApi, userSearchApi } from "@/services/Frontend/userApi";
import { totalStatApi, userAllDataApi } from "@/services/Frontend/userApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const totalStatThunk = createAsyncThunk(
    '/user/totalStat',
    async () => {
        const res = await totalStatApi()
        return res.data
    }
)

export const totalUserData = createAsyncThunk(
    '/user-all/user-all-project-task',
    async ({ pagination, toDoPagination, progressPagination, reviewPagination, donePagination }: { pagination: number, toDoPagination: number, progressPagination: number, reviewPagination: number, donePagination: number }) => {
        const res = await userAllDataApi(pagination, toDoPagination, progressPagination, reviewPagination, donePagination)
        return res.data
    }
)

export const recentActivity = createAsyncThunk(
    '/user-all/recent-activity',
    async (loadMoreData: number) => {
        const res = await recentActivityApi(loadMoreData)
        return res.data
    }
)

export const taskUpdate = createAsyncThunk(
    '/user-all/update-task/id',
    async ({ taskid, status }: { taskid: string, status: string }) => {
        const res = await updateTaskApi(taskid, status)
        return res.data.updateStatus
    }
)

export const singleTaskThunk = createAsyncThunk(
    '/user-all/single-task',
    async (taskid: string) => {
        const res = await singleTaskApi(taskid)
        return res.data.singleTask
    }
)
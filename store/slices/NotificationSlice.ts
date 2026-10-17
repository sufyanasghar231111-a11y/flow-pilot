import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteSingle, markAll, markSingle, notificationAdmin, notificationStat } from "../thunks/thunks";


interface NotificationInter {
    totalComparePercentage: number,
    totalUnReadComparePercentage: number,
    totalReadComparePercentage: number,
    totalTodayPercentage: number,
    totalNotification: number,
    totalread: number,
    totalunread: number,
    totaltoday: number,
    totalTaskComplete: number,
    totalProjectDeadline: number,
    totalTaskDeadline: number,
    eventReminder: number
}

export interface NotificationDetailInter {
    length?: number;
    id: string,
    type: string,
    title: string,
    message: string,
    projectId?: string | null,
    taskId?: string | null,
    eventId?: string | null,
    createdAt?: string,
    admin: {
        username: string
    },
    user: {
        username: string
    },
    isRead: boolean

}

type InitialState = {
    notificationStat: NotificationInter,
    loading: boolean,
    error: string | null,
    notificationLoading: boolean,
    notificationError: null | string,
    notificationDetail: NotificationDetailInter[];
    notificationTotal: number,
    notificationHasMore: boolean,
    notificationPage: number,
    markAllError: null | string,
    markAllLoading: boolean,
    notificationTab: string,
    notificationSingleMarkLoading: boolean,
    notificationSingleMarkError: null | string,
    notificationDeleteSingleLoading: boolean,
    notificationDeleteSingleError: null | string,
}

const initialState: InitialState = {
    notificationStat: {
        totalComparePercentage: 0,
        totalUnReadComparePercentage: 0,
        totalReadComparePercentage: 0,
        totalTodayPercentage: 0,
        totalNotification: 0,
        totalread: 0,
        totalunread: 0,
        totaltoday: 0,
        totalTaskComplete: 0,
        totalProjectDeadline: 0,
        totalTaskDeadline: 0,
        eventReminder: 0
    },
    loading: false,
    error: null,
    notificationDetail: [],
    notificationTotal: 0,
    notificationHasMore: false,
    notificationPage: 1,
    notificationLoading: false,
    notificationError: null,
    markAllError: null,
    markAllLoading: false,
    notificationTab: 'All',
    notificationSingleMarkLoading: false,
    notificationSingleMarkError: null,
    notificationDeleteSingleLoading: false,
    notificationDeleteSingleError: null,
}

export const StatSlice = createSlice({
    name: 'stat',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(notificationStat.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(notificationStat.fulfilled, (state, action) => {
                state.loading = false;
                state.notificationStat = action.payload
            })
            .addCase(notificationStat.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something went wrong"
            })
    }
})

export const notificationSlice = createSlice({
    name: 'notification-data',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        builder
            .addCase(notificationAdmin.pending, (state) => {
                state.notificationLoading = true;
                state.notificationError = null
            })
            .addCase(notificationAdmin.fulfilled, (state, action) => {
                state.notificationLoading = false;
                state.notificationDetail = action.payload
            })
            .addCase(notificationAdmin.rejected, (state, action) => {
                state.notificationLoading = false;
                state.notificationError = action.error.message ?? 'Something went wrong'
            })
            .addCase(markSingle.fulfilled, (state, action) => {
                state.notificationSingleMarkLoading = false;
                state.notificationDetail = state.notificationDetail.map(elem =>
                    elem.id === action.payload.id
                        ? { ...elem, ...action.payload } : elem
                )
            })
            .addCase(deleteSingle.fulfilled, (state, action) => {
                state.notificationDeleteSingleLoading = false;
                state.notificationDetail = state.notificationDetail.filter(elem => elem.id !== action.payload.id)
            })
    }
})

export const allReadSlice = createSlice({
    name: 'all-read',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(markAll.pending, (state) => {
                state.markAllLoading = true;
                state.markAllError = null
            })
            .addCase(markAll.fulfilled, (state) => {
                state.markAllLoading = false;
                state.notificationDetail = state.notificationDetail.map(elem => ({
                    ...elem,
                    isRead: true
                }))
            })
            .addCase(markAll.rejected, (state, action) => {
                state.markAllLoading = false;
                state.markAllError = action.error.message ?? 'Something went wrong'
            })
    }
})

export const CustomTabSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        setNotificationTab: (state, action: PayloadAction<string>) => {
            state.notificationTab = action.payload
        }
    }
})

export const MarkAsSingle = createSlice({
    name: "markAsSingle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(markSingle.pending, (state) => {
                state.notificationSingleMarkLoading = true;
                state.notificationSingleMarkError = null
            })
            .addCase(markSingle.fulfilled, (state, action) => {
                state.notificationSingleMarkLoading = false;
                state.notificationDetail = state.notificationDetail.map(elem =>
                    elem.id === action.payload.id
                        ? { ...elem, ...action.payload } : elem
                )
            })
            .addCase(markSingle.rejected, (state, action) => {
                state.notificationSingleMarkLoading = false;
                state.notificationSingleMarkError = action.error.message ?? 'Something went wrong'
            })
    }

})

export const deleteSingleSlice = createSlice({
    name: "DeleteSingle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteSingle.pending, (state) => {
                state.notificationDeleteSingleLoading = true;
                state.notificationDeleteSingleError = null
            })
            .addCase(deleteSingle.fulfilled, (state, action) => {
                state.notificationDeleteSingleLoading = false;
                state.notificationDetail = state.notificationDetail.filter(elem => elem.id !== action.payload)
            })
            .addCase(deleteSingle.rejected, (state, action) => {
                state.notificationDeleteSingleLoading = false;
                state.notificationDeleteSingleError = action.error.message ?? 'Something went wrong'
            })
    }

})

export const { setNotificationTab } = CustomTabSlice.actions
export const StatReducer = StatSlice.reducer
export const notificationReducer = notificationSlice.reducer
export const allReadReducer = allReadSlice.reducer
export const CustomTabReducer = CustomTabSlice.reducer
export const MarkAsSingleReducer = MarkAsSingle.reducer
export const deleteSingleReducer = deleteSingleSlice.reducer
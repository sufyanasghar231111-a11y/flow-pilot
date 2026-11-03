
import { createSlice } from "@reduxjs/toolkit";
import { NotificationDetailInter } from "./NotificationSlice";
import { deleteThunk, getAllUserNotificationThunk, markAllNotificationThunk, singleMarkThunk } from "../thunks/userNotificationThunk";

type NotificationType = {
    getNotification: NotificationDetailInter[];
    totalNotification: number,
    read: number,
    notRead: number,
    todayData: number,
    totalPercentage: number,
    totalReadPercentage: number,
    totalUnReadPercentage: number,
    totalTodayPercentage: number
}

type InitialState = {
    userNotification: NotificationType | null
    getNotificationLoading: boolean,
    getNotificationError: null | string;
    markAllLoading: boolean;
    markAllError: null | string;
    marksingleLoading: boolean;
    marksingleError: null | string;
    singleDeleteLoading: boolean;
    singleDeleteError: null | string;
    notificationCustomTab: string
}

const initialState: InitialState = {
    userNotification: null,
    getNotificationLoading: false,
    getNotificationError: null,
    markAllLoading: false,
    markAllError: null,
    marksingleLoading: false,
    marksingleError: null,
    singleDeleteLoading: false,
    singleDeleteError: null,
    notificationCustomTab: 'All'
}

export const getNotificationSlice = createSlice({
    name: "get-notification",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUserNotificationThunk.pending, (state) => {
                state.getNotificationLoading = true;
                state.getNotificationError = null
            })
            .addCase(getAllUserNotificationThunk.fulfilled, (state, action) => {
                state.getNotificationLoading = false;
                state.userNotification = action.payload
            })
            .addCase(getAllUserNotificationThunk.rejected, (state, action) => {
                state.getNotificationLoading = false;
                state.getNotificationError = action.error.message || 'Something Went Wrong'
            })
            .addCase(singleMarkThunk.fulfilled, (state, action) => {
                state.marksingleLoading = false;

                if (state.userNotification) {
                    state.userNotification.getNotification = state.userNotification?.getNotification.map((elem) => elem.id === action.payload.id ?
                        {
                            ...elem, ...action.payload
                        } : elem
                    )
                }
            })
            .addCase(deleteThunk.fulfilled, (state, action) => {
                state.singleDeleteLoading = false;
                if (state.userNotification) {
                    state.userNotification.getNotification = state.userNotification?.getNotification.filter((elem) => elem.id !== action.payload.id)
                }
            })
            .addCase(markAllNotificationThunk.fulfilled, (state) => {
                state.markAllLoading = false;
                if (state.userNotification) {
                    state.userNotification.getNotification = state.userNotification?.getNotification.map((elem) => ({
                        ...elem,
                        isRead: true
                    }))
                }
            })
    }
})

export const markAllReadSlice = createSlice({
    name: 'mark-all-read',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(markAllNotificationThunk.pending, (state) => {
                state.markAllLoading = true;
                state.markAllError = null
            })
            .addCase(markAllNotificationThunk.fulfilled, (state) => {
                state.markAllLoading = false;
                if (state.userNotification) {
                    state.userNotification.getNotification = state.userNotification?.getNotification.map((elem) => ({
                        ...elem,
                        isRead: true
                    }))
                }
            })
            .addCase(markAllNotificationThunk.rejected, (state, action) => {
                state.markAllLoading = false;
                state.markAllError = action.error.message || 'Something Went Wrong'
            })
    }
})

export const singleMarkSlice = createSlice({
    name: 'single-mark-read',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(singleMarkThunk.pending, (state) => {
                state.marksingleLoading = true;
                state.marksingleError = null
            })
            .addCase(singleMarkThunk.fulfilled, (state, action) => {
                state.marksingleLoading = false;
                if (state.userNotification) {
                    state.userNotification.getNotification = state.userNotification?.getNotification.map((elem) =>
                        elem.id === action.payload.id ?
                            {
                                ...elem, ...action.payload
                            } : elem
                    )
                }
            })
            .addCase(singleMarkThunk.rejected, (state, action) => {
                state.marksingleLoading = false;
                state.marksingleError = action.error.message || 'Something Went Wrong'
            })
    }
})

export const deleteSingleSlice = createSlice({
    name: 'single-mark-read',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deleteThunk.pending, (state) => {
                state.singleDeleteLoading = true;
                state.singleDeleteError = null
            })
            .addCase(deleteThunk.fulfilled, (state, action) => {
                state.singleDeleteLoading = false;
                if (state.userNotification) {
                    state.userNotification.getNotification = state.userNotification?.getNotification.filter((elem) => elem.id !== action.payload.id)
                }
            })
            .addCase(deleteThunk.rejected, (state, action) => {
                state.singleDeleteLoading = false;
                state.singleDeleteError = action.error.message || 'Something Went Wrong'
            })
    }
})

export const notificationTabSlice = createSlice(
    {
        name: "notification-tab",
        initialState,
        reducers: {
            setNotificationCustomTab: (state, action) => {
                state.notificationCustomTab = action.payload
            }
        }
    }
)

export const { setNotificationCustomTab } = notificationTabSlice.actions
export const getNotificationReducer = getNotificationSlice.reducer
export const markAllReadReducer = markAllReadSlice.reducer
export const singleMarkReducer = singleMarkSlice.reducer
export const deleteSingleNotificationReducer = deleteSingleSlice.reducer
export const notificationTabReducer = notificationTabSlice.reducer
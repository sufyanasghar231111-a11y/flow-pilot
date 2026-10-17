"use client"
import { configureStore } from "@reduxjs/toolkit";
import recentReducer from '@/store/slices/RecentSlice'
import weeklyReducer from '@/store/slices/WeeklySlice'
import { comparisonReducer, customTabReducer, filterEventReducer, filterReducer, filterTaskReducer, filterTeamReducer, showReportReducer, taskShowReducer, teamShowReducer } from "./slices/reportSlice";
import { allReadReducer, CustomTabReducer, deleteSingleReducer, MarkAsSingleReducer, notificationReducer, StatReducer } from "./slices/NotificationSlice";

export const store = configureStore({
    reducer: {
        recent: recentReducer,
        weekly: weeklyReducer,
        comparison: comparisonReducer,
        customTab: customTabReducer,
        filterData: filterReducer,
        showReport: showReportReducer,
        filterTask: filterTaskReducer,
        showTaskReport: taskShowReducer,
        filterTeam: filterTeamReducer,
        showTeamReport: teamShowReducer,
        filterEvent: filterEventReducer,
        notificationStat: StatReducer,
        notificationDetail: notificationReducer,
        allRead: allReadReducer,
        notificationTab: CustomTabReducer,
        markSingle: MarkAsSingleReducer,
        deleteSingle: deleteSingleReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
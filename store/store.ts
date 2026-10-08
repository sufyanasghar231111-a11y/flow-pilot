"use client"
import { configureStore } from "@reduxjs/toolkit";
import recentReducer from '@/store/slices/RecentSlice'
import weeklyReducer from '@/store/slices/WeeklySlice'

export const store = configureStore({
    reducer: {
        recent: recentReducer,
        weekly: weeklyReducer
    }
})

export type AppStore = typeof store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
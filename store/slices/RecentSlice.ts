"use client"
import { createSlice } from "@reduxjs/toolkit";
import { recentThunk } from "../thunks/recentThunk";
import { RecentType } from "@/types/RecentDataType";


export interface DataType {
    types: RecentType,
    data: string,
    name: string,
    username: {
        user: {
            username: string
        }
    },
    user:string
}

export interface RecentData {
    recentData: DataType[],
    loading: boolean,
    error: string | null
}

const initialState: RecentData = {
    recentData: [],
    loading: false,
    error: null
}

const recentReducer = createSlice({
    name: 'recentFetch',
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            .addCase(recentThunk.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(recentThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.recentData = action.payload
            })
            .addCase(recentThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something Went Wrong";
            })
    }, 

})

export default recentReducer.reducer
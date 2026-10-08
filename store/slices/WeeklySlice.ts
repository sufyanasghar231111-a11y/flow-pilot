import { createSlice } from "@reduxjs/toolkit"
import { weeklyThunks } from "../thunks/weeklyThunk"

type ActivityResponse = {
    completedResult: Record<string, number>
    createdResult: Record<string, number>
}

interface RecentInter {
    weekly: ActivityResponse
    loading: boolean,
    error: string | null
}

const initialState: RecentInter = {
    weekly: {
        completedResult: {},
        createdResult: {}
    },
    loading: false,
    error: null
}

const weeklyReducer = createSlice({
    name: "weekly",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(weeklyThunks.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(weeklyThunks.fulfilled, (state, action) => {
                state.loading = false;
                state.weekly = action.payload
            })
            .addCase(weeklyThunks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Something Went Wrong"
            })
    }
})


export default weeklyReducer.reducer
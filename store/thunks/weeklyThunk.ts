import { weekActivityApi } from "@/services/Frontend/analyticsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const weeklyThunks = createAsyncThunk(
    '/analytics/week-activity',
    async () => {
        const res = await weekActivityApi()
        return res.data
    }
)
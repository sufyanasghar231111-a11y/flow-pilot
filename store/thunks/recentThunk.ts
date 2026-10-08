import { recentActivityApi } from "@/services/Frontend/analyticsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const recentThunk = createAsyncThunk(
    '/analytics/recent-activity',
    async () => {
        const response = await recentActivityApi()

        return response.data.activities
    }
)
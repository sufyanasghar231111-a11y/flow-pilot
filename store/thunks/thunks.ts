import { monthCompare } from "@/services/Frontend/reportsApi";
import { createAsyncThunk } from "@reduxjs/toolkit";



export const reportCompareThunk = createAsyncThunk(
    '/reports/last-month',
    async() =>{
        const res = await monthCompare()
        return res.data
    }
)
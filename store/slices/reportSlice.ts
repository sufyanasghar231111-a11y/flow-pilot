import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reportCompareThunk } from "../thunks/thunks";
import { ReportPage } from "@/contexts/projectContext/ProjectContext";
import { act } from "react";

interface State {
    percentageProject: number,
    percentageTask: number,
    percentageTeam: number,
    taskCompleted: number,
    projectCompleted: number
}

interface Percentage {
    lastMonth: State,
    loading: boolean,
    error: string | null,
}


const initialState: Percentage = {
    lastMonth: {
        percentageProject: 0,
        percentageTask: 0,
        percentageTeam: 0,
        taskCompleted: 0,
        projectCompleted: 0
    },
    loading: false,
    error: null,
}


export const comparisonSlice = createSlice({
    name: "lastMonth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(reportCompareThunk.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(reportCompareThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.lastMonth = action.payload;
            })
            .addCase(reportCompareThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Something Went Wrong'
            })
    }
})

export const TabSlice = createSlice({
    name: 'custom-tab',
    initialState: {
        customTab: 'overview'
    },
    reducers: {
        setCustomTab: (state, action: PayloadAction<string>) => {
            state.customTab = action.payload
        }
    }
})

export const filterSlice = createSlice({
    name: 'status',
    initialState: {
        status: 'All',
        startDate: '',
        endDate: ''
    },
    reducers: {
        setStatus: (state, action: PayloadAction<string>) => {
            state.status = action.payload
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.startDate = action.payload
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.endDate = action.payload
        },
    }
})

export const showReportSlice = createSlice({
    name: 'showreport',
    initialState: {
        showReport: false
    },
    reducers: {
        setShowReport: (state, action: PayloadAction<boolean>) => {
            state.showReport = action.payload
        }
    }
})

export const filterTaskSlice = createSlice({
    name: 'filter Task',
    initialState: {
        taskStatus: 'All',
        priority: 'All',
        startTaskDate: '',
        endTaskDate: '',
    },
    reducers: {
        setTaskStatus: (state, action: PayloadAction<string>) => {
            state.taskStatus = action.payload
        },
        setPriority: (state, action: PayloadAction<string>) => {
            state.priority = action.payload
        },
        setStartTaskDate: (state, action: PayloadAction<string>) => {
            state.startTaskDate = action.payload
        },
        setEndTaskDate: (state, action: PayloadAction<string>) => {
            state.endTaskDate = action.payload
        },
    }
})

export const taskShowReport = createSlice({
    name: 'show-task-report',
    initialState: {
        showTaskReport: false
    },
    reducers: {
        setShowTaskReport: (state, action: PayloadAction<boolean>) => {
            state.showTaskReport = action.payload
        }
    }
})

export const filterTeamSlice = createSlice({
    name: 'team slice',
    initialState: {
        teamStartDate: '',
        teamEndDate: '',
    },
    reducers: {
        setTeamStartDate: (state, action: PayloadAction<string>) => {
            state.teamStartDate = action.payload
        },
        setTeamEndDate: (state, action: PayloadAction<string>) => {
            state.teamEndDate = action.payload
        }
    }
})

export const teamShowReport = createSlice({
    name: 'team-show',
    initialState: {
        showTeamReport: false
    },
    reducers: {
        setShowTeamReport: (state, action: PayloadAction<boolean>) => {
            state.showTeamReport = action.payload
        }
    }
})

export const filterEventSlice = createSlice({
    name: "eventslice",
    initialState: {
        type: "All",
        eventstartDate: '',
        eventendDate: '',
        eventShowReport: false
    },
    reducers: {
        setType: (state, action: PayloadAction<string>) => {
            state.type = action.payload
        },
        setEventstartDate: (state, action: PayloadAction<string>) => {
            state.eventstartDate = action.payload
        },
        setEventendDate: (state, action: PayloadAction<string>) => {
            state.eventendDate = action.payload
        },
        setEventShowReport: (state, action: PayloadAction<boolean>) => {
            state.eventShowReport = action.payload
        }
    }
})

export const { setCustomTab } = TabSlice.actions
export const { setStatus, setStartDate, setEndDate } = filterSlice.actions
export const { setShowReport } = showReportSlice.actions
export const { setTaskStatus, setPriority, setStartTaskDate, setEndTaskDate } = filterTaskSlice.actions
export const { setShowTaskReport } = taskShowReport.actions
export const { setTeamEndDate, setTeamStartDate } = filterTeamSlice.actions
export const { setShowTeamReport } = teamShowReport.actions
export const { setType, setEventendDate, setEventstartDate, setEventShowReport } = filterEventSlice.actions

export const customTabReducer = TabSlice.reducer
export const comparisonReducer = comparisonSlice.reducer
export const filterReducer = filterSlice.reducer
export const showReportReducer = showReportSlice.reducer
export const filterTaskReducer = filterTaskSlice.reducer
export const taskShowReducer = taskShowReport.reducer
export const filterTeamReducer = filterTeamSlice.reducer
export const teamShowReducer = teamShowReport.reducer
export const filterEventReducer = filterEventSlice.reducer
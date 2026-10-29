import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { recentActivity, singleTaskThunk, taskUpdate, totalStatThunk, totalUserData } from "../thunks/userThunk"
import { UpdatePropType } from "@/types/projectType"
import { Status, TaskState } from "@/contexts/taskContext/TaskContext"

interface TotalStat {
    totalProject: number,
    taskAssign: number,
    pendingTask: number,
    taskCompleted: number,
    totalActive: number,
    totalComplete: number,
    totalPending: number,
    newMonthProject: number,
    newTask: number,
    newPendingTask: number,
    newCompletedTask: number
}

type ProjectResponse = {
    project: UpdatePropType
}

export type AllDetail = {
    project: ProjectResponse[]
    taskTodo: TaskState[],
    taskInProgress: TaskState[],
    taskReview: TaskState[],
    taskDone: TaskState[]
}

interface Recent {
    types: string,
    date: string,
    name: string,
    id: string
}

interface InitialState {
    totalStat: TotalStat,
    statLoading: boolean,
    staterror: null | string,
    allDetail: AllDetail | null,
    allDataLoading: boolean,
    allDataError: null | string,
    recentActivity: Recent[],
    recentLoading: boolean,
    recentError: null | string,
    updateTaskLoading: boolean,
    updateTaskError: null | string
    updateModal: boolean,
    singleTaskData: TaskState | null;
    singleTaskLoading: boolean,
    singleTaskError: string | null
}

const initialState: InitialState = {
    totalStat: {
        totalProject: 0,
        taskAssign: 0,
        pendingTask: 0,
        taskCompleted: 0,
        totalActive: 0,
        totalComplete: 0,
        totalPending: 0,
        newMonthProject: 0,
        newTask: 0,
        newPendingTask: 0,
        newCompletedTask: 0
    },
    statLoading: false,
    staterror: null,
    allDetail: null,
    allDataLoading: false,
    allDataError: null,
    recentActivity: [],
    recentLoading: false,
    recentError: null,
    updateTaskLoading: false,
    updateTaskError: null,
    updateModal: false,
    singleTaskData: null,
    singleTaskLoading: false,
    singleTaskError: null
}

export const totalStat = createSlice({
    name: "totalStat",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(totalStatThunk.pending, (state) => {
                state.statLoading = true;
                state.staterror = null
            })
            .addCase(totalStatThunk.fulfilled, (state, action) => {
                state.statLoading = false;
                state.totalStat = action.payload
            })
            .addCase(totalStatThunk.rejected, (state, action) => {
                state.statLoading = false;
                state.staterror = action.error.message ?? 'Something Went Wrong'
            })
    }
})

export const userAllData = createSlice({
    name: 'user-all',
    initialState,
    reducers: {
        moveTask: (state, action: PayloadAction<{ taskid: string, status: string }>) => {
            if (!state.allDetail) return

            const { taskid, status } = action.payload

            const taskArrays = [
                state.allDetail.taskTodo,
                state.allDetail.taskInProgress,
                state.allDetail.taskReview,
                state.allDetail.taskDone,
            ]

            let foundTask: TaskState | undefined

            for (const tasks of taskArrays) {
                const index = tasks.findIndex(elem => elem.id === taskid)

                if (index !== -1) {
                    foundTask = tasks.splice(index, 1)[0]
                }
            }

            if (!foundTask) return

            const updateTask = {
                ...foundTask,
                status: status as Status
            }

            switch (status) {
                case 'TODO':
                    state.allDetail.taskTodo.push(updateTask)
                    break

                case 'IN_PROGRESS':
                    state.allDetail.taskInProgress.push(updateTask)
                    break

                case 'REVIEW':
                    state.allDetail.taskReview.push(updateTask)
                    break

                case 'DONE':
                    state.allDetail.taskDone.push(updateTask)
                    break
            }

        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalUserData.pending, (state) => {
                state.allDataLoading = true;
                state.allDataError = null
            })
            .addCase(totalUserData.fulfilled, (state, action) => {
                state.allDataLoading = false;
                state.allDetail = action.payload;
            })
            .addCase(totalUserData.rejected, (state, action) => {
                state.allDataLoading = false;
                state.allDataError = action.error.message ?? 'Something went wrong'
            })
            .addCase(taskUpdate.fulfilled, (state, action) => {
                const { taskid, status } = action.meta.arg

                if (!state.allDetail) return

                const taskArray = [
                    state.allDetail.taskTodo,
                    state.allDetail.taskInProgress,
                    state.allDetail.taskReview,
                    state.allDetail.taskDone,
                ]

                let foundTask: TaskState | undefined

                for (const task of taskArray) {

                    const index = task.findIndex(elem => elem.id === taskid)
                    if (index !== -1) {
                        foundTask = task.splice(index, 1)[0]
                        break
                    }

                }

                if (!foundTask) return

                const updateTask = {
                    ...foundTask,
                    status: status as Status
                }

                switch (status) {
                    case 'TODO':
                        state.allDetail.taskTodo.push(updateTask);
                        break

                    case 'IN_PROGRESS':
                        state.allDetail.taskInProgress.push(updateTask);
                        break

                    case "REVIEW":
                        state.allDetail.taskReview.push(updateTask);
                        break

                    case 'DONE':
                        state.allDetail.taskDone.push(updateTask);
                        break
                }

            })
    }
})

export const recentActivitySlice = createSlice({
    name: "recent-activity",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(recentActivity.pending, (state) => {
                state.recentLoading = true;
                state.recentError = null
            })
            .addCase(recentActivity.fulfilled, (state, action) => {
                state.recentLoading = false;
                state.recentActivity = action.payload
            })
            .addCase(recentActivity.rejected, (state, action) => {
                state.recentLoading = false;
                state.recentError = action.error.message ?? 'Something Went Wrong'
            })
    }
})

export const updateTaskSlice = createSlice({
    name: 'update-task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(taskUpdate.pending, (state) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                state.updateTaskLoading = true,
                    state.updateTaskError = null
            })
            .addCase(taskUpdate.fulfilled, (state, action) => {
                state.updateTaskLoading = false;
            })
            .addCase(taskUpdate.rejected, (state, action) => {
                // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                state.updateTaskLoading = false,
                    state.updateTaskError = action.error.message || 'Something Went Wrong'
            })
    }
})

export const updateModalSlice = createSlice({
    name: 'update-modal',
    initialState,
    reducers: {
        setUpdateModal: (state, action) => {
            state.updateModal = action.payload
        }
    }
})

export const singleTaskSlice = createSlice({
    name: 'single-task',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(singleTaskThunk.pending, (state) => {
                state.singleTaskLoading = true;
                state.singleTaskError = null
            })
            .addCase(singleTaskThunk.fulfilled, (state, action) => {
                state.singleTaskLoading = false;
                state.singleTaskData = action.payload
            })
            .addCase(singleTaskThunk.rejected, (state, action) => {
                state.singleTaskLoading = false;
                state.singleTaskError = action.error.message || 'Something went wrong'
            })
    }
})

export const { moveTask } = userAllData.actions
export const { setUpdateModal } = updateModalSlice.actions
export const totalStatReducer = totalStat.reducer
export const userAllDataReducer = userAllData.reducer
export const recentActivityReducer = recentActivitySlice.reducer
export const updateTaskReducer = updateTaskSlice.reducer
export const updateModalReducer = updateModalSlice.reducer
export const singleTaskReducer = singleTaskSlice.reducer
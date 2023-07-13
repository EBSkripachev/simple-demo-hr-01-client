import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksByTimeSheetId, deleteTask, createTask, updateTask } from "../http/taskAPI";
import DatesUtils from "../utils/DatesUtils";

export const fetchTasksThunk = createAsyncThunk(
    'tasks/fetchTasksThunk',
    async function(timeSheetId, {rejectWithValue}) {
        try {
            return await fetchTasksByTimeSheetId(timeSheetId)
        } catch (e) {
            return rejectWithValue(e.message)
        }
    
    }
)

export const deleteTaskThunk = createAsyncThunk(
    'tasks/deleteTaskThunk',
    async function(id, {rejectWithValue, dispatch}) {
        try {
            await deleteTask(id)
            dispatch(deleteTaskSlice(id))
            return id
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

export const createTaskThunk = createAsyncThunk(
    'tasks/createTaskThunk',
    async function(task, {rejectWithValue, dispatch}) {
        try {
            const newTask = await createTask(task)
            dispatch(createTaskSlice(newTask))
            return newTask
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)


export const updateTaskThunk = createAsyncThunk(
    'tasks/updateTaskThunk',
    async function(task, {rejectWithValue, dispatch}) {
        try {
            const newTask = await updateTask(task)
            dispatch(updateTaskSlice(newTask))
            return newTask
        } catch (e) {
            return rejectWithValue(e.message)
        }
    }
)

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        tasks: [],
        status: null,
        error: null,
        date: null,
        year: null,
        month: null,
        week: [],
        weekIndex: null,
        monthMap: [],
    },
    reducers: {
        createTaskSlice(state, action) {
            state.tasks.push(action.payload)
        },
        updateTaskSlice(state, action) {
            state.tasks = state.tasks.map(task => task.id === action.payload.id ? action.payload : task)
        },
        deleteTaskSlice(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        selectDate(state, action) {
            const weekIndex = DatesUtils.getWeekIndex(state.monthMap, action.payload)
            if (state.weekIndex !== weekIndex && weekIndex !== null) {
                state.weekIndex = weekIndex
                state.week = state.monthMap[state.weekIndex]
            }

            state.date = DatesUtils.toString(action.payload)

        },
        selectWeek(state, action) {
            if (state.weekIndex !== action.payload && action.payload) {
                state.weekIndex = action.payload
                state.week = state.monthMap[action.payload]
            }

        },
        createMonthMap(state, action) {
            state.monthMap = DatesUtils.getMonthMapDates(action.payload.year, action.payload.month)
        },
        setPeriod(state, action) {
            state.year = action.payload.year
            state.month = action.payload.month
        }
    },

    extraReducers: (builder) => {
        builder
        .addCase(fetchTasksThunk.pending, (state, action) => {
            state.status = 'pending'
            state.error = null
        })
        .addCase(fetchTasksThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled'
            state.tasks = action.payload
        })
        .addCase(fetchTasksThunk.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload  
        })
        .addCase(deleteTaskThunk.pending, (state, action) => {
            state.status = 'pending'
            state.error = null
        })
        .addCase(deleteTaskThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled'
        })
        .addCase(deleteTaskThunk.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload  
        })
        .addCase(createTaskThunk.pending, (state, action) => {
            state.status = 'pending'
            state.error = null
        })
        .addCase(createTaskThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled'
        })
        .addCase(createTaskThunk.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload  
        })
        .addCase(updateTaskThunk.pending, (state, action) => {
            state.status = 'pending'
            state.error = null
        })
        .addCase(updateTaskThunk.fulfilled, (state, action) => {
            state.status = 'fulfilled'
        })
        .addCase(updateTaskThunk.rejected, (state, action) => {
            state.status = 'rejected'
            state.error = action.payload  
        })
    }
})

export const {createTaskSlice, updateTaskSlice, deleteTaskSlice, selectDate, createMonthMap, selectWeek, setPeriod} = taskSlice.actions
export default taskSlice.reducer
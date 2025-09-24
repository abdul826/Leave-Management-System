import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { addLeaveData, applyLeaveApi, employeeLeaveApi, fetchAllLeaveData, fetchIndianLeaveAPi, updateLeaveData } from '../../../API/LeaveApis/leaveApis';
import toast from 'react-hot-toast';

export const fetchAllLeave = createAsyncThunk('fetchLeave',async(thunkApi)=>{
    try {
        const response = await fetchAllLeaveData();
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        return thunkApi.rejectWithValue('error');
    }
});

export const addLeave = createAsyncThunk('addLeave', async(data)=>{
    try {
        const response = await addLeaveData(data);
        if(response.status === 201){
            return response.data;
        }else{
            toast.error(response.response.data)
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
});

export const updateLeaveStatus = createAsyncThunk("updateLeaveStatus", async (data) => {
  try {
    const response = await updateLeaveData(data);
    if(response.status === 200){
        return response.data
    }else{
        toast.error(response.response.data)
    }
  } catch (error) {
    toast.error(error);
    console.log(error);
  }
//   return response.data.updatedLeave;
});

export const deleteLeave = createAsyncThunk('deleteLeave', async(data)=>{
    try {
        const response = await deleteLeaveData(data);
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
});

// Apply Leave -- used by Employee
export const applyLeave = createAsyncThunk("applyLeave", async (data) => {
    // console.log(" =>", data);
    
  try {
    const response = await applyLeaveApi(data.submissionData,data.config);
    // console.log("Response=>", response);
    
    if(response.status === 201){
        return response.data
    }else{
        toast.error(response.response.data)
    }
  } catch (error) {
    toast.error(error);
    console.log(error);
  }
//   return response.data.updatedLeave;
});

// Employee Leave -- used by Employee
export const employeeLeave = createAsyncThunk("applyLeave", async () => {
  try {
    const response = await employeeLeaveApi();
    console.log(response);
    
    if(response.status === 200){
        return response.data
    }else{
        toast.error(response.response.data)
    }
  } catch (error) {
    toast.error(error);
    console.log(error);
  }
//   return response.data.updatedLeave;
});

export const fetchIndianLeave = createAsyncThunk('fetchIndianLeave',async(thunkApi)=>{
    try {
        const response = await fetchIndianLeaveAPi();
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        return thunkApi.rejectWithValue('error');
    }
});

export const LeaveSlice = createSlice({
    name:'leave',
    initialState:{
        leaveData:[],
        addLeave:[],
        deleteLeave:[],
        updateLeave:[],
        appLeave:[],
        empLeave:[],
        indianLeave:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        // Fetch LEave 
        .addCase(fetchAllLeave.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchAllLeave.fulfilled,(state,action)=>{
            state.loading = false,
            state.leaveData= [action.payload];
        })
        .addCase(fetchAllLeave.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Add Leave 
        .addCase(addLeave.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addLeave.fulfilled,(state,action)=>{
            state.loading = false,
            state.addLeave= action.payload;
        })
        .addCase(addLeave.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Delete Leave
        .addCase(deleteLeave.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteLeave.fulfilled,(state,action)=>{
            state.loading = false,
            state.deleteLeave = [action.payload];
        })
        .addCase(deleteLeave.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Update Leave Status
        .addCase(updateLeaveStatus.pending,(state)=>{
            state.loading = true;
        })
        .addCase(updateLeaveStatus.fulfilled,(state,action)=>{
            state.loading = false,
            state.updateLeaveStatus = [action.payload];
        })
        .addCase(updateLeaveStatus.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Apply Leave 
        .addCase(applyLeave.pending,(state)=>{
            state.loading = true;
        })
        .addCase(applyLeave.fulfilled,(state,action)=>{
            state.loading = false,
            state.appLeave= action.payload;
        })
        .addCase(applyLeave.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // EMployee fetch Leave 
        .addCase(employeeLeave.pending,(state)=>{
            state.loading = true;
        })
        .addCase(employeeLeave.fulfilled,(state,action)=>{
            state.loading = false,
            state.empLeave= action.payload;
        })
        .addCase(employeeLeave.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
        // Indian LEave
        .addCase(fetchIndianLeave.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchIndianLeave.fulfilled,(state,action)=>{
            state.loading = false,
            state.indianLeave= [action.payload];
        })
        .addCase(fetchIndianLeave.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export default LeaveSlice.reducer;

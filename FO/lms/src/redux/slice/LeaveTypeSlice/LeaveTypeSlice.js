import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllLeaveTypeData, addLeaveTypeData, deleteLeaveTypeData } from '../../../API/LeaveTypeApis/leaveTypeApi';
import toast from 'react-hot-toast';

export const fetchAllLeaveType = createAsyncThunk('fetchLeaveType',async(thunkApi)=>{
    try {
        const response = await fetchAllLeaveTypeData();
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        return thunkApi.rejectWithValue('error');
    }
});

export const addLeaveType = createAsyncThunk('addLeaveType', async(data)=>{
    try {
        const response = await addLeaveTypeData(data);
        if(response.status === 201){
            return response.data;
        }else{
            toast.error(response.response.data)
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
})

export const deleteLeaveType = createAsyncThunk('deleteLeaveType', async(data)=>{
    console.log(data);
    
    try {
        const response = await deleteLeaveTypeData(data);
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
})

export const LeaveTypeSlice = createSlice({
    name:'leaveType',
    initialState:{
        leaveTypeData:[],
        addLeaveType:[],
        deleteLeaveType:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        // Fetch LEave Type
        .addCase(fetchAllLeaveType.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchAllLeaveType.fulfilled,(state,action)=>{
            state.loading = false,
            state.leaveTypeData= [action.payload];
        })
        .addCase(fetchAllLeaveType.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Add Leave Type
        .addCase(addLeaveType.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addLeaveType.fulfilled,(state,action)=>{
            state.loading = false,
            state.addLeaveType= action.payload;
        })
        .addCase(addLeaveType.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Delete LeaveType
        .addCase(deleteLeaveType.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteLeaveType.fulfilled,(state,action)=>{
            state.loading = false,
            state.deleteLeaveType = [action.payload];
        })
        .addCase(deleteLeaveType.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export default LeaveTypeSlice.reducer;

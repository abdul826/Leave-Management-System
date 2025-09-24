import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { addDepartmentData, deleteDepartmentData, fetchAllDepartment } from '../../../API/DepartmentApis/departmentApi';
import toast from 'react-hot-toast';

export const fetchDepartment = createAsyncThunk('fetchDepartment',async(thunkApi)=>{
    try {
        const response = await fetchAllDepartment();
        // console.log("Response =>", response);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue('error');
    }
});

export const addDepartment = createAsyncThunk('addDepartment', async(data)=>{
    console.log(data);
    
    try {
        const response = await addDepartmentData(data);
        if(response.status === 200){
            toast.success("Department added Successfully");
            return response.data;
        }else{
            toast.error("Department not added");
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
})

export const deleteDepartment = createAsyncThunk('deleteDepartment', async(data)=>{
    try {
        const response = await deleteDepartmentData(data);
        if(response.status === 200){
            return response.data;
        }else{
            toast.error("Department not deleted");
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
})

export const DepartmentSlice = createSlice({
    name:'department',
    initialState:{
        departmentData:[],
        addDep:[],
        deleteDep:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        // Fetch Department
        .addCase(fetchDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchDepartment.fulfilled,(state,action)=>{
            state.loading = false,
            state.departmentData= [action.payload];
        })
        .addCase(fetchDepartment.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Add Department
        .addCase(addDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addDepartment.fulfilled,(state,action)=>{
            state.loading = false,
            state.addDep= action.payload;
        })
        .addCase(addDepartment.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Delete Department
        .addCase(deleteDepartment.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteDepartment.fulfilled,(state,action)=>{
            state.loading = false,
            state.deleteDep = [action.payload];
        })
        .addCase(deleteDepartment.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export default DepartmentSlice.reducer;

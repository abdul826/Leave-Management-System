import {createSlice,createAsyncThunk } from '@reduxjs/toolkit';
import { addEmployeeData, deleteEmployeeData, fetchAllEmployee } from '../../../API/EmployeeApis/EmployeeApis';
import toast from 'react-hot-toast';

export const fetchEmployee = createAsyncThunk('fetchEmployee',async(thunkApi)=>{
    try {
        const response = await fetchAllEmployee();
        if(response.status === 200){
            return response.data;
        }else{
            return response;
        }
        
    } catch (error) {
        return thunkApi.rejectWithValue('error');
    }
});

export const addEmployee = createAsyncThunk('addEmployee', async(data)=>{
    try {
        const response = await addEmployeeData(data);
        if(response.status === 201){
            return response.data;
        }else{
            toast.error("Employee not added");
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
})

export const deleteEmployee = createAsyncThunk('deleteEmployee', async(id)=>{
    try {
        const response = await deleteEmployeeData(id);
        if(response.status === 200){
            return response.data;
        }else{
            toast.error("Employee not deleted");
        }
    } catch (error) {
        toast.error(error);
        console.log(error);
    }
})

export const EmployeeSlice = createSlice({
    name:'Employee',
    initialState:{
        EmpData:[],
        addEmp:[],
        deleteEmp:[],
        loading:false,
        error:null
    },
    extraReducers:(builder)=>{
        builder
        // Fetch Employee
        .addCase(fetchEmployee.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchEmployee.fulfilled,(state,action)=>{
            state.loading = false,
            state.EmpData= [action.payload];
        })
        .addCase(fetchEmployee.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Add Employee
        .addCase(addEmployee.pending,(state)=>{
            state.loading = true;
        })
        .addCase(addEmployee.fulfilled,(state,action)=>{
            state.loading = false,
            state.addEmp= action.payload;
        })
        .addCase(addEmployee.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })

        // Delete Employee
        .addCase(deleteEmployee.pending,(state)=>{
            state.loading = true;
        })
        .addCase(deleteEmployee.fulfilled,(state,action)=>{
            state.loading = false,
            state.deleteEmp = [action.payload];
        })
        .addCase(deleteEmployee.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload;
        })
    }
});


export default EmployeeSlice.reducer;
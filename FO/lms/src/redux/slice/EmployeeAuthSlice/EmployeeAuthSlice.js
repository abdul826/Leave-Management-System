import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { EmployeeLoginApi, EmployeeverifyApi } from '../../../API/EmployeeAuthApis/employeeAuthAPis';

let employeeLogoutTimer;

// Admin Login
export const EmployeeAuthLogin = createAsyncThunk("EmployeeLogin", async(data)=>{
    try {
        const response = await EmployeeLoginApi(data);
        // console.log();
        
        if(response.status === 200){
            toast.success("Employee Login Successfully!");
            localStorage.setItem('EmployeeToken', response.data.message.token);
            return response.data;
        }else{
            toast.error("Employee Error While Login");
        }
    } catch (error) {
        throw error
    }
});

// Employee Verify API
// In verification we don't send any value so instead of data we use thunkAPi which return object
// If any error occurs we can set that error in thunkApi
export const verifyEmployee = createAsyncThunk('EmployeeVerify', async(_,thunkApi)=>{
    try {
        const response = await EmployeeverifyApi();
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
        // Properly extract message
        const message = error?.response?.data?.message || 'Token Expired';
        return thunkApi.rejectWithValue(message);
        // return thunkApi.rejectWithValue('error');
    }
});

// Create Reducer and Action
export const EmployeeAuthSlice = createSlice({
    name:"EmployeeAuthSlice",
    initialState:{
        employeeLogin:[],
        employeeVerifyData:[],
        loading:false,
        error:null
    },
    reducers: {
            employeeLogout: (state) => {
            state.employeeLogin = [];
            state.employeeVerifyData = [];
            state.loading = false;
            state.error = null;
            localStorage.removeItem('EmployeeToken');
    
            if (employeeLogoutTimer) clearTimeout(employeeLogoutTimer);
            }
        },
    extraReducers:(builder)=>{  // extraReducer give callback which is builder
        // Employee Login
        builder
        .addCase(EmployeeAuthLogin.pending,(state)=>{   // when we have to perform 1 work then use addCase for multiple use add matcher
            state.loading = true
        })
        .addCase(EmployeeAuthLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.employeeLogin = action.payload   // In EmployeeAuthLogin we return the data which comes in action.payload and assign to redux state
        })
        .addCase(EmployeeAuthLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload    // If error comes EmployeeAuthLogin function return error which is handle by action.payload
        })

        // Employee Verify
        .addCase(verifyEmployee.pending,(state)=>{   
            state.loading = true
        })
        .addCase(verifyEmployee.fulfilled,(state,action)=>{
            state.loading = false;
            state.employeeVerifyData = [action.payload]    // we get Employee data in array
        })
        .addCase(verifyEmployee.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


    }
});

export const { employeeLogout } = EmployeeAuthSlice.actions;
export default EmployeeAuthSlice.reducer;
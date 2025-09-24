import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import { adminLoginApi, adminverifyApi } from '../../../API/AdminApis/adminapi';
import toast from 'react-hot-toast';

let adminLogoutTimer;

// Admin Login
export const AdminAuthLogin = createAsyncThunk("AdminLogin", async(data)=>{
    try {
        const response = await adminLoginApi(data);
        // console.log();
        
        if(response.status === 200){
            toast.success("Admin Login Successfully!");
            localStorage.setItem('adminToken', response.data.message.token);
            return response.data;
        }else{
            toast.error("Admin Error While Login");
        }
    } catch (error) {
        throw error
    }
});

// Admin Verify API
// In verification we don't send any value so instead of data we use thunkAPi which return object
// If any error occurs we can set that error in thunkApi
export const AdminVerifyApi = createAsyncThunk('AdminVerify', async(_,thunkApi)=>{
    try {
        const response = await adminverifyApi();
        if(response.status === 200){
            return response.data;
        }
    } catch (error) {
         // Properly extract message
        const message = error?.response?.data?.message || 'Token Expired';
        return thunkApi.rejectWithValue(message);
        // return thunkApi.rejectWithValue('error');
    }
})

// Create Reducer and Action
export const AdminSlice = createSlice({
    name:"AdminSlice",
    initialState:{
        adminLogin:[],
        adminVerifyData:[],
        loading:false,
        error:null
    },
    reducers: {
        adminLogout: (state) => {
        state.adminLogin = [];
        state.adminVerifyData = [];
        state.loading = false;
        state.error = null;
        localStorage.removeItem('adminToken');

        if (adminLogoutTimer) clearTimeout(adminLogoutTimer);
        }
    },
    extraReducers:(builder)=>{  // extraReducer give callback which is builder
        // Admin Login
        builder
        .addCase(AdminAuthLogin.pending,(state)=>{   // when we have to perform 1 work then use addCase for multiple use add matcher
            state.loading = true
        })
        .addCase(AdminAuthLogin.fulfilled,(state,action)=>{
            state.loading = false;
            state.adminLogin = action.payload   // In AdminAuthLogin we return the data which comes in action.payload and assign to redux state
        })
        .addCase(AdminAuthLogin.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload    // If error comes AdminAuthLogin function return error which is handle by action.payload
        })

        // ADmin Verify
        .addCase(AdminVerifyApi.pending,(state)=>{   
            state.loading = true
        })
        .addCase(AdminVerifyApi.fulfilled,(state,action)=>{
            state.loading = false;
            state.adminVerifyData = [action.payload]    // we get admin data in array
        })
        .addCase(AdminVerifyApi.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.payload
        })


    }
});

export const { adminLogout } = AdminSlice.actions;
export default AdminSlice.reducer;
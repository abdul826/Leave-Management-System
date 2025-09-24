import { configureStore } from "@reduxjs/toolkit";
import AdminSlice  from "../slice/AdminAuthSlice/AdminSlice";
import { DepartmentSlice } from "../slice/DepartmentSlice/DepartmentSLice";
import LeaveTypeSlice  from "../slice/LeaveTypeSlice/LeaveTypeSlice";
import { LeaveSlice } from "../slice/LeaveSlice/LeaveSlice";
import EmployeeAuthSlice from "../slice/EmployeeAuthSlice/EmployeeAuthSlice";

const store = configureStore({
    reducer:{
        Admin:AdminSlice,
        Department:DepartmentSlice,
        LeaveType:LeaveTypeSlice,
        Leave:LeaveSlice,
        Employee:EmployeeAuthSlice
    }
});

export default store;
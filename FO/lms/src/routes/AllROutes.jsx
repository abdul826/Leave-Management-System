import React from 'react'
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout';
import Dashboard from '../pages/Admin/Dashboard';
import Department from '../pages/Admin/Department';
import LeaveType from '../pages/Admin/LeaveType';
import Employee from '../pages/Admin/Employee';
import Leave from '../pages/Admin/LEave';
import UserLayout from '../components/Layout/UserLayout';
import UserProfile from '../pages/User/UserProfile';
import UserLeaveList from '../pages/User/UserLeaveList';
import ApplyLeaveForm from '../pages/User/ApplyLeaveForm';
import LoginForm from '../pages/Auth/LoginForm';
import Register from '../pages/Auth/Register';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmployee } from '../redux/slice/EmployeeAuthSlice/EmployeeAuthSlice';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';

const AllROutes = () => {
    
    return (
        <>
            <Routes>
                {/* Auth Page */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<LoginForm />} />

                {/* Admin Section */}
                <Route path="/admin" element={
                    <ProtectedRoute role='admin'>
                        <AdminLayout />
                    </ProtectedRoute>
                    }>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="departments" element={<Department />} />
                    <Route path="leave-types" element={<LeaveType />} />
                    <Route path="employees" element={<Employee />} />
                    <Route path="leaves" element={<Leave />} />
                </Route>

                {/* User Section */}
                <Route path="/user" element={
                    <ProtectedRoute role='user'>
                        <UserLayout />
                    </ProtectedRoute>
                    }>
                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route path="/user/leaves" element={<UserLeaveList />} />
                    <Route path="apply-leave" element={<ApplyLeaveForm />} /> 
                </Route>

            </Routes>
        </>
    )
}

export default AllROutes
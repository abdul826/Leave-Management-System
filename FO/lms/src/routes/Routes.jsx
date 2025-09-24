import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from '../components/Layout/AdminLayout.jsx';
import Department from '../pages/Admin/Department.jsx';

const MYRoutes = () => {
  return (
    <Routes>
      {/* Auth Pages */}
      {/* <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} /> */}

      {/* Admin Section */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="departments" element={<Department />} />
        {/* <Route path="leave-types" element={<LeaveType />} />
        <Route path="employees" element={<Employees />} />
        <Route path="leaves" element={<LeaveList />} /> */}
      </Route>

      {/* User Section */}
      {/* <Route path="/user" element={<UserLayout />}>
        <Route path="apply-leave" element={<ApplyLeave />} /> */}
      {/* </Route> */}

      {/* Catch-all */}
      {/* <Route path="*" element={<div>404 - Page Not Found</div>} /> */}
    </Routes>
  )
}

export default MYRoutes
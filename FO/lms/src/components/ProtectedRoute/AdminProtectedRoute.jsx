import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const AdminProtectedRoute = ({children,role}) => {
    const navigate = useNavigate()

    const checkAdminValid = ()=>{
        const adminLogin = localStorage.getItem('adminToken');
        const employeeLogin = localStorage.getItem('EmployeeToken');


        if(!adminLogin && role === 'admin'){
            toast.error("Please admin Login to access the resource")
            navigate('/login');
        }else if(!employeeLogin && role === 'user'){
            toast.error("Please Login to access the resource")
            navigate('/login');
        }
    }

    useEffect(()=>{
        checkAdminValid()
    },[]);

    return children
}

export default AdminProtectedRoute
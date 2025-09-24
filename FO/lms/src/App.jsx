import { useEffect } from 'react';
import './App.css'
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import AllROutes from './routes/AllROutes';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { adminLogout } from './redux/slice/AdminAuthSlice/AdminSlice';
import { AdminVerifyApi } from './redux/slice/AdminAuthSlice/AdminSlice';
import { employeeLogout, verifyEmployee } from './redux/slice/EmployeeAuthSlice/EmployeeAuthSlice';

function AppWrapper() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');
  const isUserRoute = location.pathname.startsWith('/user');

  const verifyToken = async () => {
    try {
      if (isAdminRoute) {
        await dispatch(AdminVerifyApi()).unwrap();
      } else if (isUserRoute) {
         await dispatch(verifyEmployee()).unwrap();
      }
    } catch (error) {
      if (
        error === 'Token Expired' ||
        error === 'Unauthorized' ||
        error === 'Invalid Token' ||
        error === 'error'
      ) {
        if (isAdminRoute) {
          dispatch(adminLogout());
          localStorage.removeItem('adminToken');
        } else if (isUserRoute) {
          dispatch(employeeLogout());
          localStorage.removeItem('EmployeeToken');
        }
        toast.error('Session expired. Please login again.');
        navigate('/login');
      }
    }
  };

  useEffect(() => {
    verifyToken();
  }, [location.pathname]); // verify token on route change

  return <AllROutes />;
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
      <Toaster />
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Button, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AdminVerifyApi } from '../../redux/slice/AdminAuthSlice/AdminSlice';
import toast from 'react-hot-toast';

const AdminLayout = () => {
  const {adminVerifyData} = useSelector((state)=> state.Admin);
  
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminVerify = ()=>{
    dispatch(AdminVerifyApi())
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    toast.success("Admin Logout Successfully");
    navigate('/login');
  };

  useEffect(()=>{
    adminVerify();
  },[]);

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand={false} className="px-3">
        <Button 
          variant="outline-light" 
          onClick={() => setShowSidebar(true)} 
          className="me-2"
        >
          &#9776;
        </Button>
        <Navbar.Brand href="#">LMS Admin Panel - {adminVerifyData[0]?.verifyAdmin.name}</Navbar.Brand>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Navbar>

      {/* Sidebar Offcanvas */}
      <Offcanvas 
        show={showSidebar} 
        onHide={() => setShowSidebar(false)} 
        backdrop={true}
        scroll={false}
        className="bg-dark text-white"
      >
        <Offcanvas.Header closeButton closeVariant="white">
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <NavLink 
              to="/admin/dashboard" 
              end 
              className={({ isActive }) => 
                'nav-link text-white ' + (isActive ? 'active bg-primary rounded' : '')
              }
              onClick={() => setShowSidebar(false)}
            >
              Dashboard
            </NavLink>

            <NavLink 
              to="/admin/departments" 
              className={({ isActive }) => 
                'nav-link text-white ' + (isActive ? 'active bg-primary rounded' : '')
              }
              onClick={() => setShowSidebar(false)}
            >
              Departments
            </NavLink>

            <NavLink 
              to="/admin/leave-types" 
              className={({ isActive }) => 
                'nav-link text-white ' + (isActive ? 'active bg-primary rounded' : '')
              }
              onClick={() => setShowSidebar(false)}
            >
              Leave Types
            </NavLink>

            <NavLink 
              to="/admin/employees" 
              className={({ isActive }) => 
                'nav-link text-white ' + (isActive ? 'active bg-primary rounded' : '')
              }
              onClick={() => setShowSidebar(false)}
            >
              Employees
            </NavLink>

            <NavLink 
              to="/admin/leaves" 
              className={({ isActive }) => 
                'nav-link text-white ' + (isActive ? 'active bg-primary rounded' : '')
              }
              onClick={() => setShowSidebar(false)}
            >
              Leaves
            </NavLink>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main content area */}
      <main style={{ padding: '1rem', marginTop: '56px' }}>
        <Container fluid>
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default AdminLayout;

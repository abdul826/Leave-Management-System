import React, { useEffect } from 'react';
import { Container, Nav, Navbar, Row, Col, Button } from 'react-bootstrap';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {verifyEmployee } from '../../redux/slice/EmployeeAuthSlice/EmployeeAuthSlice';
import toast from 'react-hot-toast';

const UserLayout = () => {
  const employeeData = useSelector((state)=>state.Employee.employeeVerifyData[0]?.verifyEmployee);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyEmployeeData = ()=>{
    dispatch(verifyEmployee());
  }

  const handleLogout = () => {
    localStorage.removeItem('EmployeeToken');
    toast.success("Admin Logout Successfully");
    navigate('/login');
  };

  useEffect(()=>{
    verifyEmployeeData();
  },[]);

  return (
    <>
      {/* Top Navbar */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/user">LMS - Welcome - {employeeData?.name}</Navbar.Brand>
          <Navbar.Toggle aria-controls="user-navbar" />
          <Navbar.Collapse id="user-navbar">
            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/user/profile">Profile</Nav.Link>
              <Nav.Link as={NavLink} to={`/user/leaves`}>My Leaves</Nav.Link>
              <Nav.Link as={NavLink} to="/user/apply-leave">Apply Leave</Nav.Link>
              <Navbar.Collapse className="justify-content-end">
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container fluid className="mt-4">
        <Row>
          <Col>
            {/* This is where child routes will render */}
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserLayout;

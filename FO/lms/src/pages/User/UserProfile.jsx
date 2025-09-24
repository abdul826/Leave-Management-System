import React, { useEffect } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmployee } from '../../redux/slice/EmployeeAuthSlice/EmployeeAuthSlice';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const employeeData = useSelector((state)=>state.Employee.employeeVerifyData[0]?.verifyEmployee);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const verifyEmployeeData = ()=>{
    dispatch(verifyEmployee());
  }

  useEffect(()=>{
    verifyEmployeeData()
  },[]);
  
  return (
    <Container className="mt-4">
      <h2>User Profile</h2>
      <Card className="mt-3">
        <Card.Body>
          <Row>
            <Col md={6}>
              <p><strong>Name:</strong> {employeeData?.name}</p>
              <p><strong>Email:</strong> {employeeData?.email}</p>
            </Col>
            <Col md={6}>
              <p><strong>Department:</strong> {employeeData?.departmentId}</p>
              <p><strong>Leave Balance:</strong> {employeeData?.leave_balance}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;

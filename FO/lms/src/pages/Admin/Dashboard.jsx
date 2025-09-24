import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { fetchDepartment } from '../../redux/slice/DepartmentSlice/DepartmentSLice';
import { fetchEmployee } from '../../redux/slice/EmployeeSlice/EmployeeSlice';
import { fetchAllLeaveType } from '../../redux/slice/LeaveTypeSlice/LeaveTypeSlice';
import { fetchAllLeave } from '../../redux/slice/LeaveSlice/LeaveSlice';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [employeeData, setEmployeeData] = useState('');
  const [departmentData, setDepartmentData] = useState('');
  const [leaveTypeData, setLeaveTypeData] = useState('');
  const [leaveData, setLeaveData] = useState('');

  useEffect(() => {
    const fetchCounts = () => {
      dispatch(fetchDepartment()).then((res) => {        
        if (res.payload !== 'undefined') {
          setDepartmentData(res.payload.getDepartment.length);
        }
      }).catch((err) => {
        toast.error(err);
      })

      dispatch(fetchEmployee()).then((res) => {
        if (res.payload !== 'undefined') {
          setEmployeeData(res.payload.getAllEmp.length);
        }
      }).catch((err) => {
        toast.error(err);
      });

      dispatch(fetchAllLeaveType()).then((res) => {
        if (res.payload !== 'undefined') {
          setLeaveTypeData(res.payload.length)
        }
      }).catch((err) => {
        toast.error(err);
      });

      dispatch(fetchAllLeave()).then((res) => {
        // console.log(res.payload);
        
        if(res.payload){
          const allLeaves = res.payload;

          const pendingCount = allLeaves.filter(
            (leave) => leave.leave_status === 'Pending'
          ).length;

          const approvedCount = allLeaves.filter(
            (leave) => leave.leave_status === 'Approved'
          ).length;

          setLeaveData({ pending: pendingCount, approved: approvedCount });
          // setLeaveData(res.payload)
        }
      }).catch((err) => {
        console.log(err);
        toast.error("Error While Fetching Leave.");
      })
    };

    fetchCounts();
  }, []);
  
  return (
    <Container className="mt-4">
      <h2>Admin Dashboard</h2>
      <Row className="mt-4">
        <Col md={3}>
          <Card bg="primary" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Departments</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{departmentData}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="success" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Total Employees</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{employeeData}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="warning" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Pending Leaves</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{leaveData.pending}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="info" text="white" className="mb-3">
            <Card.Body>
              <Card.Title>Approved Leaves</Card.Title>
              <Card.Text style={{ fontSize: '2rem' }}>{leaveData.approved}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;

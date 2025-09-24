import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { employeeLeave, fetchIndianLeave } from '../../redux/slice/LeaveSlice/LeaveSlice';
import toast from 'react-hot-toast';

// Static Indian Holidays for example
const indianHolidays = [
  { name: 'Republic Day', date: '2025-01-26' },
  { name: 'Holi', date: '2025-03-14' },
  { name: 'Good Friday', date: '2025-04-18' },
  { name: 'Independence Day', date: '2025-08-15' },
  { name: 'Gandhi Jayanti', date: '2025-10-02' },
  { name: 'Diwali', date: '2025-10-21' },
  { name: 'Christmas', date: '2025-12-25' },
];

const UserLeaveList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [empLeave, setEmpLeave] = useState([]);
  const [indianLeave, setIndianLeave] = useState([]);

  const fetchEmployeeLeave = () => {
    dispatch(employeeLeave())
      .then((res) => {
        if (res.payload !== 'undefined') {
          setEmpLeave(res.payload);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err);
      });
  };

  const fetchAllIndianHoliday = ()=>{
    dispatch(fetchIndianLeave()).then((res)=>{
      console.log(res);
      
      if(res.payload !=='undefined'){
        setIndianLeave(res.payload.holidays);
      }
    }).catch((err)=>{
      console.log(err);
      toast.error(err);
    })
  }

  useEffect(() => {
    fetchEmployeeLeave();
    fetchAllIndianHoliday();
  }, []);
  

  return (
    <Container className="mt-4">
      <Row>
        {/* Left: Leave List (col-8) */}
        <Col md={8}>
          <Card>
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">My Leaves</h5>
                <Button size="sm" onClick={() => navigate('/user/apply-leave')}>
                  Apply for Leave
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Leave Type</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {empLeave?.map((leave, ind) => (
                    <tr key={leave._id}>
                      <td>{ind + 1}</td>
                      <td>{leave.leaveTypeId?.leave_type || 'N/A'}</td>
                      <td>{leave.leave_from}</td>
                      <td>{leave.leave_to}</td>
                      <td>{leave.leave_status}</td>
                    </tr>
                  ))}
                  {empLeave?.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No leave records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        {/* Right: Indian Holidays (col-4) */}
        <Col md={4}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Indian Holidays - 2025</h5>
            </Card.Header>
            <Card.Body>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Holiday</th>
                  </tr>
                </thead>
                <tbody>
                  {indianLeave?.map((holiday, idx) => (
                    <tr key={idx}>
                      <td>{holiday.date}</td>
                      <td>{holiday.name}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default UserLeaveList;

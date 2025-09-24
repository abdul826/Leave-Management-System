import React, { useEffect, useState } from 'react';
import { Container, Table, Dropdown, ButtonGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { fetchAllLeave, updateLeaveStatus } from '../../redux/slice/LeaveSlice/LeaveSlice';

const Leave = () => {
  const dispatch = useDispatch();

  const [leaves, setLeaves] = useState([]);

  // Handler to update leave status
  const handleStatusChange = (id, newStatus) => {
    console.log("ID=> ", id);
    console.log('Status => ', newStatus)
    
    let data ={
      id :id,
      status:newStatus
    };

    dispatch(updateLeaveStatus(data)) // ✅ correct usage
    .then((res) => {
      if (res.payload) {
        toast.success("Leave Status Updated Successfully");
        fetchLeave(); // Refresh data
      }
    })
    .catch((err) => {
      toast.error("Error updating leave status");
      console.error(err);
    });
    
  };

  const fetchLeave = ()=>{
    dispatch(fetchAllLeave()).then((res)=>{
      if(res.payload){
        setLeaves(res.payload);
      }
    }).catch((err)=>{
      console.log(err);
      toast.error("Error While Fetching Leave.");
    })
  }

  useEffect(()=>{
    fetchLeave();
  },[]);

  return (
    <Container className="mt-4">
      <h2>Employee Leaves</h2>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Employee</th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {leaves?.map((leave,ind) => (
            <tr key={leave._id}>
              <td>{ind}</td>
              <td>{leave.empId.name}</td>
              <td>{leave.leaveTypeId? leave.leaveTypeId.leave_type:''}</td>
              <td>{new Date(leave.leave_from).toLocaleDateString()}</td>
              <td>{new Date(leave.leave_to).toLocaleDateString()}</td>
              <td>
                <Dropdown as={ButtonGroup}>
                  <Button variant={
                    leave.leave_status === 'Approved' ? 'success' :
                    leave.leave_status === 'Rejected' ? 'danger' : 'secondary'
                  }>
                    {leave.leave_status}
                  </Button>

                  <Dropdown.Toggle split variant={
                    leave.leave_status === 'Approved' ? 'success' :
                    leave.leave_status === 'Rejected' ? 'danger' : 'secondary'
                  } id={`dropdown-split-${leave._id}`} />

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleStatusChange(leave._id, 'Approved')}>
                      Approve
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleStatusChange(leave._id, 'Rejected')}>
                      Reject
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            </tr>
          ))}
          {leaves.length === 0 && (
            <tr>
              <td colSpan="6" className="text-center">No leaves found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Leave;

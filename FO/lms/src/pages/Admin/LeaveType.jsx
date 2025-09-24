import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { addLeaveType, deleteLeaveType, fetchAllLeaveType } from '../../redux/slice/LeaveTypeSlice/LeaveTypeSlice';

const LeaveType = () => {
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newLeaveType, setNewLeaveType] = useState('');
  const [leaveError, setLeaveError] = useState('');
  const dispatch = useDispatch();

  // Add Leave
  const handleAddLeaveType = (e) => {
    e.preventDefault();

    if (newLeaveType.trim() === ''){
      setLeaveError("Leave Type is required");
      return;
    } else{
    const data = {
        leave_type: newLeaveType.trim(),
    };
    dispatch(addLeaveType(data)).then((res)=>{
      if(res.payload.newLeaveType){
        toast.success(res.payload.message);
          fetchAllLeaveTypeData();
      }
    }).catch((err)=>{
      toast.error("Leave Type not added");
    })
    setNewLeaveType('');
    setShowModal(false);
    }
  };

  // Delete Leave
  const handleDelete = (id) => {
    dispatch(deleteLeaveType(id)).then((res)=>{
      if(res.payload !== 'undefined'){
        toast.success("Leave Type Deleted Successfully");
        fetchAllLeaveTypeData();
      }
    }).catch((err)=>{
      toast.error(err);
    })
  };

  // Fetch All Leave Type
  const fetchAllLeaveTypeData = async()=>{
    dispatch(fetchAllLeaveType()).then((res)=>{
      if(res.payload){
        setLeaveTypes(res.payload)
      }
    }).catch((err)=>{
      console.log(err);
    });
  }

  useEffect(()=>{
    fetchAllLeaveTypeData();
  },[]);
  

  return (
    <Container className="mt-4">
      <h2>Leave Types</h2>
      <Button variant="primary" onClick={() => setShowModal(true)} className="mb-3">
        Add Leave Type
      </Button>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Leave Type Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveTypes?.map((type,ind) => (
            <tr key={type._id}>
              <td>{ind+1}</td>
              <td>{type.leave_type}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(type._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {leaveTypes.length === 0 && (
            <tr>
              <td colSpan="3" className="text-center">No leave types found.</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Add Leave Type Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Leave Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="leaveTypeName">
              <Form.Label>Leave Type Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter leave type"
                value={newLeaveType}
                onChange={(e) =>{
                    setNewLeaveType(e.target.value)
                    setLeaveError('')
                }}
              />
            </Form.Group>
            <p className="text-danger mt-2">{leaveError ? leaveError : ''}</p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddLeaveType}>Add</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default LeaveType;

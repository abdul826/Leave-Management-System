import React, { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { fetchAllLeaveType } from '../../redux/slice/LeaveTypeSlice/LeaveTypeSlice';
import { useDispatch } from 'react-redux';
import { applyLeave } from '../../redux/slice/LeaveSlice/LeaveSlice';

const ApplyLeaveForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [leaveTypes, setLeaveTypes] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    leaveType: '',
    fromDate: '',
    toDate: '',
    reason: '',
    documents: []
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 3) {
      toast.error('You can upload a maximum of 3 PDF files.');
      return;
    }

    // Validate all files are PDFs
    const allArePDFs = files.every(file => file.type === 'application/pdf');
    if (!allArePDFs) {
      toast.error('Only PDF files are allowed.');
      return;
    }

    setFormData({ ...formData, documents: files });
  };


  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.leaveType) {
      errors.leaveType = 'Leave type is required';
    }
    if (!formData.fromDate) {
      errors.fromDate = 'From date is required';
    }
    if (!formData.toDate) {
      errors.toDate = 'To date is required';
    }

    // Optional: Check if fromDate is after toDate
    if (formData.fromDate && formData.toDate && formData.fromDate > formData.toDate) {
      errors.toDate = 'To date cannot be earlier than from date';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return; // Don't submit the form if there are errors
    }
console.log(formData);
    const submissionData = new FormData();
    submissionData.append('leaveTypeId', formData.leaveType);
    submissionData.append('leave_from', formData.fromDate);
    submissionData.append('leave_to', formData.toDate);
    submissionData.append('leave_desc', formData.reason);

  formData.documents.forEach((file, index) => {
    submissionData.append('documents', file); // backend should handle multiple files with same key
  });

  const config = {
    "Content-Type":"multipart/form-data"
  }

  const dataSend = {
    submissionData,
    config
  }
    // You can send formData to backend here
    dispatch(applyLeave(dataSend)).then((res)=>{
        if(res.payload !=='undefined'){
          toast.success(res.payload.message);
        }
    }).catch((err)=>{
      console.log(err);
      toast.error("Leave not applied");
    })

    // After submission
    navigate('/user/leaves');
  };

   // Fetch All Leave Type
    const fetchAllLeaveTypeData = async()=>{
      dispatch(fetchAllLeaveType()).then((res)=>{
        if(res.payload){
          setLeaveTypes(res.payload);
        }
      }).catch((err)=>{
        console.log(err);
      });
    }

  useEffect(()=>{
    fetchAllLeaveTypeData()
  },[]);

  // console.log(leaveTypes);
  

  return (
    <Container className="mt-4">
      <h2>Apply for Leave</h2>

      <Form onSubmit={handleSubmit} className="mt-3">
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Leave Type</Form.Label>
              <Form.Select
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                isInvalid={!!formErrors.leaveType}
              >
                <option value="">Select Leave Type</option>
                {leaveTypes.map((type) => (
                  <option key={type._id} value={type._id}>
                    {type.leave_type}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{formErrors.leaveType}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>From</Form.Label>
              <Form.Control
                type="date"
                name="fromDate"
                value={formData.fromDate}
                onChange={handleChange}
                isInvalid={!!formErrors.fromDate}
              />
              <Form.Control.Feedback type="invalid">{formErrors.fromDate}</Form.Control.Feedback>
            </Form.Group>
            </Col>

          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>To</Form.Label>
              <Form.Control
                type="date"
                name="toDate"
                value={formData.toDate}
                onChange={handleChange}
                isInvalid={!!formErrors.toDate}
              />
              <Form.Control.Feedback type="invalid">{formErrors.toDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Reason</Form.Label>
          <Form.Control as="textarea" rows={3} name="reason" value={formData.reason} onChange={handleChange} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Upload Documents (max 3 PDFs)</Form.Label>
          <Form.Control 
            type="file" 
            name="documents" 
            onChange={handleFileChange} 
            multiple 
            accept="application/pdf"
          />
        </Form.Group>

        <Button type="submit" variant="primary">Submit</Button>
      </Form>
    </Container>
  );
};

export default ApplyLeaveForm;

import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { fetchDepartment } from '../../redux/slice/DepartmentSlice/DepartmentSLice';
import { addEmployee } from '../../redux/slice/EmployeeSlice/EmployeeSlice';
// import { addEmployee } from '../../redux/slice/EmployeeSlice/EmployeeSlice';

const AddEmployeeModal = ({ show, handleClose, fetchEmployeeData }) => {
  const dispatch = useDispatch();

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    password: '',
    cPassword:'',
    address: '',
    brithday: '',
    role: 'user',
    departmentId: '',
    leave_balance: 0,
  });

  const [departments, setDepartments] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (!newEmployee.name.trim()) errors.name = "Name is required";
    if (!newEmployee.email.trim()) errors.email = "Email is required";
    if (!newEmployee.mobile.trim()) errors.mobile = "Mobile number is required";
    if (!newEmployee.password.trim()) errors.password = "Password is required";
    if (!newEmployee.cPassword.trim()) errors.cPassword = "Confirm Password is required";
    if (!newEmployee.address.trim()) errors.address = "Address is required";
    if (!newEmployee.departmentId.trim()) errors.departmentId = "Department ID is required";
    // Optional: Add email/mobile format validation if needed
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // TO habdle input fields errors
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});

    dispatch(addEmployee(newEmployee))
      .then((res) => {
        console.log("=>", res);
        if(res.payload !== 'undefined'){
          toast.success("Employee added successfully");
          fetchEmployeeData();
          handleClose();
          setNewEmployee({
            name: '',
            email: '',
            mobile: '',
            password: '',
            cPassword:'',
            address: '',
            brithday: '',
            role: 'user',
            departmentId: '',
            leave_balance: 0,
        });
        }
      })
      .catch((err) => {
        toast.error("Failed to add employee");
      });
  };

  // Fetch Department
  const fetchDepartmentData = ()=>{
    dispatch(fetchDepartment()).then((res)=>{
      if(res.payload !== 'undefined'){
        setDepartments(res.payload.getDepartment);
      }
    }).catch((err)=>{
      toast.error(err);
    })
  }

  useEffect(()=>{
    fetchDepartmentData();
  },[]);

  // console.log(departments);
  

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="name" className="mb-2">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={newEmployee.name}
              onChange={handleChange}
              isInvalid={!!formErrors.name}
              placeholder="Enter name"
            />
            <Form.Control.Feedback type="invalid">{formErrors.name}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="email" className="mb-2">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={newEmployee.email}
              onChange={handleChange}
              isInvalid={!!formErrors.email}
              placeholder="Enter email"
            />
            <Form.Control.Feedback type="invalid">{formErrors.email}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="mobile" className="mb-2">
            <Form.Label>Mobile *</Form.Label>
            <Form.Control
              type="number"
              name="mobile"
              value={newEmployee.mobile}
              onChange={handleChange}
              isInvalid={!!formErrors.mobile}
              placeholder="Enter mobile number"
            />
            <Form.Control.Feedback type="invalid">{formErrors.mobile}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="password" className="mb-2">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={newEmployee.password}
              onChange={handleChange}
              isInvalid={!!formErrors.password}
              placeholder="Enter password"
            />
            <Form.Control.Feedback type="invalid">{formErrors.password}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="cPassword" className="mb-2">
            <Form.Label>Password *</Form.Label>
            <Form.Control
              type="cPassword"
              name="cPassword"
              value={newEmployee.cPassword}
              onChange={handleChange}
              isInvalid={!!formErrors.cPassword}
              placeholder="Enter Confirm password"
            />
            <Form.Control.Feedback type="invalid">{formErrors.cPassword}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="address" className="mb-2">
            <Form.Label>Address *</Form.Label>
            <Form.Control
              type="text"
              name="address"
              value={newEmployee.address}
              onChange={handleChange}
              isInvalid={!!formErrors.address}
              placeholder="Enter address"
            />
            <Form.Control.Feedback type="invalid">{formErrors.address}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="brithday" className="mb-2">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
              type="date"
              name="brithday"
              value={newEmployee.brithday}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="role" className="mb-2">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={newEmployee.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="departmentId" className="mb-2">
            <Form.Label>Department *</Form.Label>
              <Form.Select
                name="departmentId"
                value={newEmployee.departmentId}
                onChange={handleChange}
                isInvalid={!!formErrors.departmentId}
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept._id} value={dept._id}>
                    {dept.departmentName}
                  </option>
                ))}
              </Form.Select>
            <Form.Control.Feedback type="invalid">
              {formErrors.departmentId}
            </Form.Control.Feedback>
        </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" onClick={handleSubmit}>Add Employee</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployeeModal;

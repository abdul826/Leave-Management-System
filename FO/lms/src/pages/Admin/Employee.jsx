import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import AddEmployeeModal from './AddEmployeeModel';
import { deleteEmployee, fetchEmployee } from '../../redux/slice/EmployeeSlice/EmployeeSlice';

const Employee = () => {
  const [employees, setEmployees] = useState([]);
   const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  // Fetch Employee
  const fetchEmployeeData = () => {
    dispatch(fetchEmployee()).then((res) => {
      if (res.payload !== 'undefined') {
        setEmployees(res.payload.getAllEmp);
      }
    }).catch((err) => {
      toast.error(err);
    })
  };

  // Delete Employee
  const handleDelete = (id)=>{
    dispatch(deleteEmployee(id)).then((res)=>{
      if(res.payload !== 'undefined'){
        toast.success("Employee Deleted Successfully");
        fetchEmployeeData();
      }
    }).catch((err)=>{
      toast.error("Employee not deleted");
    })
  }

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  return (
    <Container className="mt-4">
      <h2>Employee Details</h2>
      {/* Add employee form/button can be added later */}
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Add New Employee
      </Button>

      <AddEmployeeModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        fetchEmployeeData={fetchEmployeeData}
      />

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Department</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees?.map((emp, ind) => (
            <tr key={emp._id}>
              <td>{ind + 1}</td>
              <td>{emp.name}</td>
              <td>{emp.departmentId.departmentName?emp.departmentId.departmentName:''}</td>
              <td>{emp.email}</td>
              <td style={emp.role === 'admin' ? { fontWeight: 'bold', color: 'red' } : {}}>
                {emp.role}
              </td>
              <td>
                <Button variant="danger" size="sm" onClick={() => handleDelete(emp._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
          {employees.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center">No employees found.</td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Employee;

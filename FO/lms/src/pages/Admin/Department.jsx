import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import { addDepartment, deleteDepartment, fetchDepartment } from '../../redux/slice/DepartmentSlice/DepartmentSLice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';

const Department = () => {
  const dispatch = useDispatch();
  const [departments, setDepartments] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [newDeptName, setNewDeptName] = useState('');
  const [depError, setDepError] = useState('');

  const handleAddDepartment = (e) => {
    e.preventDefault();

    if (newDeptName === '') {
      setDepError("Department Name is required");
      return;
    } else {
      const data = {
        departmentName: newDeptName.trim()
      };

      dispatch(addDepartment(data)).then((res) => {
        if (res.payload.departmentName) {
          fetchDepartmentData();
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    setNewDeptName('');
    setShowModal(false);
  };

  const handleDeleteDepartment = (id) => {
    dispatch(deleteDepartment(id)).then((res) => {
      if (res.payload) {
        toast.success(res.payload);
        fetchDepartmentData();
      }
    }).catch((err) => {
      toast.error(err);
    })
  };

  // fetch Department
  const fetchDepartmentData = async () => {
    dispatch(fetchDepartment()).then((res) => {
      setDepartments(res.payload.getDepartment)
    }).catch((err) => {
      console.error("Error fetching departments:", err);
      toast.error("Failed to load departments");
    })
  }

  useEffect(() => {
    fetchDepartmentData();
  }, []);

  // console.log(departments);

  return (
    <Container className="mt-4">
      <h2>Departments</h2>
      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Add New Department
      </Button>
      {
        departments.length > 0 ? (
          <>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Department Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments?.map((dept, ind) => (
                  <tr key={dept._id}>
                    <td>{ind + 1}</td>
                    <td>{dept.departmentName}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteDepartment(dept._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
                {departments[0]?.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center">No departments found.</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </>
        ) : (
          <>
            <p className="text-center text-muted mt-3">No departments added.</p>
          </>
        )
      }


      {/* Add Department Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="departmentName">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                type="text"
                name="department"
                placeholder="Enter department name"
                value={newDeptName}
                onChange={(e) => {
                  setNewDeptName(e.target.value)
                  setDepError('');
                }
                }
              />
            </Form.Group>
            <p className="text-danger mt-2">{depError ? depError : ''}</p>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddDepartment}>Add</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Department;

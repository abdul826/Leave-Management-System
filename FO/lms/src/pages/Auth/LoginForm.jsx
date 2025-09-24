import React, { useState } from 'react';
import { Container, Form, Button, Card, Row, Col } from 'react-bootstrap';
import toast from 'react-hot-toast';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { AdminAuthLogin } from '../../redux/slice/AdminAuthSlice/AdminSlice';
import { EmployeeAuthLogin } from '../../redux/slice/EmployeeAuthSlice/EmployeeAuthSlice';

const LoginForm = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    role: 'employee' // default
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name,value} = e.target;
    setLoginData({ ...loginData, [name]:value }); // name must be in array because the value is dynamic and to handle dynamiv value we must put name in arrya
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const {email,password,role} = loginData;

    if(email === ''){
        toast.error("Email is required");
    }else if(!email.includes('@')){
      toast.error("Please enter valid email!");
    }else if(password === ''){
      toast.error('Please enter password');
    }
    else{
      if(role === 'admin'){
        dispatch(AdminAuthLogin(loginData)).then((res)=>{
        if(res.payload.message.token){
          navigate('/admin')
        }
      }).catch((err)=>{
        navigate('/login');
      });
      }else{
        dispatch(EmployeeAuthLogin(loginData)).then((res)=>{
          console.log("Res", res);
          
        if(res.payload.message.token){
          navigate('/user/profile')
        }
      }).catch((err)=>{
        navigate('/login');
      });
      }
    }

  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={5}>
          <Card className="p-4 shadow-sm">
            <h3 className="text-center mb-4">Login</h3>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Login As</Form.Label>
                <Form.Select name="role" value={loginData.role} onChange={handleChange}>
                  <option value="admin">Admin</option>
                  <option value="employee">Employee</option>
                </Form.Select>
              </Form.Group>


              <Button variant="dark" type="submit" className="w-100" onClick={handleSubmit}>
                Login
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginForm;

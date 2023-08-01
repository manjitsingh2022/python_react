import React, { useState } from 'react';
import { Alert, Button, Col, Container, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { userActions } from '../../../store/actions/user.action';
import {Link} from 'react-router-dom';
const Login = () => {

  const [formData, setFormData] = useState({email: '',password: '',});
  const [formErrors, setFormErrors] = useState({email: false,password: false,});
  const dispatch = useDispatch();
  const { loggedIn, message } = useSelector(state => state.authentication);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData,[name]: value,});
  };

  const validateForm = () => {
    const errors = {
      email: !formData.email.trim(),
      password: !formData.password.trim(),
    };
    setFormErrors(errors);
    return !Object.values(errors).some(error => error);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setFormErrors({
        email: false,
        password: false,
      });
      dispatch(userActions.login(formData.email, formData.password ));
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <div className="login-container">
        <h2>Login</h2>
        {loggedIn && <Alert variant="success">Login successful!</Alert>}
        {message && <Alert variant="danger">{message}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              isInvalid={formErrors.email}
              autoComplete="email"
            />
            {formErrors.email && <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="current-password"
              isInvalid={formErrors.password}
            />
            {formErrors.password && <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>}
          </Form.Group>
          <Button variant="primary" type="submit" className="full-width-button">
            Login
          </Button>
          <Link to="/register">
            <div
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#c4c4c4",
              cursor: "pointer"
            }}
          >
            New user ? Please Register
          </div>
          </Link>
        
        </Form>
      </div>
    </Container>
  );
};

export default Login;

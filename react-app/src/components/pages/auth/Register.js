import React, { useState } from 'react';
import { Alert, Button, Container, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import { userActions } from '../../../store/actions/user.action';
import { Link } from 'react-router-dom';
const Register = () => {

  // const navigate=useNavigate()
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    usernameError: false,
    emailError: false,
    passwordError: false,
    confirmPasswordError: false,
    message: '',
  });

  const dispatch = useDispatch();

  const { registering ,message} = useSelector(state => state.authentication);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;
    if (!username.trim()) {
      setErrors({ ...errors, usernameError: true });
    } else if (!email.trim()) {
      setErrors({ ...errors, emailError: true });
    } else if (!password.trim()) {
      setErrors({ ...errors, passwordError: true });
    } else if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPasswordError: true, message: "Passwords do not match." });
    } else {
      setErrors({
        usernameError: false,
        emailError: false,
        passwordError: false,
        confirmPasswordError: false,
        message: '',
      });
      dispatch(userActions.register(username, email, password));
      // navigate("/login")
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}><div className="login-container">
      <h2>Register</h2>
      
      {registering && <Alert variant="success">Register successfully!</Alert>}

      {errors.message && <Alert variant="danger">{errors.message}</Alert> }

      <Form onSubmit={handleSubmit}>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              isInvalid={errors.usernameError}
              autoComplete="username"  
            />
            {errors.usernameError && <Form.Control.Feedback type="invalid">Username is required.</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              isInvalid={errors.emailError}
              autoComplete="email"  
            />
            {errors.emailError && <Form.Control.Feedback type="invalid">Email is required.</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              isInvalid={errors.passwordError}
              autoComplete="new-password"  
            />
            {errors.passwordError && <Form.Control.Feedback type="invalid">Password is required.</Form.Control.Feedback>}
          </Form.Group>
          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              isInvalid={errors.confirmPasswordError}
              autoComplete="new-password"  
            />
            {errors.confirmPasswordError && <Form.Control.Feedback type="invalid">Passwords do not match.</Form.Control.Feedback>}
          </Form.Group>
        <Button variant="primary" type="submit" className="full-width-button">
          Register
        </Button>

        <Link to="/login">
          <div
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "#c4c4c4",
              cursor: "pointer"
            }}
          >
            Already have an account ? Please login.
          </div>
        </Link>
      </Form>
    </div>
    </Container>
    
  );
};

export default Register;

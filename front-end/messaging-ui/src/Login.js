import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { Form, Button } from 'react-bootstrap';
import './Login.css'; // Make sure to create a Login.css file for styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    login(username, password);
  };

  return (
    <div className="split-screen">
      <div className="left-side">
      </div>
      <div className="right-side">
        <Form onSubmit={handleSubmit} className="login-form">
          <Form.Group controlId="formUsername">
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="password" 
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Login;

import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Changepassword from './changepassword';
import Register from './register';

function Example() {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/auth/login', {
      email: email,
      password: password
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(response => {
        const responseData = response.data;
        if (responseData.jwtToken) {
          sessionStorage.setItem('authdata', responseData.jwtToken);
          setEmail(responseData.username);
          sessionStorage.setItem("email", responseData.username);
          handleClose();
          window.location.reload();
        } else {
          // Token nie został otrzymany
          setError('Błędne dane logowania.');
        }
      })
      .catch(error => {
        setError('Bład.');
        sessionStorage.removeItem("authdata")
        console.log(error);
      });

  };


  return (
    <>
      <a href="#login" onClick={handleShow}>

        Sign in

      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={handleInputChange}
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="Submit">
              Login
            </Button>
          </Form>

          {error && <p className="text-danger">{error}</p>}
        </Modal.Body>
        <Modal.Footer>
          <Register />
          <Changepassword />
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
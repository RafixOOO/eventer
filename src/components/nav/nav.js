import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const options = [
  {
    name: 'Groups',
    scroll: true,
    backdrop: true,
  },
];

function Navigation() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="">Eventer</Navbar.Brand>
          <Nav className="me-auto">
            {options.map((props, idx) => (
        <OffCanvasExample key={idx} {...props} />
      ))}
            <Nav.Link href="#features">Events</Nav.Link>
          </Nav>
          <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
          <a href="#login">Sign in</a>
          </Navbar.Text>
        </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
    </>
  );
}

export default Navigation;



function OffCanvasExample({ name, ...props }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  const offcanvasStyle = {
    maxWidth: '35%', // Ustaw szerokość na 10%
  };

  return (
    <>
      <Nav.Link onClick={toggleShow}>
        {name}
      </Nav.Link>
      <Offcanvas show={show} onHide={handleClose} style={offcanvasStyle} {...props}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Groups</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as a placeholder. In real life, you can have the elements you
          have chosen, like text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Login from '../login/login';
import Person from '../person/person';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Logo from './logo.svg';

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
        <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container fluid>
          <Navbar.Brand>Eventer</Navbar.Brand>

            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                 {sessionStorage.getItem('authdata') ?  (
                  <div>
                    {options.map((props, idx) => (
                      <OffCanvasExample key={idx} {...props} />
                    ))}
                    </div>
                  ):(
                  <div></div>
                )}
                <Nav.Link href="/">Events</Nav.Link>
                
                {sessionStorage.getItem('authdata') ? (
                  <Nav.Link href="/callendar">Callendar</Nav.Link>
                ):(
                  <div></div>
                )}
                <Nav.Link href="/contact">Contact</Nav.Link>
                
              </Nav>
              <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
              {sessionStorage.getItem('authdata') ?  (
                  <Person />
              ):(
                <Login />
              )}
          
          </Navbar.Text>
        </Navbar.Collapse>
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
    maxWidth: '60%', // Ustaw szerokość na 10%
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
          <DefaultExample />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}


function DefaultExample() {
  return (
    <ListGroup as="ol">
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <Image style={{maxWidth: '100%',height: 'auto', maxHeight: '25px',}} src={Logo}  roundedCircle />
        <div className="ms-2 me-auto">
        <div className="fw-bold"><Nav.Link href="#group">Subheading</Nav.Link></div>
        </div>
        <Badge bg="danger" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
        <Image style={{maxWidth: '100%',height: 'auto', maxHeight: '25px',}} src={Logo}  roundedCircle />
        <div className="ms-2 me-auto">
        <div style={{maxWidth: '100%'}} className="fw-bold"><Nav.Link href="#group">Subheading</Nav.Link></div>
        </div>
        <Badge bg="danger" pill>
          14
        </Badge>
      </ListGroup.Item>
      <ListGroup.Item
        as="li"
        className="d-flex justify-content-between align-items-start"
      >
          <Image style={{maxWidth: '100%',height: 'auto', maxHeight: '25px',}} src={Logo}  roundedCircle />
        <div className="ms-2 me-auto">
          <div className="fw-bold"><Nav.Link href="#group">Subheading</Nav.Link></div>
        </div>
        <Badge bg="danger" pill>
          1
        </Badge>
      </ListGroup.Item>
    </ListGroup>
  );
}
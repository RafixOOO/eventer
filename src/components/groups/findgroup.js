import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Image from 'react-bootstrap/Image';
import Logo from './logo.svg';
import Nav from 'react-bootstrap/Nav';

function TextControlsExample() {
    return (

        <ListGroup as="ol">
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Group Name</Form.Label>
                    <Form.Control type="text" />
                </Form.Group>
                <Button variant="primary">Search</Button>
            </Form>
            <br />
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                <div className="ms-2 me-auto">
                    <div className="fw-bold"><Nav.Link href="/groups">Subheading</Nav.Link></div>
                </div>
                <div>
                    Join
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                <div className="ms-2 me-auto">
                    <div style={{ maxWidth: '100%' }} className="fw-bold"><Nav.Link href="/groups">Subheading</Nav.Link></div>
                </div>
                <div>
                    Join
                </div>
            </ListGroup.Item>
            <ListGroup.Item
                as="li"
                className="d-flex justify-content-between align-items-start"
            >
                <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                <div className="ms-2 me-auto">
                    <div className="fw-bold"><Nav.Link href="/groups">Subheading</Nav.Link></div>
                </div>
                <div>
                    Join
                </div>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default TextControlsExample;
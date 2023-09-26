import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Logo from '../logo.svg';
import Nav from 'react-bootstrap/Nav';

function Example() {
    const [show, setShow] = useState(false);
    const [search, setSearch] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const searching = () => {
        setSearch(false);
    }

    return (
        <>
            <a href="#Person" onClick={handleShow}>

                <Button variant='secondary' style={{ marginLeft: 'auto' }}>Add</Button>
            </a>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Search
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <ListGroup as="ol">
                        {search && (
                            <div>
                                <Form.Group className="mb-3">
                                    <Form.Label>User Name</Form.Label>
                                    <Form.Control type="text" />
                                </Form.Group>
                                <Button variant="primary" onClick={searching}>Search</Button>
                            </div>
                        )}


                        {!search && (
                            <div>


                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold"><Nav.Link >Subheading</Nav.Link></div>
                                    </div>
                                    <div>
                                        <Button variant="success">Invite</Button>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                                    <div className="ms-2 me-auto">
                                        <div style={{ maxWidth: '100%' }} className="fw-bold"><Nav.Link>Subheading</Nav.Link></div>
                                    </div>
                                    <div>
                                        <Button variant="success">Invite</Button>
                                    </div>
                                </ListGroup.Item>
                                <ListGroup.Item
                                    as="li"
                                    className="d-flex justify-content-between align-items-start"
                                >
                                    <Image style={{ maxWidth: '100%', height: 'auto', maxHeight: '25px', }} src={Logo} roundedCircle />
                                    <div className="ms-2 me-auto">
                                        <div className="fw-bold"><Nav.Link>Subheading</Nav.Link></div>
                                    </div>
                                    <div>
                                        <Button variant="success">Invite</Button>
                                    </div>
                                </ListGroup.Item>
                                
                            </div>
                        )}
                    </ListGroup>
                </Modal.Body>
            </Modal >
        </>
    );
}

export default Example;
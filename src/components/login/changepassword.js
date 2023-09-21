import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function Example() {
    const [show, setShow] = useState(false);
    const [isInputVisible, setInputVisible] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        setInputVisible(true);
    };

    const handleSubmit1 = (a) => {
        setInputVisible(false);
    };

    return (
        <>
            <Button variant="secondary" onClick={handleShow}>

                <div>
                    Change Password
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change Password
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <center>
                    {!isInputVisible && (
                        <form>
                            
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="name@example.com"
                                required
                            />
                            <br /><br />
                            <button type="button" onClick={handleSubmit} className="btn btn-secondary">
                                Send Code
                            </button>
                            </form>
                            )}
                            {isInputVisible && (
                                <form>
                                <div>
                                Check email address<br />
                                    <input
                                        type="number"
                                        id="numer"
                                        name="nazwisko"
                                        placeholder="Number"
                                    />
                                    <br /><br />
                                    <input
                                        type="password"
                                        id="text"
                                        name="password"
                                        placeholder="New password"
                                    />
                                        <br /><br />
                                    <button type="button" onClick={handleSubmit1} className="btn btn-secondary" >
                                        Change password
                                    </button>
                                </div>
                                </form>
                            )}
                        
                    </center>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;
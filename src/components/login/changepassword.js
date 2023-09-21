import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function Example() {
    const [show, setShow] = useState(false);
    const [isInputVisible, setInputVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [id, setId] = useState('');
    const [Code, setCode] = useState('');
    const [CodeCheck, setCodeCheck] = useState('');
    const [isText, setText] = useState(false);
    const [isText1, setText1] = useState(false);
    const [password, setPassword] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        check()

    };

    const handleFileChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFileChange1 = (e) => {
        setCodeCheck(e.target.value);
    };

    const handleFileChange2 = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit1 = (a) => {
        if (parseInt(Code, 10) === parseInt(CodeCheck,10)) {
            change();
        } else {
            setText1(true);
        }

    };

    const check = () => {
        axios
            .get(`http://localhost:8080/auth/CheckUser?email=${email}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            .then(response => {
                setId(response.data.id);
                setInputVisible(true);
                sendCode();
            })
            .catch((error) => {
                setText(true);
                console.log(error);
            });

    }

    const sendCode = () => {
        axios
            .get(`http://localhost:8080/auth/email/sendCode?email=${email}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            .then(response => {
                setCode(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const change = () => {
        axios
            .put(`http://localhost:8080/auth/EditUser`,{
                id: id,
                password: password,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    timeout: 5000,
                }, )
            .then(response => {
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
            });

    }

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
                                {isText && (
                                    <div>
                                        incorrect email address
                                    </div>
                                )}
                                <input
                                    type="text"
                                    id="email"
                                    name="email"
                                    placeholder="name@example.com"
                                    onChange={handleFileChange}
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
                                        onChange={handleFileChange1}
                                    />
                                    {isText1 && (
                                        <div>
                                            Bad code
                                            <br />
                                        </div>
                                    )}
                                    <br /><br />
                                    <input
                                        type="password"
                                        id="text"
                                        name="password"
                                        placeholder="New password"
                                        onChange={handleFileChange2}
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
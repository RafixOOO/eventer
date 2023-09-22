import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function Example() {
    const [show, setShow] = useState(false);
    const [isInputVisible, setInputVisible] = useState(false);
    const [email, setEmail] = useState('');
    const [imie, setImie] = useState('');
    const [nazwisko, setNazwisko] = useState('');
    const [id, setId] = useState('');
    const [Code, setCode] = useState('');
    const [CodeCheck, setCodeCheck] = useState('');
    const [isText1, setText1] = useState(false);
    const [password, setPassword] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = () => {
        check();
    };

    const handleFileChange = (e) => {
        setEmail(e.target.value);
    };

    const handleFileChange3 = (e) => {
        setImie(e.target.value);
    };

    const handleFileChange4 = (e) => {
        setNazwisko(e.target.value);
    };

    const handleFileChange1 = (e) => {
        setCodeCheck(e.target.value);
    };

    const handleFileChange2 = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit1 = (a) => {
        if (parseInt(Code, 10) === parseInt(CodeCheck, 10)) {
            change();
        } else {
            setText1(true);
        }

    };

    const check = () => {
        axios
            .post(`http://localhost:8080/auth/AddPerson`, {
                imie: imie,
                nazwisko: nazwisko,
                emailconfirm: 1,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
            .then(response => {
                setId(response.data.id);
                sendCode();

            })
            .catch((error) => {
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
                setInputVisible(true);
            })
            .catch((error) => {
                console.log(error);
            });

    }

    const change = () => {
        axios
            .post(`http://localhost:8080/auth/AddUser`, {
                id: id,
                email: email,
                password: password,
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },)
            .then(() => {
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
                    Register
                </div>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Register
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <center>
                        {!isInputVisible && (
                            <form>
                                <input
                                    type="text"
                                    id="imie"
                                    name="imie"
                                    placeholder="name"
                                    onChange={handleFileChange3}
                                    required
                                />
                                <br /><br />
                                <input
                                    type="text"
                                    id="nazwisko"
                                    name="nazwisko"
                                    placeholder="surname"
                                    onChange={handleFileChange4}
                                    required
                                />
                                <br /><br />
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
                                    Save
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
                                        placeholder="password"
                                        onChange={handleFileChange2}
                                    />
                                    <br /><br />
                                    <button type="button" onClick={handleSubmit1} className="btn btn-secondary" >
                                        Register
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
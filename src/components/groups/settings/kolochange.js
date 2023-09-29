import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>

                <Dropdown.Item onClick={handleShow}>Settings</Dropdown.Item>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Change group
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <center>

                        <form>
                            <input
                                type="file"
                                id="fileInput"
                                accept="image/jpeg, .jpg"
                                className="form-control-file"
                            />
                            <br /><br />

                            <input
                                type="text"
                                id="imie"
                                name="imie"
                                placeholder='Name'
                                required
                            />
                            <br /><br />
                            <select aria-label="Default select example">
                                <option value="false">not visible</option>
                                <option value="true">visible</option>
                            </select>
                            <br /><br />
                            <textarea
                                id="nazwisko"
                                name="nazwisko"
                                rows={3}
                                placeholder='Description'
                                required
                                className="form-control"
                            ></textarea>

                            <br />
                            <button type="button" className="btn btn-secondary">
                                Change
                            </button>
                        </form>
                    </center>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;
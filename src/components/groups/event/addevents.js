import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';

function Example() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Pobieramy aktualną datę i formatujemy ją
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    // Ustawiamy dzisiejszą datę w stanie komponentu
    setCurrentDate(formattedDate);
  }, []);


    return (
        <>
            <Dropdown.Item onClick={handleShow}>Add Event</Dropdown.Item>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>New Event
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
                            <input
                                type="text"
                                id="nazwisko"
                                name="imie"
                                placeholder='Place'
                                required
                            />
                            <br /><br />
                            <input
                                type="date"
                                id="date"
                                name="imie"
                                placeholder={currentDate}
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
                                Add
                            </button>
                        </form>
                    </center>
                </Modal.Body>
            </Modal>
        </>
    );
}

export default Example;
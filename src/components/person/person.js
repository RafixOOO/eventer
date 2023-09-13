import { useState } from 'react';
import React, {useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';

function Example() {
  const [show, setShow] = useState(false);
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [id, setId] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () => {
    sessionStorage.removeItem('authdata');
    window.location.reload();
  };

  useEffect(() => {
    // Wywołaj pobieranie danych użytkownika po zalogowaniu
    axios.get('http://localhost:8080/api/User/Current', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem("authdata")}`
      }
    })
      .then(response => {
        const responseData = response.data;
        setImie(responseData.imie);
        setNazwisko(responseData.nazwisko);
        setId(responseData.id);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <a href="#Person" onClick={handleShow}>

        <div>
        {imie} {nazwisko}
        </div>
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          Jesteś zalogowany<br />
          {imie} {nazwisko} {id}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
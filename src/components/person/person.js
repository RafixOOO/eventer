import { useState } from 'react';
import { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

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

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const newFileName = {id}+'.jpg'; // Tutaj możesz wprowadzić własną nazwę

  }
    
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
        sessionStorage.removeItem("authdata")
      });
  }, []);

  return (
    <>
      <a href="#Person" onClick={handleShow}>

        <div>
          {imie} {nazwisko} {id}
        </div>
      </a>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <center>
            <Col xs={6} md={4}>
              <Image style={{ objectFit: 'scale-down', maxHeight: '180px', maxWidth: '171px' }} src={require('./img/img2.jpg')} roundedCircle />
            </Col>
            <br />
            <div style={{ fontSize: '150%' }}>
              {imie} {nazwisko}
            </div>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <input type="file" onChange={handleFileChange} id="fileInput" accept="image/jpeg, .jpg" style={{ display: 'none' }} />
          <label htmlFor="fileInput" className="btn btn-secondary">
            Send
          </label>
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
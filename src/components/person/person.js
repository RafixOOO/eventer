import { useState, useEffect } from 'react';
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
  const [image, setImage] = useState('');
  const [obraze, setObrazek] = useState('');

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
        Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
      },
    })
      .then(response => {
        const responseData = response.data;
        setId(responseData.id);
      })
      .catch(error => {
        console.error(error);
        sessionStorage.removeItem('authdata');
      });
  }, []); // Pusty tablicowy zależności oznacza, że efekt wywoła się tylko raz przy montowaniu komponentu

  useEffect(() => {
    // Wywołaj pobieranie danych użytkownika po zalogowaniu
    if (id) {
      axios
        .get(`http://localhost:8080/api/Persons/findOne?id=${id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
        })
        .then((response) => {
          const responseData = response.data;
          setImie(responseData.imie);
          setNazwisko(responseData.nazwisko);
          setImage(responseData.image);
        })
        .catch((error) => {
          console.error(error);
          sessionStorage.removeItem('authdata');
        });
    }
  }, [id]); // Zależność od zmiennej id - efekt wywoła się, gdy id zostanie zmienione

  useEffect(() => {
    // Wywołaj pobieranie obrazka użytkownika po zalogowaniu
    if (image) {
      axios
        .get(`http://localhost:8080/api/Image/download/${image}`, {
          headers: {
            Accept: 'application/octet-stream',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
          responseType: 'blob', // Ustaw typ odpowiedzi na 'blob' (dla obrazka)
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'image/jpeg' });
          const imageUrl = URL.createObjectURL(blob);
          setObrazek(imageUrl);
          setImage("");
        })
        .catch((error) => {
          console.error(error);
          sessionStorage.removeItem('authdata');
        });
    }
  }, [image]);

  const handleButtonClick = () => {

        axios
          .put(`http://localhost:8080/api/Persons/Edit`, {
            id: id,
            imie: imie,
            nazwisko: nazwisko,
            emailconfirm: 1,
            image: "null",
          },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
              },
            }).then((response) => {
              console.logo(response.data);
              other();
            })
          .catch((error) => {
            console.error(error);
            sessionStorage.removeItem('authdata');
          });
  }
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

          <center>
            <form>
              <Col xs={6} md={4}>
                <label htmlFor="fileInput" className="custom-file-upload">
                  <Image style={{ objectFit: 'contain', maxHeight: '180px', maxWidth: '171px' }} src={obraze} roundedCircle />
                </label>
              </Col>
              <input
                type="file"
                id="fileInput"
                accept="image/jpeg, .jpg"
                className="form-control-file"
                hidden
              />
              <br />

              <input
                type="text"
                id="imie"
                name="imie"
                placeholder={imie}
              />
              <input
                type="text"
                id="nazwisko"
                name="nazwisko"
                placeholder={nazwisko}
              />

              <br /><br />
              <button className="btn btn-secondary" onClick={handleButtonClick}>
                Change
              </button>
            </form>
          </center>
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
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

function Example() {
  const [show, setShow] = useState(false);
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [id, setId] = useState('');
  const [obraze, setObrazek] = useState('');
  const [image, setImage] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
  return (
    <>
      <Button variant="secondary" onClick={handleShow}>

        <div>
          Change
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <center>

            <form>
                <label htmlFor="fileInput" className="custom-file-upload">
                  <Image style={{ objectFit: 'contain', maxHeight: '180px', maxWidth: '171px' }} src={obraze} roundedCircle />
                </label>
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
              <button className="btn btn-secondary">
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
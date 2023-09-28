import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Image from 'react-bootstrap/Image';
import PersonChange from './personChange';
import JSZip from 'jszip';

function Example() {
  const [show, setShow] = useState(false);
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [id, setId] = useState('');
  const [image, setImage] = useState('');
  const [obrazek, setObrazek] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () => {
    sessionStorage.removeItem('authdata');
    window.location.reload();
  };

  const dp = () => {
    axios
      .delete(`http://localhost:8080/api/User/Delete/${id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
        })
      .then(() => {
        sessionStorage.removeItem('authdata');
        window.location.reload();

      })
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem('authdata');
      });

  }

  const nonperson = () => {
    axios
      .put(`http://localhost:8080/api/Persons/Edit`,
        {
          id: id,
          imie: "Deleted",
          nazwisko: "User",
          emailconfirm: 0,
          image: "58b6edb8-8503-4e13-9773-1b63803e0ca1_s.jpg",
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
          timeout: 5000,
        })
      .then(() => {
        dp();

      })
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem('authdata');
      });

  }

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

    const fileNames = [image];
    // Wywołaj pobieranie obrazka użytkownika po zalogowaniu
    if (image) {
      axios
      .get('http://localhost:8080/api/Image/download', {
        headers: {
          Accept: 'application/octet-stream',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
        },
        responseType: 'blob', // Ustaw typ odpowiedzi na 'blob'
        params: {
          fileNames: fileNames.join(',')
        }
      })
      .then((response) => {
        const zipData = response.data;
        const jszip = new JSZip();
        
        return jszip.loadAsync(zipData);
      })
      .then((zip) => {
        // Tutaj możesz przetwarzać zawartość archiwum ZIP (zdjęcia) w zależności od Twoich potrzeb
        // Przykład: Wyświetlanie pierwszego zdjęcia
        zip.forEach((relativePath, file) => {
          if (!file.dir) { // Pomijamy foldery w archiwum
            file.async('blob').then((blob) => {
              const imageUrl = URL.createObjectURL(blob);
              setObrazek(imageUrl);
            });
            return; // Wyjście po przetworzeniu pierwszego pliku (zdjęcia)
          }
        });
      })
      .catch((error) => {
        console.error(error);
        sessionStorage.removeItem('authdata');
      });
    }
  }, [image]);
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

            <Image style={{ objectFit: 'contain', maxHeight: '180px', maxWidth: '171px' }} src={obrazek} roundedCircle />
            <br /><br />
            <div style={{ fontSize: '150%' }}>
              {imie} {nazwisko}
            </div>
          </center>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={nonperson}>
            Delete
          </Button>
          <PersonChange />
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Example;
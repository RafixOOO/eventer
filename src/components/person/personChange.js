import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

function Example() {
  const [show, setShow] = useState(false);
  const [imie, setImie] = useState('');
  const [nazwisko, setNazwisko] = useState('');
  const [id, setId] = useState('');
  const [obraze, setObrazek] = useState('');
  const [showAlert, setShowAlert] = useState(false);

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

  const handleImieChange = (e) => {
    setImie(e.target.value);
  };

  const handleNazwiskoChange = (e) => {
    setNazwisko(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // Do something with the selected file, like setting it to 'obraze'
    setObrazek(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Tutaj możesz wykorzystać wartości imie, nazwisko i obraze do dalszej obróbki lub przesyłania na serwer.
    console.log('Imie:', imie);
    console.log('Nazwisko:', nazwisko);
    console.log('Obrazek:', obraze);
    console.log('id:', id);
    if (obraze) {
      image();
    }
    if(imie){
      edit();
    }
    setShowAlert(true);
  };

  const edit = () => {
    axios
      .put(
        `http://localhost:8080/api/Persons/Edit`,
        {
          id: id,
          imie: imie,
          nazwisko: nazwisko,
          emailconfirm: 1,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
          timeout: 5000
        }
      )
      .then((response) => {
        console.log('Edycja zakończona sukcesem', response.data);
        // Tutaj możesz obsłużyć odpowiedź z serwera po udanej edycji
        // Na przykład możesz wyświetlić komunikat o sukcesie lub podjąć inne działania w zależności od odpowiedzi
      })
      .catch((error) => {
        console.error('Błąd podczas edycji', error);
        // Obsłuż błąd, jeśli wystąpił
      });
  };

  const image = () => {

    const formData = new FormData();
    formData.append('id', id);
    formData.append('file', obraze);

    axios
      .post(`http://localhost:8080/api/Image/PersonImage`, formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
        })
      .then(response => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem('authdata');
      });

  }
  return (
    <>
      <Button variant="secondary" onClick={handleShow}>

        <div>
          Change
        </div>
      </Button>

      <Modal show={show} onHide={handleClose}>
      {showAlert && (
        <Alert style={{ position: 'absolute', top: '20px', right: '35px' }} className="alert alert-success" role="alert" onClose={() => setShowAlert(false)} dismissible>
          Data has been changed!
        </Alert>
      )}
        <Modal.Header closeButton>
          <Modal.Title>Change Person
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <center>

              <input
                type="file"
                id="fileInput"
                accept="image/jpeg, .jpg"
                className="form-control-file"
                onChange={handleFileChange}
              />
              <br />

              <input
                type="text"
                id="imie"
                name="imie"
                onChange={handleImieChange}
                required
              />
              <input
                type="text"
                id="nazwisko"
                name="nazwisko"
                onChange={handleNazwiskoChange}
                required
              />

              <br /><br />
              <button type="button" className="btn btn-secondary" onClick={handleSubmit} >Change</button>
          </center>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Example;
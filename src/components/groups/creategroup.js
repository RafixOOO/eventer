import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';

function TextControlsExample() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);
  const [kolo, setKolo] = useState(null);
  const [User, setUser] = useState(null);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleIsPublicChange = (e) => {
    setIsPublic(e.target.value === 'true');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Tutaj możesz wykonać odpowiednie operacje na danych (np. wysłać na serwer itp.)
    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Is Public:', isPublic);
    create();
  };

  const create = () => {
    axios
      .post(`http://localhost:8080/api/Kolo/Add`, {
        nazwa: name,
        opis: description,
        status: isPublic,
      },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
        })
      .then(response => {
        const responseData = response.data;
        setKolo(responseData);
        current();
      })
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem('authdata');
        window.location.reload();
      });

  }

  const current = () => {
    axios.get('http://localhost:8080/api/User/Current', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
      },
    })
      .then(response => {
        const responseData = response.data;
        setUser(responseData);
        connect();
      })
      .catch(error => {
        console.error(error);
        sessionStorage.removeItem('authdata');
        window.location.reload();
      });
  }

  const connect = () => {
    axios
      .post(`http://localhost:8080/api/KoloUser/Add`, {
        eventsAdder: true,
        manageUser: true,
        permissionAdmin: true,
        koloIdKola: kolo,
        userIdUser: User,
        chatWriter: true,
        confirm: true,
        badges: 0,
      },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
          },
        })
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem('authdata');
      });

  }

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" value={name} onChange={handleNameChange} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" value={description} onChange={handleDescriptionChange} required>
        <Form.Label>Description</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Select aria-label="Default select example" value={isPublic ? 'true' : 'false'} onChange={handleIsPublicChange}>
        <option value="false">private</option>
        <option value="true">public</option>
      </Form.Select>
      <br />
      <Button variant="primary" onClick={handleSubmit}>Create</Button>
    </Form>
  );
}

export default TextControlsExample;
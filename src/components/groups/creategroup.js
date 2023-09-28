import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Name:', name);
    console.log('Description:', description);
    console.log('Is Public:', isPublic);

    await grupa();


  };

  const grupa = () => {
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
      })
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem('authdata');
        window.location.reload();
      });

  }

  useEffect(() => {
    axios.get('http://localhost:8080/api/User/Current', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${sessionStorage.getItem('authdata')}`,
      },
    })
      .then(response => {
        const responseData = response.data;
        setUser(responseData);
      })
      .catch(error => {
        console.error(error);
        sessionStorage.removeItem('authdata');
        window.location.reload();
      });
    }, []);

  useEffect(() => {
    if (kolo && User) {
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
        }).then(() => {
          window.location.reload();
        })
      .catch((error) => {
        console.log(error);
        sessionStorage.removeItem('authdata');
      });
    }
  }, [kolo, User]);

  return (
    <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" name="name" className="form-control" value={name} onChange={handleNameChange} required />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea id="description" name="description" className="form-control" value={description} onChange={handleDescriptionChange} rows={3} required />
        </div>
        <div className="mb-3">
          <label htmlFor="isPublic" className="form-label">Is Public</label>
          <select id="isPublic" name="isPublic" className="form-select" value={isPublic ? 'true' : 'false'} onChange={handleIsPublicChange}>
            <option value="false">private</option>
            <option value="true">public</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Create</button>
      </form>
  );
}

export default TextControlsExample;
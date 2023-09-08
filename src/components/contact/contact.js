import React from 'react';

function contact() {
  const daneKontaktowe = {
    imie: 'Rafał',
    nazwisko: 'Pezda',
    email: 'r.pezda@outlook.com',
  };

  return (
    <div className="App">
      <h1>Dane kontaktowe</h1>
      <p>Imię: {daneKontaktowe.imie}</p>
      <p>Nazwisko: {daneKontaktowe.nazwisko}</p>
      <p>Email: {daneKontaktowe.email}</p>
    </div>
  );
}

export default contact;
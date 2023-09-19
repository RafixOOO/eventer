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
  onChange={handleObrazekChange}
/>
<br />

<input
  type="text"
  id="imie"
  name="imie"
  placeholder={imie}
  onChange={handleImieChange}
/>
<input
  type="text"
  id="nazwisko"
  name="nazwisko"
  placeholder={nazwisko}
  onChange={handleNazwiskoChange}
/>

<br /><br />
<button className="btn btn-secondary" onClick={change}>
  Change
</button>
</form>
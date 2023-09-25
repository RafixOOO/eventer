import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Grid from './components/events/grid';
import Callendar from './components/callendar/callendar';
import Contact from './components/contact/contact';
import Grupa from './components/groups/navgropus'
import './App.css';

function App() {
    return (
        <div className="AppContainer">
        <Router>
      <Routes>
        <Route path="/" element={<Grid />} />
        <Route path="/callendar" element={<Callendar />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/groups" element={<Grupa />} />
      </Routes>
    </Router>
    </div>
    );
}

export default App;
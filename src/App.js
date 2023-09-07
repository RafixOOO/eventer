import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Grid from './components/events/grid';
import './App.css';

function App() {
    return (
        <div className="AppContainer">
        <Router>
      <Routes>
        <Route path="/" element={<Grid />} />
        {/* Dodaj inne trasy, jeśli są potrzebne */}
      </Routes>
    </Router>
    </div>
    );
}

export default App;
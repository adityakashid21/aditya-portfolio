import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PhonePortfolio from './components/PhonePortfolio';
import './App.css';

function App() {
  return (
    <BrowserRouter basename="/aditya-portfolio">
      <div className="App">
        <Routes>
          <Route path="/" element={<PhonePortfolio />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


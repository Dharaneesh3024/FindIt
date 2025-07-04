import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../components/home';
import Main from '../components/main1';
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Main" element={<Main />} />
        </Routes>
      </Router>
  );
}

export default App;

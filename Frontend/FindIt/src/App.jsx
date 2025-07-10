import React from 'react';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
import Home from '../components/home';
import Main from '../components/main1';
import './App.css';
import { useEffect } from 'react';
import { useState } from 'react';
import Profile from '../components/profile';

function App() {
   const [data, setData] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/data') 
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.error('Error:', err));
  }, []);
  return (
      
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
  );
}

export default App;

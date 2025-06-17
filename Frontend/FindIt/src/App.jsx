import React from 'react'
import Home from '../components/home'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Main from '../components/main';
import './App.css'
function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Main" element={<Main/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App

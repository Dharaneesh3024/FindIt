import React from "react";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "./main.css"; // External CSS import
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Button } from 'primereact/button'; 
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import TemplateDemo from "./upload";
function Main() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">FindIt</div>
        <div className="links">
          <p>About</p>
          <p>Contact</p>
          <p className="reg" style={{ cursor: "pointer" }} onClick={handleLogout}>
            Log-out
          </p>
        </div>
      </div>

      <p className="main-heading">Report Lost or Found Item</p>

      <label className="form-label">Item Title</label>
      <br /><br />
      <input className="form-input" required />
      <br /><br />

      <label className="form-label">Item Type</label>
      <br /><br />
      <input className="form-input" required />
      <br /><br />

      <label className="form-label">Location</label>
      <br /><br />
      <input className="form-input" required />
      <br /><br />

      <label className="form-label">Description</label>
      <br /><br />
      <input className="form-input description" required />
      <br /><br />
      <TemplateDemo/>

    </>
  );
}

export default Main;

import React, { useState } from "react";
import { auth } from "./firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import ImageUpload from "./file_upload";
import "./main1.css";

function Main() {
  const navigate = useNavigate();
  const [uploadedImage, setUploadedImage] = useState(null); 

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleImageSelect = (file) => {
    setUploadedImage(file); 
    console.log("Selected image file:", file);
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

      <ImageUpload onImageSelect={handleImageSelect} />
      <br/><br/>
      <button className="sub">Submit</button>
    </>
  );
}

export default Main;

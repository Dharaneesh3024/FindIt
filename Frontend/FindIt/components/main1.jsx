import React, { useEffect, useState } from "react";
import "./main1.css";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import ImageUpload from "./file_upload"; // for picking file

function Main() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    status: "",
    location: "",
    description: "",
  });

  // ✅ Logout
  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  // ✅ Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) setUser(currentUser);
      else navigate("/");
    });
    return () => unsubscribe();
  }, [navigate]);

  // ✅ Form input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ File select from child
  const handleImageSelect = (image) => {
    setFile(image);
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";

      if (file) {
        const formDataFile = new FormData();
        formDataFile.append("file", file); // must match backend multer field name

        const uploadRes = await fetch("http://localhost:5000/upload", {
          method: "POST",
          body: formDataFile,
        });

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.imageUrl;
      }

      const itemData = {
        ...formData,
        userEmail: user?.email,
        imageUrl,
      };

      const response = await fetch("http://localhost:5000/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemData),
      });

      if (response.ok) {
        alert("Item reported successfully!");
        setFormData({
          title: "",
          type: "",
          status: "",
          location: "",
          description: "",
        });
        setFile(null);
      } else {
        console.error("Failed to save item:", await response.text());
      }
    } catch (err) {
      console.error("Error submitting item:", err);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/Main")}>FindIt</div>
        <div className="links">
          <p className="LF">Lost & Found</p>
          <p className="contact">Contact</p>
          <p className="profile" onClick={() => navigate("/Profile")}>Profile</p>
          <p className="reg" style={{ cursor: "pointer" }} onClick={handleLogout}>Log-out</p>
        </div>
      </div>

      <p className="main-heading">Report Lost or Found Item</p>

      {/* Report Form */}
      <form onSubmit={handleSubmit}>
        <div className="entire">
        <div className="form-group">
          <label className="form-label">Item Title</label>
          <input className="form-input" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Item Type</label>
          <input className="form-input" name="type" value={formData.type} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-input" name="status" value={formData.status} onChange={handleChange} required>
            <option value="">Select status</option>
            <option value="Lost">Lost</option>
            <option value="Found">Found</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Location</label>
          <input className="form-input" name="location" value={formData.location} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <textarea className="form-input description" name="description" value={formData.description} onChange={handleChange} required />
        </div>

        {/* Image upload */}
        <div className="upload-wrapper">
          <ImageUpload onImageSelect={handleImageSelect} />
        </div>

        <button className="submit-btn" type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default Main;

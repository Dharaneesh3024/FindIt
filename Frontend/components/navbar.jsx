import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
import "./navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // 👈 menu toggle state

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
        <div className="logo" onClick={() => navigate("/Main")}>
          FindIt
        </div>

        {/* Hamburger Icon */}
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <div className={menuOpen ? "bar bar1 active" : "bar bar1"}></div>
          <div className={menuOpen ? "bar bar2 active" : "bar bar2"}></div>
          <div className={menuOpen ? "bar bar3 active" : "bar bar3"}></div>
        </div>

        {/* Links */}
        <div className={`links ${menuOpen ? "open" : ""}`}>
          <p className="LF" onClick={() => navigate("/view")}>
            Lost & Found
          </p>
          <p className="LF" onClick={() => navigate("/main")}>
            Report Items
          </p>
          <p className="contact" onClick={() => navigate("/contact")}>
            Contact
          </p>
          <p className="profile" onClick={() => navigate("/Profile")}>
            Profile
          </p>
          <p className="reg" onClick={handleLogout}>
            Log-out
          </p>
        </div>
      </div>
    </>
  );
}

export default Navbar;

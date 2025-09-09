import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
function Navbar(){
    const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully!");
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };
    const navigate=useNavigate();
return(
    <>
    <div className="navbar">
        <div className="logo" onClick={() => navigate("/Main")}>
          FindIt
        </div>
        <div className="links">
          <p className="LF" onClick={()=>{navigate("/view")}}>Lost & Found</p>
          <p className="LF" onClick={()=>{navigate("/main")}}>Report Items</p>
          <p className="contact" onClick={() => navigate("/contact")}>
            Contact
          </p>
          <p className="profile" onClick={() => navigate("/Profile")}>
            Profile
          </p>
          <p
            className="reg"
            style={{ cursor: "pointer" }}
            onClick={handleLogout}
          >
            Log-out
          </p>
        </div>
      </div>
    </>
)
}
export default Navbar;
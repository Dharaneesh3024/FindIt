import React from "react";
import { auth } from "./firebase-config";   // adjust path as needed
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate=useNavigate();
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
      <p style={{fontSize:"35px",marginLeft:"8%"}}>Report Lost or Found Item</p>
      <label id="label"style={{fontSize:"20px",marginLeft:"8%"}}>Item Title</label><br/><br/>
      <input id="box" required style={{fontSize:"18px",marginLeft:"8%",borderColor:"powderblue",borderRadius:"0.4em",height:"40px",width:"22%",borderWidth:"3px"}}/>
      <br/><br/>
      <label id="label"style={{fontSize:"20px",marginLeft:"8%"}}>Item Type</label><br/><br/>
      <input id="box" required style={{fontSize:"15px",marginLeft:"8%",borderColor:"powderblue",borderRadius:"0.4em",height:"35px",width:"22%",borderWidth:"3px"}}/>
      <br/><br/>
      <label id="label"style={{fontSize:"20px",marginLeft:"8%"}}>Location</label><br/><br/>
      <input id="box" required style={{fontSize:"15px",marginLeft:"8%",borderColor:"powderblue",borderRadius:"0.4em",height:"50px",width:"22%",borderWidth:"3px"}}/>
<br/><br/>
      <label id="label"style={{fontSize:"20px",marginLeft:"8%"}}>Description</label><br/><br/>
      <input id="box" required style={{fontSize:"15px",marginLeft:"8%",borderColor:"powderblue",borderRadius:"0.4em",height:"80px",width:"30%",borderWidth:"3px"}}/>


    </>
  );
}

export default Main;

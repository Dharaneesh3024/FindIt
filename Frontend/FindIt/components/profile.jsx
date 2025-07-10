import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { signOut} from "firebase/auth";

function Profile() {
  const [userEmail, setUserEmail] = useState("");
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe(); 
  }, [navigate]);

  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={()=>{navigate('/Main')}}>FindIt</div>
        <div className="links">
          <p className="LF">Lost & Found</p>
          <p className="contact">Contact</p>
          <p className="profile">Profile</p>
          <p className="reg" style={{ cursor: "pointer" }} onClick={handleLogout}>
            Log-out
          </p>
        </div>
      </div>

      <div className="profile-container">
        <h2>Your Profile</h2>
        <p><strong>Email:</strong> {userEmail}</p>
      </div>
    </>
  );
}

export default Profile;
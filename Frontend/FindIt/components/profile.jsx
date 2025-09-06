import { useEffect, useState } from "react";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [user, setUser] = useState(null);
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
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log(currentUser);
        setUser(currentUser); // store full user object
      } else {
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <div className="navbar">
        <div className="logo" onClick={() => navigate("/Main")}>FindIt</div>
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
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Name:</strong> {user?.displayName || "No name set"}</p>
       <img
  src={user?.photoURL}
  alt="profile pic"
  style={{ borderRadius: "50%", width: "100px", height: "100px" }}
/>
      </div>
    </>
  );
}

export default Profile;

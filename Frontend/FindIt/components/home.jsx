import "./home.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "./firebase-config";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";

function Home() {
  const [userEmail, setUserEmail] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
       provider.setCustomParameters({
        prompt: "select_account",
      }); 

      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email.endsWith("@bitsathy.ac.in")) {
        setUserEmail(email);
        alert("Login successful!");
        navigate("/Main"); // ✅ redirect
      } else {
        alert("Access denied: Use your @bitsathy.ac.in email.");
        await signOut(auth);
        setUserEmail(null);
      }
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const email = user.email;
        if (!email.endsWith("@bitsathy.ac.in")) {
          await signOut(auth);
          setUserEmail(null);
        } else {
          setUserEmail(email);
          navigate("/Main"); 
        }
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <>
      <div className="navbar">
        <div className="logo">FindIt</div>
        <div className="links">
          <p>About</p>
          <p>Contact</p>
          <p className="reg" onClick={handleLogin}>Login</p>
        </div>
      </div>

      <img src="/components/BIT homepage.png" alt="college-image" className="image" />

      <div className="section">
        <p className="para">Find Your Lost items with FindIt</p>
      </div>

      <p className="sub">
        A centralized platform for students and staff of BITSathy to report,
        search, and recover lost or found items across the campus.
      </p>
    </>
  );
}

export default Home;

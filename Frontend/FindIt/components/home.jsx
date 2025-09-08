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
      provider.setCustomParameters({ prompt: "select_account" });
      const result = await signInWithPopup(auth, provider);
      const email = result.user.email;

      if (email.endsWith("@bitsathy.ac.in")) {
        setUserEmail(email);
        alert("Login successful!");
        navigate("/Main");
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
    <div className="home-page">
      <div className="home-card">
        <h2 className="home-welcome">Welcome !!</h2>
        <p className="home-subtitle">Sign in with your username or BITSathy email</p>

        {/* Username & Password fields */}
        <form className="home-form">
          <input type="text" placeholder="Username" className="home-input" />
          <input type="password" placeholder="Password" className="home-input" />
          <button type="submit" className="home-btn">Sign In</button>
        </form>

        {/* Divider */}
        <div className="home-divider">
          <span>OR</span>
        </div>

        {/* Google Sign-in button */}
        <button className="home-google-btn" onClick={handleLogin}>
          <img
            src="https://developers.google.com/identity/images/g-logo.png"
            alt="Google logo"
          />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Home;

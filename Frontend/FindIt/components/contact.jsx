import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { FaInstagram, FaGithub, FaEnvelope } from "react-icons/fa";
import "./contact.css";
import Navbar from "./navbar";

function Contact() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  // Static backend URL
  

  // Auth check
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setUserEmail(user.email);
      else setUserEmail("");
    });
    return () => unsubscribe();
  }, []);


  // Submit message
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message) {
      alert("Please fill all fields!");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER_APP_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: userEmail, message }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert("Error: " + (data.error || "Failed to send message"));
      } else {
        alert("✅ Message submitted successfully!");
        setName("");
        setMessage("");
      }
    } catch (err) {
      console.error("Submit error:", err);
      alert("Something went wrong! Check if backend is running.");
    }
  };

  return (
    <>
      <Navbar/>
      {/* Contact Page */}
      <div className="contact-page">
        <h1>Contact Us</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input type="email" value={userEmail} disabled />
          <textarea
            placeholder="Your Message"
            rows="5"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <button type="submit">Send Message</button>
        </form>

        {/* Social Links */}
        <div className="social-links">
          <p>
            <FaInstagram />{" "}
            <a
              href="https://www.instagram.com/_.dxaraneexh._/?igsh=MXZydXhneDBsZmdraw%3D%3D#"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </p>
          <p>
            <FaGithub />{" "}
            <a
              href="https://github.com/Dharaneesh3024/"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </p>
          <p>
            <FaEnvelope />{" "}
            <a
              href="mailto:dharaneesh3024@gmail.com"
              target="_blank"
              rel="noreferrer"
            >
              Mail
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Contact;

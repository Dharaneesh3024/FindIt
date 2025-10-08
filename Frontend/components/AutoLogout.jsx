import { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "./firebase-config";
export default function AutoLogout() {
  useEffect(() => {
    let timer = setTimeout(() => {
      signOut(auth);  // auto logout after 10 mins
    }, 10 * 60 * 1000);

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        signOut(auth);
      }, 10 * 60 * 1000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  return null;
}

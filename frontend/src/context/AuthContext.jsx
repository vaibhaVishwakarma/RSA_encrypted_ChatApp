<<<<<<< HEAD
import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, clearAuth } from "../utils/api";
=======
import { createContext, useContext, useState } from "react";
>>>>>>> 6674c8e (project)

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
<<<<<<< HEAD
  const [authUser, setAuthUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    const stored = getAuth();
    if (stored?.user && stored?.token) {
      setAuthUser(stored.user);
    } else if (stored && (!stored.token || !stored.user)) {
      clearAuth();
    }
    setAuthReady(true);
  }, []);

  useEffect(() => {
    const handleAuthExpired = () => setAuthUser(null);
    window.addEventListener("auth-expired", handleAuthExpired);
    return () => window.removeEventListener("auth-expired", handleAuthExpired);
  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, authReady }}>
=======
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
>>>>>>> 6674c8e (project)
      {children}
    </AuthContext.Provider>
  );
};

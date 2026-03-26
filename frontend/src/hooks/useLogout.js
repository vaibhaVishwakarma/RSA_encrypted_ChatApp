import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { apiUrl, clearAuth } from "../utils/api";
=======
>>>>>>> 6674c8e (project)

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await fetch(apiUrl("/api/auth/logout"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
=======
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
>>>>>>> 6674c8e (project)
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
<<<<<<< HEAD
      clearAuth();
=======
      localStorage.removeItem("chat-user");
>>>>>>> 6674c8e (project)
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, logout };
};

export default useLogout;

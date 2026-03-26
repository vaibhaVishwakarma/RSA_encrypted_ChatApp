import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { apiUrl, setAuth } from "../utils/api";
=======
>>>>>>> 6674c8e (project)

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async (username, password) => {
    const success = handleInputErrors(username, password);
    if (!success) return;
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
=======
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
>>>>>>> 6674c8e (project)
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
<<<<<<< HEAD
      const { token, ...user } = data;
      if (!token) throw new Error("Login failed - no token received");
      setAuth(user, token);
      setAuthUser(user);
=======
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
>>>>>>> 6674c8e (project)
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, login };
};

export default useLogin;

function handleInputErrors(username, password) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  return true;
}

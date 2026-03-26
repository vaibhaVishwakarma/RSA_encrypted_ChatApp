import { useState, useEffect } from "react";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { authFetch } from "../utils/api";
=======
>>>>>>> 6674c8e (project)

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        const res = await authFetch("/api/users");
=======
        const res = await fetch("/api/users");
>>>>>>> 6674c8e (project)
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setConversations(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;

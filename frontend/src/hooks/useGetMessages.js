import { useState, useEffect } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { authFetch } from "../utils/api";
=======
>>>>>>> 6674c8e (project)

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
<<<<<<< HEAD
        const res = await authFetch(`/api/messages/${selectedConversation._id}`);
=======
        const res = await fetch(`/api/messages/${selectedConversation._id}`);
>>>>>>> 6674c8e (project)
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation?._id, setMessages]);
  return { messages, loading };
};

export default useGetMessages;

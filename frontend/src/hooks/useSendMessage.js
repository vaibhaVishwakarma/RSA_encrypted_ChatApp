import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";
<<<<<<< HEAD
import { authFetch } from "../utils/api";
=======
>>>>>>> 6674c8e (project)

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const sendMessage = async (message) => {
    setLoading(true);
    try {
<<<<<<< HEAD
      const res = await authFetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
=======
      const res = await fetch(
        `/api/messages/send/${selectedConversation._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
>>>>>>> 6674c8e (project)
          body: JSON.stringify({ message }),
        }
      );
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { sendMessage, loading };
};

export default useSendMessage;

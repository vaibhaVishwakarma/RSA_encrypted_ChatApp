import { createContext, useContext, useState, useEffect } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();
  const socketUrl = import.meta.env.DEV
    ? "http://localhost:5000"
    : import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL || window.location.origin;

  useEffect(() => {
    if (authUser) {
      const socket = io(socketUrl, {
        withCredentials: true,
        query: {
          userId: authUser._id,
        },
      });
      setSocket(socket);
      socket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser, socketUrl]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

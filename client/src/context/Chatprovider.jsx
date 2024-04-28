import { createContext, useContext, useEffect, useState } from "react";

const ChatContext = createContext();
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

const ChatProvider = ({ children }) => {
  const [user, setUser] = useState("");
  const [selectedChat, setSelectedChat] = useState();
  const [chats, setChats] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // theme state future implementation
  const navigate = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
    } else {
      setUser(null);
      navigate("/signin");
    }
  }, []);

  return (
    <ChatContext.Provider
      value={{
        user,
        setUser,
        selectedChat,
        setSelectedChat,
        chats,
        setChats,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};
// useContext(ChatContext);

export default ChatProvider;

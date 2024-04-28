import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatState } from "../context/Chatprovider";

const CallLogics = () => {
  const { user } = ChatState();
  const navigate = useNavigate();

  const handleVideo = async (chatId) => {
    try {
      const message = `${user.name} is requesting you to join a video call at http://localhost:5173/videochat/:${chatId}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/message",
        { content: message, chatId: chatId },
        config
      );

      console.log(data);

      navigate(`/videochat/:${chatId}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleVoice = async (chatId) => {
    try {
      const message = `${user.name} is requesting you to join a voice call at http://localhost:5173/voicechat/:${chatId}`;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/v1/message",
        { content: message, chatId: chatId },
        config
      );

      console.log(data);

      navigate(`/voicechat/:${chatId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return { handleVideo, handleVoice };
};

export default CallLogics;

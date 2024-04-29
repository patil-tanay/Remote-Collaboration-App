import React, { useEffect } from "react";
import { IconButton } from "@mui/material";
import AttachFile from "@mui/icons-material/AttachFile";
import { ChatState } from "../context/Chatprovider";
import { io } from "socket.io-client";
import { sendMessage } from "../../../server/Controllers/messageController";
export default function FileUploadButton() {
  const ENDPOINT = "http://localhost:5000";
  var socket = io(ENDPOINT);
  const fileInputRef = React.useRef(null);
  const { user, selectedChat } = ChatState();
  const sendFile = async (chatId, link) => {
    try {
      const message = `${user.name} has sent you a file - ${link}`;
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
    } catch (error) {
      console.log(error);
    }
  };
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("messageFile", file);

    const response = await fetch("http://localhost:5000/api/v1/message/files", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Server error");
    }

    const data = await response.json();
    console.log(data);
    const fileUrl = data.data;
    sendFile(selectedChat._id, fileUrl);
    socket.emit("share file", fileUrl);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <IconButton color="primary" onClick={handleClick}>
        <AttachFile />
      </IconButton>
    </div>
  );
}

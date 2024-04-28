import React, { useEffect } from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { getSender, getSenderEmail } from "../config/ChatLogics";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

const UserProfile = ({ user, selectedChat }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      {user && selectedChat && (
        <Avatar
          onClick={handleOpen}
          sx={{
            margin: "10px 15px",
            marginTop: 2,
            width: 34,
            height: 34,
            color: "#751CCE",
            backgroundColor: "#EDE4F5",
            cursor: "pointer",
          }}
        >
          {selectedChat && selectedChat.isGroupChat
            ? selectedChat && selectedChat.chatName[0]
            : getSender(user, selectedChat.users) &&
              getSender(user, selectedChat.users)[0]}
        </Avatar>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "10px",
            boxShadow: 12,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {selectedChat
              ? selectedChat.isGroupChat
                ? selectedChat.chatName
                : getSender(user, selectedChat.users)
              : "Chat App"}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {selectedChat
              ? selectedChat.isGroupChat
                ? "Users in this group: " +
                  selectedChat.users.map((user) => user.name).join(", ")
                : getSenderEmail(user, selectedChat.users)
              : "Welcome to Chat App"}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default UserProfile;

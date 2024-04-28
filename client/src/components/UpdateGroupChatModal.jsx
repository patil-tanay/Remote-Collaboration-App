import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ChatState } from "../context/Chatprovider";
import UserBadgeItem from "./UserBadgeItem";
import axios from "axios";

const UpdateGroupChatModal = ({ fetchAgain, setFetchAgain }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [groupChatName, setGroupChatName] = useState("");
  const [groupChatMembers, setGroupChatMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, selectedChat, setSelectedChat } = ChatState();

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/v1/users?search=${searchQuery}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSearchResults(data);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleAddUser = async (userToAdd) => {
    if (groupChatMembers.includes(userToAdd)) {
      console.log("already in group");
      return;
    }
    if (selectedChat.groupAdmin._id !== user._id) {
      console.log("Only admin can add members");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/chat/groupadd",
        { chatId: selectedChat._id, userId: userToAdd._id },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };
  const handleRemove = async (userToDelete) => {
    if (selectedChat.groupAdmin._id !== user._id) {
      console.log("Only admin can remove members");
      return;
    }
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/chat/groupremove",
        { chatId: selectedChat._id, userId: userToDelete._id },
        config
      );

      userToDelete._id === user._id ? setSelectedChat() : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
    }
  };

  const handleRename = async (e) => {
    if (!groupChatName) return;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      const { data } = await axios.put(
        "http://localhost:5000/api/v1/chat/rename",
        { chatId: selectedChat._id, chatName: groupChatName },
        config
      );
      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      console.log(error);
      setGroupChatName("");
    }
  };

  return (
    <>
      <MoreHorizIcon
        onClick={handleOpen}
        sx={{ color: "black", fontSize: "30px" }}
      />

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
          <Typography id="modal-modal-title" variant="h4" component="h2">
            {selectedChat.chatName}
          </Typography>
          <Box>
            {selectedChat &&
              selectedChat.users.map((member) => (
                <UserBadgeItem
                  key={member._id}
                  user={member}
                  handleFunction={() => handleRemove(member)}
                />
              ))}
          </Box>
          <form action="">
            <input
              type="text"
              placeholder="Group Name"
              style={{
                width: "100%",
                height: "40px",
                marginTop: "10px",
                fontSize: "18px",
              }}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#751CCE",
                color: "#E5D6F4",
                width: "content-fit",
                height: "40px",
                marginTop: "10px",
                marginBottom: "10px",
              }}
              onClick={handleRename}
            >
              Rename
            </Button>
            <input
              type="text"
              placeholder="Add Members"
              style={{
                width: "100%",
                height: "40px",
                marginTop: "5px",
                fontSize: "18px",
              }}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <Box>
              {searchResults.slice(0, 4).map((result) => (
                <div
                  key={result._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "5px",
                    padding: "0px 5px",

                    borderRadius: "5px",
                    backgroundColor: "#751CCE",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      color: "white",
                      margin: "0px 10px",
                    }}
                  >
                    {result.name}
                  </h3>

                  <button
                    style={{
                      backgroundColor: "#E5D6F4",
                      color: "black",
                      border: "none",
                      borderRadius: "5px",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "500",
                      margin: "5px 0px",
                    }}
                    onClick={() => handleAddUser(result)}
                  >
                    Add
                  </button>
                </div>
              ))}
            </Box>
            <Button
              variant="contained"
              color="error"
              sx={{
                color: "#E5D6F4",
                width: "content-fit",
                height: "40px",
                marginTop: "20px",
                marginBottom: "5px",
                marginLeft: "98px",
              }}
              onClick={() => {
                handleRemove(user);
              }}
            >
              Leave Group
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;

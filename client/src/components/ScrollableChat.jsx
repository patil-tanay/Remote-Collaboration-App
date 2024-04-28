import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useState } from "react";
import ScrollableFeed from "react-scrollable-feed";
import {
  isSameSender,
  isLastMessage,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../context/Chatprovider";
import Tooltip from "@mui/material/Tooltip";
import Avatar from "@mui/material/Avatar";
import "./scroll.css";
const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  return (
    <ScrollableFeed className="scroll">
      {messages &&
        messages.map((m, i) => (
          <div
            key={m._id}
            style={{
              display: "flex",
            }}
          >
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip title={m.sender.name}>
                <Avatar
                  sx={{
                    width: "35px",
                    height: "35px",
                    margin: "5px 5px 0px 5px",
                    backgroundColor: "black",
                    color: "white",
                  }}
                >
                  {m.sender.name[0]}
                </Avatar>
              </Tooltip>
            )}
            <Tooltip
              title={
                "Sent at " +
                new Date(m.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              }
              placement="left"
            >
              <span
                style={{
                  backgroundColor: `${
                    m.sender._id === user._id ? "#d3d3d3" : "black"
                  }`,
                  color: `${m.sender._id === user._id ? "black" : "white"}`,
                  borderRadius: "20px",
                  padding: "7px 15px",
                  width: "fit-content",
                  maxWidth: "70%",
                  marginTop: `${isSameUser(messages, m, i) ? "10px" : "18px"}`,
                  marginLeft: isSameSenderMargin(messages, m, i, user._id),
                  borderTopLeftRadius: `${m.sender._id !== user._id && "0px"}`,
                  borderTopRightRadius: `${m.sender._id === user._id && "0px"}`,
                }}
              >
                {m.content}
              </span>
            </Tooltip>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;

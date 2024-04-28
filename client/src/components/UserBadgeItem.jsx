import React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Close from "@mui/icons-material/Close";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import IconButton from "@mui/material/IconButton";

const UserBadgeItem = ({ user, handleFunction }) => {
  return (
    <span
      style={{
        display: "inline-block",
        margin: "1px",
      }}
    >
      <Box
        sx={{
          padding: "2px 4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "20px",
          backgroundColor: "#751CCE",
          color: "white",
          width: "fit-content",
          m: 0.5,
          mb: 1,
          fontSize: "12px",
        }}
      >
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#E5D6F4",
            margin: "0px 5px",
            display: "inline",
            marginLeft: "10px",
          }}
        >
          {user.name}
        </Typography>
        <IconButton
          sx={{
            color: "#E5D6F4",

            margin: 0,
            padding: 1,
          }}
          onClick={handleFunction}
        >
          <CloseOutlinedIcon
            sx={{
              width: "16px",
              height: "16px",
            }}
          />
        </IconButton>
      </Box>
    </span>
  );
};

export default UserBadgeItem;

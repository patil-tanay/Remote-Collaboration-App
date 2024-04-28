/* eslint-disable */
import React, { useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Signup.css";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/api/v1/users/register", {
      name: username,
      email: email,
      password: password,
    });
    //   .then((response) => {
    //     // Handle the response from your API
    //     if (response.data.success) {
    //       alert("Signup successful");
    //       // Redirect the user to the login page, or log them in
    //     } else {
    //       alert(`Signup failed: ${response.data.message}`);
    //     }
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //     alert("An error occurred. Please try again.");
    //   });
  };

  return (
    <div className="signup-container">
      <AccountCircleIcon sx={{ fontSize: 40 }} />
      <h2 className="signup-title">Sign Up</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <TextField
            className="email-input"
            label="Email"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-field">
          <TextField
            className="username-input"
            label="Username"
            type="text"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-field">
          <TextField
            className="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button
          className="signup-button"
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#000000",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;

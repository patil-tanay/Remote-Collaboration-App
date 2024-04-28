/* eslint-disable */
import React, { useEffect, useState } from "react";
import { Button, TextField, Container } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import "./Signin.css";
import axios from "axios";
import { ChatState } from "../context/Chatprovider";
import { Navigate, useNavigate } from "react-router-dom";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const { user, setUser } = ChatState();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        { email, password }
      );
      // Handle the response as needed
      console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      if (response.status == 200) nav("/user");
    } catch (error) {
      // Handle the error
      console.error(error);
    }
  };
  useEffect(() => {
    const userInfo = localStorage.getItem("user");
    if (userInfo) {
      setUser(JSON.parse(userInfo));
      nav("/user");
    }
  }, []);

  return (
    <div className="signin-container">
      <LoginIcon sx={{ fontSize: 40 }} />
      <h2 className="signin-title">Sign In</h2>
      <form className="signin-form" onSubmit={handleSubmit}>
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
            className="password-input"
            label="Password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <Button
          className="signin-button"
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            backgroundColor: "#000000",
            color: "white",
          }}
          onClick={handleSubmit}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
};

export default Signin;

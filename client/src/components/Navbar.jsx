
/* eslint-disable */
import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="\src\assets\collaborative.png" alt="Logo" width={"45px"} />
        Colabo.
      </div>
      <ul className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </ul>
    </nav>
  );
};

export default Navbar;

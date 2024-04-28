
/* eslint-disable */
import React from "react";
import "./Navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="\src\assets\collaborative.png" alt="Logo" width={"45px"} />
        Colabo.
      </div>
      <div className="nav-links">
        {path === "/" ? (
          <div>
            <Link to="/signin">Sign In</Link> <Link to="signup">Sign Up</Link>
          </div>
        ) : path === "/signin" ? (
          <div>
            <Link to="/">Home</Link> <Link to="signup">Sign Up</Link>
          </div>
        ) : path === "/signup" ? (
          <div>
            <Link to="/">Home</Link> <Link to="signin">Sign In</Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;


/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";
const LandingPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Welcome to Colabo.
      </h1>
      <p>
        Colabo is a platform that allows you to collaborate with others on
        projects.
      </p>
      <Link to="/signup" className="link-text">
        Sign Up to get started!
      </Link>
      {/* <Link className="link" to="/signup">
            Sign Up
        </Link>
        <br />
        <p className="link-text">Already have an account?</p>
        <Link className="link" to="/signin">
            Sign In
        </Link> */}
      <div className="about">
        <h2>About Us</h2>
        <p>
          We are a team of developers who are passionate about creating tools
          that make remote work easier and more efficient. Our mission is to
          provide a platform that enables teams to collaborate seamlessly
          regardless of their location. With Colabo, you can communicate,
          coordinate, and manage tasks with ease, all in one place.
        </p>
      </div>
      <div className="contact">
        <h2>Contact Us</h2>
        <p>
          If you have any questions or feedback, feel free to reach out to us.
          We would love to hear from you!
        </p>
        <p>Email: info@colabo.com</p>
        <p>Phone: 123-456-7890</p>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Colabo. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

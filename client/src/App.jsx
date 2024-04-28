/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import User from "./Pages/User";
import VideoChat from "./Pages/VideoChat";
import VoiceChat from "./Pages/VoiceChat";
import { ChatState } from "./context/Chatprovider";
import { createTheme, ThemeProvider } from "@mui/material";
import { useLocation } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "black", // Change this to your desired primary color
    },
    secondary: {
      main: "#d3d3d3", // Change this to your desired secondary color
    },
    error: {
      main: "#f44336", // Change this to your desired error color
    },
    background: {
      default: "#fff", // Change this to your desired background color
    },
  },
});

const App = () => {
  const { selectedChat } = ChatState();
  const location = useLocation();
  const path = location.pathname;

  return (
    <ThemeProvider theme={theme}>
      <div>
        {path !== "/user" && path !== "/videochat" && path !== "/voicechat" && (
          <Navbar />
        )}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/user" element={<User />} />
          <Route
            path="/videochat"
            element={
              selectedChat ? (
                <VideoChat id={selectedChat._id} />
              ) : (
                <div>No chat selected</div>
              )
            }
          />
          <Route
            path="/voicechat"
            element={
              selectedChat ? (
                <VoiceChat id={selectedChat._id} />
              ) : (
                <div>No chat selected</div>
              )
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
};
export default App;

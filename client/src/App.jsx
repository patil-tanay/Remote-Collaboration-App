/* eslint-disable no-unused-vars */
import { Route, Routes } from "react-router-dom";
/* eslint-disable no-unused-vars */
import Navbar from "./components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";
import User from "./Pages/User";
import VideoChat from "./Pages/VideoChat";

import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <div>
      {path !== "/user" && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/user" element={<User />} />
        <Route path="/videochat" element={<VideoChat />} />
      </Routes>
    </div>
  );
};
export default App;

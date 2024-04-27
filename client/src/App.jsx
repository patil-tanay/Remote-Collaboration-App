import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage";
import Signup from "./Pages/Signup";
import Signin from "./Pages/Signin";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
};
export default App;

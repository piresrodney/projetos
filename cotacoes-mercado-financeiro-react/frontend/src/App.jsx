import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// components
import Navbar from "./components/layout/Navbar";

// pages
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NewStock from "./components/pages/NewStock";
import NewAccount from "./components/pages/NewAccount";

// context
import { UserProvider } from "./context/UserContext";

function App() {
  return (
    <Router>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/newaccount" element={<NewAccount />} />
          <Route path="/stocks" element={<Home />} />
          <Route path="/newstock" element={<NewStock />} />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Monitor from "./pages/Monitor";
import CarbonTracker from "./pages/CarbonTracker";
import Recommendations from "./pages/Recommendations";
import Score from "./pages/Score";
import Simulator from "./pages/Simulator";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/"               element={<Home />} />
            <Route path="/monitor"        element={<Monitor />} />
            <Route path="/carbon"         element={<CarbonTracker />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/score"          element={<Score />} />
            <Route path="/simulator"      element={<Simulator />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
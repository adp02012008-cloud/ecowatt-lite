import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Monitor from "./pages/Monitor";
import CarbonTracker from "./pages/CarbonTracker";
import Recommendations from "./pages/Recommendations";
import Score from "./pages/Score";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/carbon" element={<CarbonTracker />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/score" element={<Score />} />
      </Routes>
    </BrowserRouter>
  );
}
import { Link } from "react-router-dom";

export default function Home() {
  const predictedUnits = 11.0;

  return (
    <div className="page">
      <div className="hero">
        <h1>EcoWatt Lite</h1>
        <p>AI-Powered Smart Energy Monitoring and Carbon Intelligence Platform</p>
      </div>

      <div className="card">
        <h2>Main Prediction</h2>
        <p className="big-value">{predictedUnits} kWh</p>
        <p>
          Predicted next-day energy usage based on recent consumption pattern.
        </p>
      </div>

      <div className="card">
        <h2>Project Flow Chart</h2>
        <div className="flow-chart">
          <div className="flow-box">User Energy Data</div>
          <div className="arrow">↓</div>
          <div className="flow-box">Monitoring & Analysis</div>
          <div className="arrow">↓</div>
          <div className="flow-box">Prediction Logic</div>
          <div className="arrow">↓</div>
          <div className="flow-box">Carbon Calculation</div>
          <div className="arrow">↓</div>
          <div className="flow-box">Smart Recommendation</div>
          <div className="arrow">↓</div>
          <div className="flow-box">Eco Score Output</div>
        </div>
      </div>

      <div className="nav-grid">
        <Link to="/monitor" className="nav-card">Energy Monitoring</Link>
        <Link to="/carbon" className="nav-card">Carbon Tracker</Link>
        <Link to="/recommendations" className="nav-card">Recommendations</Link>
        <Link to="/score" className="nav-card">Eco Score</Link>
      </div>
    </div>
  );
}
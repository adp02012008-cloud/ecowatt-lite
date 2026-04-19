import { useState } from "react";
import { Link } from "react-router-dom";

export default function CarbonTracker() {
  const [units, setUnits] = useState("");
  const [result, setResult] = useState(null);

  const emissionFactor = 0.695;

  function calculateCarbon() {
    const value = parseFloat(units);

    if (isNaN(value) || value < 0) {
      alert("Please enter valid kWh.");
      return;
    }

    const carbonKg = value * emissionFactor;
    const treesNeeded = carbonKg / 21.77;

    setResult({
      units: value,
      carbonKg: carbonKg.toFixed(2),
      treesNeeded: treesNeeded.toFixed(2),
    });
  }

  return (
    <div className="page">
      <div className="topbar">
        <h1>Carbon Tracker</h1>
        <Link to="/" className="btn">Back</Link>
      </div>

      <div className="card">
        <h2>Enter Electricity Usage</h2>
        <input
          type="number"
          value={units}
          onChange={(e) => setUnits(e.target.value)}
          placeholder="Enter kWh"
          className="input"
        />
        <button onClick={calculateCarbon} className="btn primary">
          Calculate
        </button>
      </div>

      {result && (
        <div className="stats-row">
          <div className="card">
            <h3>Electricity Used</h3>
            <p className="big-value">{result.units} kWh</p>
          </div>

          <div className="card">
            <h3>Estimated CO₂</h3>
            <p className="big-value">{result.carbonKg} kg</p>
          </div>

          <div className="card">
            <h3>Trees Needed</h3>
            <p className="big-value">{result.treesNeeded}</p>
          </div>
        </div>
      )}
    </div>
  );
}
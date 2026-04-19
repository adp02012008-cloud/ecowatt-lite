// import { useState } from "react";

// export default function CarbonTracker() {
//   const [units, setUnits] = useState("");
//   const [result, setResult] = useState(null);

//   const emissionFactor = 0.695;

//   function calculateCarbon() {
//     const value = parseFloat(units);

//     if (isNaN(value) || value <= 0) {
//       alert("Please enter valid electricity usage in kWh.");
//       return;
//     }

//     const carbonKg = value * emissionFactor;
//     const treesNeeded = carbonKg / 21.77;

//     setResult({
//       units: value,
//       carbonKg: carbonKg.toFixed(2),
//       treesNeeded: treesNeeded.toFixed(2),
//     });
//   }

//   return (
//     <div className="page">
//       <div className="page-title-row">
//         <div>
//           <p className="section-tag">Carbon Module</p>
//           <h1>Carbon Tracker</h1>
//           <p className="subtext">
//             Estimate carbon footprint using actual electricity usage input.
//           </p>
//         </div>
//       </div>

//       <div className="premium-card input-card">
//         <h2>Enter Electricity Usage</h2>
//         <p className="info-text">
//           Use your meter reading or EB bill units to calculate estimated carbon
//           emissions.
//         </p>

//         <div className="input-row">
//           <input
//             type="number"
//             value={units}
//             onChange={(e) => setUnits(e.target.value)}
//             placeholder="Enter kWh"
//             className="premium-input"
//           />
//           <button onClick={calculateCarbon} className="primary-btn">
//             Calculate
//           </button>
//         </div>
//       </div>

//       {result && (
//         <div className="stats-grid">
//           <div className="premium-card stat-box">
//             <p>Electricity Used</p>
//             <h3>{result.units} kWh</h3>
//           </div>
//           <div className="premium-card stat-box">
//             <p>Estimated CO₂</p>
//             <h3>{result.carbonKg} kg</h3>
//           </div>
//           <div className="premium-card stat-box">
//             <p>Trees Needed</p>
//             <h3>{result.treesNeeded}</h3>
//           </div>
//         </div>
//       )}

//       <div className="premium-card">
//         <p className="section-tag">Method</p>
//         <h2>Calculation Logic</h2>
//         <p className="info-text">
//           Estimated CO₂ = Electricity Used × 0.695 kg CO₂/kWh
//         </p>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";

export default function CarbonTracker() {
  const [units, setUnits] = useState("");
  const [result, setResult] = useState(() => {
    const saved = localStorage.getItem("carbonTrackerData");
    return saved ? JSON.parse(saved) : null;
  });

  const emissionFactor = 0.695;

  function calculateCarbon() {
    const value = parseFloat(units);

    if (isNaN(value) || value <= 0) {
      alert("Please enter valid electricity usage in kWh.");
      return;
    }

    const carbonKg = value * emissionFactor;
    const treesNeeded = carbonKg / 21.77;

    const finalResult = {
      units: value,
      carbonKg: carbonKg.toFixed(2),
      treesNeeded: treesNeeded.toFixed(2),
    };

    setResult(finalResult);
    localStorage.setItem("carbonTrackerData", JSON.stringify(finalResult));
    setUnits("");
  }

  function resetCarbon() {
    setResult(null);
    setUnits("");
    localStorage.removeItem("carbonTrackerData");
  }

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Carbon Module</p>
          <h1>Carbon Tracker</h1>
          <p className="subtext">
            Estimate carbon footprint using actual electricity usage input.
          </p>
        </div>
      </div>

      <div className="premium-card input-card">
        <h2>Enter Electricity Usage</h2>
        <p className="info-text">
          Use your meter reading or EB bill units to calculate estimated carbon emissions.
        </p>

        <div className="input-row">
          <input
            type="number"
            value={units}
            onChange={(e) => setUnits(e.target.value)}
            placeholder="Enter kWh"
            className="premium-input"
          />
          <button onClick={calculateCarbon} className="primary-btn">
            Calculate
          </button>
          <button onClick={resetCarbon} className="secondary-btn">
            Reset
          </button>
        </div>
      </div>

      {result && (
        <div className="stats-grid">
          <div className="premium-card stat-box">
            <p>Electricity Used</p>
            <h3>{result.units} kWh</h3>
          </div>
          <div className="premium-card stat-box">
            <p>Estimated CO₂</p>
            <h3>{result.carbonKg} kg</h3>
          </div>
          <div className="premium-card stat-box">
            <p>Trees Needed</p>
            <h3>{result.treesNeeded}</h3>
          </div>
        </div>
      )}

      <div className="premium-card">
        <p className="section-tag">Method</p>
        <h2>Calculation Logic</h2>
        <p className="info-text">
          Estimated CO₂ = Electricity Used × 0.695 kg CO₂/kWh
        </p>
      </div>
    </div>
  );
}
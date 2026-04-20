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

// import { useState, useEffect } from "react";

// export default function CarbonTracker() {
//   const [units, setUnits] = useState("");
//   const [result, setResult] = useState(() => {
//     const saved = localStorage.getItem("carbonTrackerData");
//     return saved ? JSON.parse(saved) : null;
//   });

//   const emissionFactor = 0.695;

//   function calculateCarbon() {
//     const value = parseFloat(units);

//     if (isNaN(value) || value <= 0) {
//       alert("Please enter valid electricity usage in kWh.");
//       return;
//     }

//     const carbonKg = value * emissionFactor;
//     const treesNeeded = carbonKg / 21.77;

//     const finalResult = {
//       units: value,
//       carbonKg: carbonKg.toFixed(2),
//       treesNeeded: treesNeeded.toFixed(2),
//     };

//     setResult(finalResult);
//     localStorage.setItem("carbonTrackerData", JSON.stringify(finalResult));
//     setUnits("");
//   }

//   function resetCarbon() {
//     setResult(null);
//     setUnits("");
//     localStorage.removeItem("carbonTrackerData");
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
//           Use your meter reading or EB bill units to calculate estimated carbon emissions.
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
//           <button onClick={resetCarbon} className="secondary-btn">
//             Reset
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

// 
// import { useEffect, useState } from "react";

// const defaultDailyData = [
//   { day: "Mon", units: 8 },
//   { day: "Tue", units: 10 },
//   { day: "Wed", units: 7 },
//   { day: "Thu", units: 12 },
//   { day: "Fri", units: 9 },
//   { day: "Sat", units: 11 },
//   { day: "Sun", units: 13 },
// ];

// export default function CarbonTracker() {
//   const emissionFactor = 0.695;

//   const [dailyData, setDailyData] = useState(() => {
//     return JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;
//   });

//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem("dailyEnergyData"));
//     if (savedData) {
//       setDailyData(savedData);
//     }
//   }, []);

//   const totalUnits = dailyData.reduce((sum, item) => sum + item.units, 0);

//   const carbonKg = (totalUnits * emissionFactor).toFixed(2);
//   const treesNeeded = (Number(carbonKg) / 21.77).toFixed(2);

//   return (
//     <div className="page">
//       <div className="page-title-row">
//         <h1>Carbon Tracker</h1>
//       </div>

//       <div className="stats-grid">
//         <div className="premium-card stat-box">
//           <p>Total Energy Used</p>
//           <h3>{totalUnits.toFixed(2)} kWh</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Estimated CO₂</p>
//           <h3>{carbonKg} kg</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Trees Needed</p>
//           <h3>{treesNeeded}</h3>
//         </div>
//       </div>

//       <div className="premium-card">
//         <h2>Calculation Method</h2>
//         <p>Carbon = Total Energy × 0.695 kg CO₂ per kWh</p>
//         <p>This is calculated automatically based on monitored energy data.</p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { FaLeaf, FaCloud, FaTree } from "react-icons/fa";

const defaultDailyData = [
  { day: "Mon", units: 8 },
  { day: "Tue", units: 10 },
  { day: "Wed", units: 7 },
  { day: "Thu", units: 12 },
  { day: "Fri", units: 9 },
  { day: "Sat", units: 11 },
  { day: "Sun", units: 13 },
];

export default function CarbonTracker() {
  const emissionFactor = 0.695;

  const [dailyData, setDailyData] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dailyEnergyData"));
    if (savedData) setDailyData(savedData);
  }, []);

  const totalUnits = dailyData.reduce((sum, item) => sum + item.units, 0);
  const carbonKg = (totalUnits * emissionFactor).toFixed(2);
  const treesNeeded = Math.ceil(Number(carbonKg) / 21.77);

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Carbon Module</p>
          <h1>Carbon Tracker</h1>
          <p className="subtext">
            Carbon footprint is calculated automatically from monitored energy usage
          </p>
        </div>
      </div>

      <section className="stats-grid">
        <div className="premium-card stat-box">
          <p>Total Energy Used</p>
          <h3>{totalUnits.toFixed(2)} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Estimated CO₂</p>
          <h3>{carbonKg} kg</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Trees Needed</p>
          <h3>{treesNeeded}</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Emission Factor</p>
          <h3>0.695</h3>
        </div>
      </section>

      <section className="two-col-grid">
        <div className="premium-card">
          <p className="section-tag">Environmental Impact</p>
          <h2>Carbon Insight</h2>
          <p className="info-text">
            The application derives total weekly energy usage from the monitoring
            module and applies the emission factor to estimate carbon output.
          </p>
          <div className="highlight-number">{carbonKg} kg</div>
        </div>

        <div className="premium-card">
          <p className="section-tag">Equivalent View</p>
          <h2>Green Compensation</h2>
          <p className="info-text">
            Approximate number of trees required to offset the estimated carbon
            emission based on the current monitored energy data.
          </p>
          <div className="highlight-number">{treesNeeded}</div>
        </div>
      </section>

      <div className="premium-card">
        <p className="section-tag">Method</p>
        <h2>Calculation Logic</h2>
        <p className="info-text">Carbon = Total Energy × 0.695 kg CO₂ per kWh</p>
        <p className="info-text">
          This value is generated from your monitored energy usage, not from a manually entered random value.
        </p>
      </div>
    </div>
  );
}
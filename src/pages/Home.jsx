// import { FaArrowRight, FaBolt, FaLeaf, FaBrain, FaLightbulb } from "react-icons/fa";

// export default function Home() {
//   const predictedUnits = 11.2;
//   const ecoScore = 82;

//   return (
//     <div className="page">
//       <section className="hero premium-hero">
//         <div>
//           <p className="section-tag">Smart Energy Platform</p>
//           <h1>EcoWatt Lite Dashboard</h1>
//           <p className="hero-text">
//             Monitor usage, estimate carbon impact, predict next-day consumption,
//             and guide users toward more sustainable energy behavior.
//           </p>

//           <div className="hero-actions">
//             <button className="primary-btn">Live Prototype</button>
//             <button className="secondary-btn">System Overview</button>
//           </div>
//         </div>

//         <div className="hero-side-card">
//           <p className="mini-label">Next-Day Prediction</p>
//           <h2>{predictedUnits} kWh</h2>
//           <span>Based on recent usage pattern</span>
//         </div>
//       </section>

//       <section className="stats-grid">
//         <div className="premium-card stat-box">
//           <p>Total Efficiency</p>
//           <h3>87%</h3>
//         </div>
//         <div className="premium-card stat-box">
//           <p>Eco Score</p>
//           <h3>{ecoScore}/100</h3>
//         </div>
//         <div className="premium-card stat-box">
//           <p>Carbon Status</p>
//           <h3>Moderate</h3>
//         </div>
//         <div className="premium-card stat-box">
//           <p>Recommendation Count</p>
//           <h3>05</h3>
//         </div>
//       </section>

//       <section className="premium-card">
//         <div className="section-head">
//           <div>
//             <p className="section-tag">Workflow</p>
//             <h2>System Flow</h2>
//           </div>
//         </div>

//         <div className="flow-row">
//           <div className="flow-node">
//             <FaBolt />
//             <span>User Energy Data</span>
//           </div>
//           <FaArrowRight className="flow-arrow" />
//           <div className="flow-node">
//             <FaBrain />
//             <span>Prediction Logic</span>
//           </div>
//           <FaArrowRight className="flow-arrow" />
//           <div className="flow-node">
//             <FaLeaf />
//             <span>Carbon Analysis</span>
//           </div>
//           <FaArrowRight className="flow-arrow" />
//           <div className="flow-node">
//             <FaLightbulb />
//             <span>Smart Recommendations</span>
//           </div>
//         </div>
//       </section>

//       <section className="two-col-grid">
//         <div className="premium-card">
//           <p className="section-tag">AI Insight</p>
//           <h2>Main Prediction</h2>
//           <p className="info-text">
//             The system estimates next-day consumption using recent energy
//             patterns. In future, this can be extended with machine learning
//             models like Linear Regression or Random Forest.
//           </p>
//           <div className="highlight-number">{predictedUnits} kWh</div>
//         </div>

//         <div className="premium-card">
//           <p className="section-tag">Project Value</p>
//           <h2>Why It Matters</h2>
//           <p className="info-text">
//             EcoWatt Lite is designed to make electricity usage easier to
//             understand and more actionable through monitoring, carbon awareness,
//             and intelligent sustainability guidance.
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { useMemo } from "react";
// import { FaArrowRight, FaBolt, FaLeaf, FaBrain, FaLightbulb } from "react-icons/fa";

// const appliancePower = {
//   AC: 1.5,
//   Fan: 0.08,
//   Light: 0.05,
//   Fridge: 0.2,
//   TV: 0.1,
// };

// const defaultUsageHours = {
//   AC: 4,
//   Fan: 8,
//   Light: 6,
//   Fridge: 24,
//   TV: 3,
// };

// const defaultDailyData = [
//   { day: "Mon", units: 8 },
//   { day: "Tue", units: 10 },
//   { day: "Wed", units: 7 },
//   { day: "Thu", units: 12 },
//   { day: "Fri", units: 9 },
//   { day: "Sat", units: 11 },
//   { day: "Sun", units: 13 },
// ];

// export default function Home() {
//   const usageHours =
//     JSON.parse(localStorage.getItem("applianceHours")) || defaultUsageHours;

//   const dailyData =
//     JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;

//   const carbonData =
//     JSON.parse(localStorage.getItem("carbonTrackerData")) || null;

//   const applianceData = useMemo(() => {
//     return Object.keys(appliancePower).map((name) => ({
//       name,
//       units: +(appliancePower[name] * usageHours[name]).toFixed(2),
//     }));
//   }, [usageHours]);

//   const totalApplianceUnits = useMemo(() => {
//     return applianceData.reduce((sum, item) => sum + item.units, 0);
//   }, [applianceData]);

//   const totalDayUnits = useMemo(() => {
//     return dailyData.reduce((sum, item) => sum + item.units, 0);
//   }, [dailyData]);

//   const peakAppliance = useMemo(() => {
//     return applianceData.reduce((max, item) =>
//       item.units > max.units ? item : max
//     );
//   }, [applianceData]);

//   const peakDay = useMemo(() => {
//     return dailyData.reduce((max, item) =>
//       item.units > max.units ? item : max
//     );
//   }, [dailyData]);

//   const predictedUnits = useMemo(() => {
//     const last3 = dailyData.slice(-3);
//     const avg =
//       last3.reduce((sum, item) => sum + item.units, 0) / last3.length;
//     return avg.toFixed(2);
//   }, [dailyData]);

//   const ecoScore = useMemo(() => {
//     let score = 100;

//     if (totalDayUnits > 70) score -= 25;
//     else if (totalDayUnits > 55) score -= 15;
//     else score -= 5;

//     if (usageHours.AC >= 8) score -= 20;
//     else if (usageHours.AC >= 6) score -= 10;

//     if (peakDay.units >= 13) score -= 15;

//     if (usageHours.Light <= 6) score += 5;
//     if (usageHours.Fan <= 8) score += 5;

//     if (score > 100) score = 100;
//     if (score < 0) score = 0;

//     return Math.round(score);
//   }, [totalDayUnits, usageHours, peakDay]);

//   function getEcoStatus() {
//     if (ecoScore >= 85) return "Excellent";
//     if (ecoScore >= 70) return "Good";
//     if (ecoScore >= 50) return "Moderate";
//     return "Needs Improvement";
//   }

//   function getMainRecommendation() {
//     const acUnits = appliancePower.AC * usageHours.AC;

//     if (acUnits >= 9 && peakDay.units >= 13) {
//       return "Reduce AC runtime and avoid heavy appliance usage on peak days.";
//     }

//     if (acUnits >= 7) {
//       return "AC is consuming a large share of total energy. Lower its usage time.";
//     }

//     if (peakDay.units >= 13) {
//       return `Peak usage is high on ${peakDay.day}. Shift heavy loads to other days.`;
//     }

//     if (totalDayUnits >= 65) {
//       return "Weekly energy usage is high. Optimize appliance timing.";
//     }

//     return "Current energy pattern is efficient and stable.";
//   }

//   return (
//     <div className="page">
//       <section className="hero premium-hero">
//         <div>
//           <p className="section-tag">Smart Energy Platform</p>
//           <h1>EcoWatt Lite Dashboard</h1>
//           <p className="hero-text">
//             Live overview of monitoring, carbon tracking, recommendations, and eco score.
//           </p>

//           <div className="hero-actions">
//             <button className="primary-btn">Live Overview</button>
//             <button className="secondary-btn">System Summary</button>
//           </div>
//         </div>

//         <div className="hero-side-card">
//           <p className="mini-label">Next-Day Prediction</p>
//           <h2>{predictedUnits} kWh</h2>
//           <span>Calculated from latest day-wise monitoring data</span>
//         </div>
//       </section>

//       <section className="stats-grid">
//         <div className="premium-card stat-box">
//           <p>Appliance Units</p>
//           <h3>{totalApplianceUnits.toFixed(2)} kWh</h3>
//         </div>
//         <div className="premium-card stat-box">
//           <p>Day-wise Units</p>
//           <h3>{totalDayUnits.toFixed(2)} kWh</h3>
//         </div>
//         <div className="premium-card stat-box">
//           <p>Eco Score</p>
//           <h3>{ecoScore}/100</h3>
//         </div>
//         <div className="premium-card stat-box">
//           <p>Carbon Status</p>
//           <h3>{carbonData ? `${carbonData.carbonKg} kg` : "No Data"}</h3>
//         </div>
//       </section>

//       <section className="premium-card">
//         <div className="section-head">
//           <div>
//             <p className="section-tag">Workflow</p>
//             <h2>System Flow</h2>
//           </div>
//         </div>

//         <div className="flow-row">
//           <div className="flow-node">
//             <FaBolt />
//             <span>User Energy Data</span>
//           </div>
//           <FaArrowRight className="flow-arrow" />
//           <div className="flow-node">
//             <FaBrain />
//             <span>Prediction Logic</span>
//           </div>
//           <FaArrowRight className="flow-arrow" />
//           <div className="flow-node">
//             <FaLeaf />
//             <span>Carbon Analysis</span>
//           </div>
//           <FaArrowRight className="flow-arrow" />
//           <div className="flow-node">
//             <FaLightbulb />
//             <span>Smart Recommendations</span>
//           </div>
//         </div>
//       </section>

//       <section className="two-col-grid">
//         <div className="premium-card">
//           <p className="section-tag">Monitoring Summary</p>
//           <h2>Live Energy Insight</h2>
//           <p className="info-text">
//             Peak appliance: <strong>{peakAppliance.name}</strong> ({peakAppliance.units} kWh)
//           </p>
//           <p className="info-text">
//             Peak day: <strong>{peakDay.day}</strong> ({peakDay.units} kWh)
//           </p>
//           <p className="info-text">
//             Recommendation: <strong>{getMainRecommendation()}</strong>
//           </p>
//         </div>

//         <div className="premium-card">
//           <p className="section-tag">Carbon + Score Summary</p>
//           <h2>System Health</h2>
//           <p className="info-text">
//             Eco status: <strong>{getEcoStatus()}</strong>
//           </p>
//           <p className="info-text">
//             Carbon footprint:{" "}
//             <strong>
//               {carbonData ? `${carbonData.carbonKg} kg CO₂` : "No carbon data entered"}
//             </strong>
//           </p>
//           <p className="info-text">
//             Electricity input for carbon:{" "}
//             <strong>{carbonData ? `${carbonData.units} kWh` : "No input yet"}</strong>
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  FaArrowRight,
  FaBolt,
  FaLeaf,
  FaBrain,
  FaLightbulb,
} from "react-icons/fa";

const defaultDailyData = [
  { day: "Mon", units: 8 },
  { day: "Tue", units: 10 },
  { day: "Wed", units: 7 },
  { day: "Thu", units: 12 },
  { day: "Fri", units: 9 },
  { day: "Sat", units: 11 },
  { day: "Sun", units: 13 },
];

export default function Home() {
  const emissionFactor = 0.695;

  const [dailyData, setDailyData] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;
  });

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("dailyEnergyData"));
    if (savedData) {
      setDailyData(savedData);
    }
  }, []);

  const totalUnits = dailyData.reduce((sum, item) => sum + item.units, 0);
  const carbonKg = totalUnits * emissionFactor;

  const predictedUnits = (
    (dailyData[dailyData.length - 1].units +
      dailyData[dailyData.length - 2].units +
      dailyData[dailyData.length - 3].units) /
    3
  ).toFixed(1);

  function getCarbonStatus() {
    if (carbonKg >= 50) return "High";
    if (carbonKg >= 35) return "Moderate";
    return "Low";
  }

  function getEcoScore() {
    if (carbonKg >= 50) return 58;
    if (carbonKg >= 35) return 74;
    return 90;
  }

  const carbonStatus = getCarbonStatus();
  const ecoScore = getEcoScore();

  return (
    <div className="page">
      <section className="hero premium-hero">
        <div>
          <p className="section-tag">Smart Energy Platform</p>
          <h1>EcoWatt Lite Dashboard</h1>
          <p className="hero-text">
            Monitor usage, estimate carbon impact, predict next-day consumption,
            and guide users toward more sustainable energy behavior.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">Live Prototype</button>
            <button className="secondary-btn">System Overview</button>
          </div>
        </div>

        <div className="hero-side-card">
          <p className="mini-label">Next-Day Prediction</p>
          <h2>{predictedUnits} kWh</h2>
          <span>Based on recent usage pattern</span>
        </div>
      </section>

      <section className="stats-grid">
        <div className="premium-card stat-box">
          <p>Total Weekly Units</p>
          <h3>{totalUnits.toFixed(2)} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Eco Score</p>
          <h3>{ecoScore}/100</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Carbon Status</p>
          <h3>{carbonStatus}</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Estimated CO₂</p>
          <h3>{carbonKg.toFixed(2)} kg</h3>
        </div>
      </section>

      <section className="premium-card">
        <div className="section-head">
          <div>
            <p className="section-tag">Workflow</p>
            <h2>System Flow</h2>
          </div>
        </div>

        <div className="flow-row">
          <div className="flow-node">
            <FaBolt />
            <span>User Energy Data</span>
          </div>
          <FaArrowRight className="flow-arrow" />
          <div className="flow-node">
            <FaBrain />
            <span>Prediction Logic</span>
          </div>
          <FaArrowRight className="flow-arrow" />
          <div className="flow-node">
            <FaLeaf />
            <span>Carbon Analysis</span>
          </div>
          <FaArrowRight className="flow-arrow" />
          <div className="flow-node">
            <FaLightbulb />
            <span>Smart Recommendations</span>
          </div>
        </div>
      </section>

      <section className="two-col-grid">
        <div className="premium-card">
          <p className="section-tag">AI Insight</p>
          <h2>Main Prediction</h2>
          <p className="info-text">
            The system estimates next-day consumption using recent energy
            patterns.
          </p>
          <div className="highlight-number">{predictedUnits} kWh</div>
        </div>

        <div className="premium-card">
          <p className="section-tag">Carbon Insight</p>
          <h2>Overview Status</h2>
          <p className="info-text">
            Carbon status is automatically derived from total monitored energy
            usage and updates with the latest day-wise data.
          </p>
          <div className="highlight-number">{carbonStatus}</div>
        </div>
      </section>
    </div>
  );
}
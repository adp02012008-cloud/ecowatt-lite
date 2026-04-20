// import { useEffect, useState } from "react";
// import {
//   FaArrowRight,
//   FaBolt,
//   FaLeaf,
//   FaBrain,
//   FaLightbulb,
// } from "react-icons/fa";

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
//   const emissionFactor = 0.695;

//   const [dailyData, setDailyData] = useState(() => {
//     return JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;
//   });

//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem("dailyEnergyData"));
//     if (savedData) setDailyData(savedData);
//   }, []);

//   const totalUnits = dailyData.reduce((sum, item) => sum + item.units, 0);
//   const carbonKg = totalUnits * emissionFactor;

//   const predictedUnits = (
//     (dailyData[dailyData.length - 1].units +
//       dailyData[dailyData.length - 2].units +
//       dailyData[dailyData.length - 3].units) /
//     3
//   ).toFixed(1);

//   function getCarbonStatus() {
//     if (carbonKg >= 50) return "High";
//     if (carbonKg >= 35) return "Moderate";
//     return "Low";
//   }

//   function getEcoScore(carbon) {
//   const maxCarbon = 80; // worst case limit

//   let score = 100 - (carbon / maxCarbon) * 80;

//   return Math.max(20, Math.min(100, Math.round(score)));
// }

//   const carbonStatus = getCarbonStatus();
//   const ecoScore = getEcoScore(carbonKg);

//   return (
//     <div className="page">
//       <section className="premium-hero">
//         <div>
//           <p className="section-tag">Smart Energy Platform</p>
//           <h1>EcoWatt Lite Dashboard</h1>
//           <p className="hero-text">
//             Monitor electricity usage, predict next-day demand, estimate carbon
//             footprint, and guide users toward sustainable energy behavior.
//           </p>

//           <div className="hero-actions">
//             <button className="primary-btn">Live Prototype</button>
//             <button className="secondary-btn">System Overview</button>
//           </div>
//         </div>

//         <div className="hero-side-card">
//           <p className="mini-label">Next-Day Prediction</p>
//           <h2>{predictedUnits} kWh</h2>
//           <span>Based on the recent 3-day usage pattern</span>
//         </div>
//       </section>

//       <section className="stats-grid">
//         <div className="premium-card stat-box">
//           <p>Total Weekly Units</p>
//           <h3>{totalUnits.toFixed(2)} kWh</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Eco Score</p>
//           <h3>{ecoScore}/100</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Carbon Status</p>
//           <h3>{carbonStatus}</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Estimated CO₂</p>
//           <h3>{carbonKg.toFixed(2)} kg</h3>
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
//             The system estimates the next day’s electricity usage using recent
//             consumption behavior. This prototype uses recent-average logic and
//             can later be upgraded to machine learning.
//           </p>
//           <div className="highlight-number">{predictedUnits} kWh</div>
//         </div>

//         <div className="premium-card">
//           <p className="section-tag">Carbon Insight</p>
//           <h2>Overview Status</h2>
//           <p className="info-text">
//             Carbon status is calculated automatically from the monitored weekly
//             energy data and reflects the current sustainability level.
//           </p>
//           <div className="highlight-number">{carbonStatus}</div>
//         </div>
//       </section>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import {
//   FaArrowRight,
//   FaBolt,
//   FaLeaf,
//   FaBrain,
//   FaLightbulb,
// } from "react-icons/fa";

// const defaultDailyData = [
//   { day: "Mon", units: 8 },
//   { day: "Tue", units: 10 },
//   { day: "Wed", units: 7 },
//   { day: "Thu", units: 12 },
//   { day: "Fri", units: 9 },
//   { day: "Sat", units: 11 },
//   { day: "Sun", units: 13 },
// ];

// const tariffRate = 8; // ₹ per kWh

// export default function Home() {
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
//   const carbonKg = totalUnits * emissionFactor;
//   const totalAmount = (totalUnits * tariffRate).toFixed(2);

//   const predictedUnits = (
//     (dailyData[dailyData.length - 1].units +
//       dailyData[dailyData.length - 2].units +
//       dailyData[dailyData.length - 3].units) /
//     3
//   ).toFixed(1);

//   function getCarbonStatus() {
//     if (carbonKg >= 50) return "High";
//     if (carbonKg >= 35) return "Moderate";
//     return "Low";
//   }

//   function getEcoScore(carbon) {
//     const maxCarbon = 80;
//     let score = 100 - (carbon / maxCarbon) * 80;
//     return Math.max(20, Math.min(100, Math.round(score)));
//   }

//   const carbonStatus = getCarbonStatus();
//   const ecoScore = getEcoScore(carbonKg);

//   return (
//     <div className="page">
//       <section className="hero premium-hero">
//         <div>
//           <p className="section-tag">Smart Energy Platform</p>
//           <h1>EcoWatt Lite Dashboard</h1>
//           <p className="hero-text">
//             Monitor electricity usage, estimate carbon impact, predict next-day demand,
//             and guide users toward sustainable energy behavior.
//           </p>

//           <div className="hero-actions">
//             <button className="primary-btn">Live Prototype</button>
//             <button
//               className="secondary-btn"
//               onClick={() => {
//                 document.getElementById("flow")?.scrollIntoView({
//                   behavior: "smooth",
//                 });
//               }}
//             >
//               Explore Flow
//             </button>
//           </div>
//         </div>

//         <div className="hero-side-card">
//           <p className="mini-label">Next-Day Prediction</p>
//           <h2>{predictedUnits} kWh</h2>
//           <span>Based on the recent 3-day usage pattern</span>
//         </div>
//       </section>

//       <section className="stats-grid">
//         <div className="premium-card stat-box">
//           <p>Total Weekly Units</p>
//           <h3>{totalUnits.toFixed(2)} kWh</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Weekly Amount</p>
//           <h3>₹{totalAmount}</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Eco Score</p>
//           <h3>{ecoScore}/100</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Carbon Status</p>
//           <h3>{carbonStatus}</h3>
//         </div>
//       </section>

//       <section className="premium-card" id="flow">
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
//             The system estimates the next day’s electricity usage using recent
//             consumption behavior.
//           </p>
//           <div className="highlight-number">{predictedUnits} kWh</div>
//         </div>

//         <div className="premium-card">
//           <p className="section-tag">Cost Insight</p>
//           <h2>Weekly Cost Overview</h2>
//           <p className="info-text">
//             The overview page automatically reflects the same weekly amount shown
//             in the Monitoring page, calculated from total weekly energy usage.
//           </p>
//           <div className="highlight-number">₹{totalAmount}</div>
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

const tariffRate = 8; // ₹ per kWh

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
  const totalAmount = (totalUnits * tariffRate).toFixed(2);

  const predictedUnits = (
    (dailyData[dailyData.length - 1].units +
      dailyData[dailyData.length - 2].units +
      dailyData[dailyData.length - 3].units) /
    3
  ).toFixed(1);

  const predictedAmount = (Number(predictedUnits) * tariffRate).toFixed(2);

  function getCarbonStatus() {
    if (carbonKg >= 50) return "High";
    if (carbonKg >= 35) return "Moderate";
    return "Low";
  }

  function getEcoScore(carbon) {
    const maxCarbon = 80;
    let score = 100 - (carbon / maxCarbon) * 80;
    return Math.max(20, Math.min(100, Math.round(score)));
  }

  const carbonStatus = getCarbonStatus();
  const ecoScore = getEcoScore(carbonKg);

  return (
    <div className="page">
      <section className="hero premium-hero">
        <div>
          <p className="section-tag">Smart Energy Platform</p>
          <h1>EcoWatt Lite Dashboard</h1>
          <p className="hero-text">
            Monitor electricity usage, estimate carbon impact, predict next-day demand,
            and guide users toward sustainable energy behavior.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">Live Prototype</button>
            <button
              className="secondary-btn"
              onClick={() => {
                document.getElementById("flow")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              Explore Flow
            </button>
          </div>
        </div>

        <div className="hero-side-card">
          <p className="mini-label">Next-Day Prediction</p>
          <h2>{predictedUnits} kWh</h2>
          <span>Predicted Cost: ₹{predictedAmount}</span>
        </div>
      </section>

      <section className="stats-grid">
        <div className="premium-card stat-box">
          <p>Total Weekly Units</p>
          <h3>{totalUnits.toFixed(2)} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Weekly Amount</p>
          <h3>₹{totalAmount}</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Eco Score</p>
          <h3>{ecoScore}/100</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Carbon Status</p>
          <h3>{carbonStatus}</h3>
        </div>
      </section>

      <section className="premium-card" id="flow">
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
            The system estimates the next day’s electricity usage using recent
            consumption behavior.
          </p>
          <div className="highlight-number">{predictedUnits} kWh</div>
          <p className="info-text">Predicted next-day amount: ₹{predictedAmount}</p>
        </div>

        <div className="premium-card">
          <p className="section-tag">Cost Insight</p>
          <h2>Weekly Cost Overview</h2>
          <p className="info-text">
            The overview page automatically reflects the same weekly amount shown
            in the Monitoring page.
          </p>
          <div className="highlight-number">₹{totalAmount}</div>
        </div>
      </section>
    </div>
  );
}
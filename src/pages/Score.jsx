// import { useMemo } from "react";

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

// export default function Score() {
//   const usageHours =
//     JSON.parse(localStorage.getItem("applianceHours")) || defaultUsageHours;

//   const dailyData =
//     JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;

//   const applianceUnits = useMemo(() => {
//     return Object.keys(appliancePower).reduce((sum, key) => {
//       return sum + appliancePower[key] * usageHours[key];
//     }, 0);
//   }, [usageHours]);

//   const dayUnits = useMemo(() => {
//     return dailyData.reduce((sum, d) => sum + d.units, 0);
//   }, [dailyData]);

//   // 🔥 MAIN SCORE LOGIC
//   const ecoScore = useMemo(() => {
//     let score = 100;

//     // Reduce score based on total usage
//     if (dayUnits > 70) score -= 25;
//     else if (dayUnits > 55) score -= 15;
//     else score -= 5;

//     // Reduce score if AC usage high
//     if (usageHours.AC >= 8) score -= 20;
//     else if (usageHours.AC >= 6) score -= 10;

//     // Reduce score for peak day spikes
//     const peakDay = dailyData.reduce((max, d) =>
//       d.units > max.units ? d : max
//     );

//     if (peakDay.units >= 13) score -= 15;

//     // Bonus for good behavior
//     if (usageHours.Light <= 6) score += 5;
//     if (usageHours.Fan <= 8) score += 5;

//     // Limit range
//     if (score > 100) score = 100;
//     if (score < 0) score = 0;

//     return Math.round(score);
//   }, [dayUnits, usageHours, dailyData]);

//   function getStatus() {
//     if (ecoScore >= 85) return "Excellent";
//     if (ecoScore >= 70) return "Good";
//     if (ecoScore >= 50) return "Moderate";
//     return "Needs Improvement";
//   }

//   function getColor() {
//     if (ecoScore >= 85) return "#22c55e";
//     if (ecoScore >= 70) return "#84cc16";
//     if (ecoScore >= 50) return "#facc15";
//     return "#ef4444";
//   }

//   return (
//     <div className="page">
//       <div className="page-title-row">
//         <div>
//           <p className="section-tag">Sustainability Index</p>
//           <h1>Eco Score</h1>
//           <p className="subtext">
//             This score is dynamically calculated from Monitoring data.
//           </p>
//         </div>
//       </div>

//       <div className="score-layout">
//         <div className="premium-card score-panel">
//           <p className="section-tag">Live Score</p>

//           <div
//             className="premium-score-circle"
//             style={{
//               color: getColor(),
//               borderColor: getColor(),
//             }}
//           >
//             {ecoScore}
//           </div>

//           <h2>{getStatus()}</h2>
//         </div>

//         <div className="premium-card">
//           <p className="section-tag">Explanation</p>
//           <h2>How Score is Calculated</h2>

//           <p className="info-text">
//             The Eco Score is based on:
//           </p>

//           <ul className="info-text">
//             <li>Total weekly energy usage</li>
//             <li>AC usage duration</li>
//             <li>Peak day consumption</li>
//             <li>Lighting and fan efficiency</li>
//           </ul>

//           <p className="info-text">
//             Lower usage and balanced consumption increases the score.
//           </p>
//         </div>
//       </div>

//       <div className="premium-card">
//         <p className="section-tag">Live Data Summary</p>
//         <h2>Current System State</h2>

//         <p className="info-text">
//           Total Day-wise Units: <strong>{dayUnits.toFixed(2)} kWh</strong>
//         </p>

//         <p className="info-text">
//           Total Appliance Units: <strong>{applianceUnits.toFixed(2)} kWh</strong>
//         </p>

//         <p className="info-text">
//           AC Usage: <strong>{usageHours.AC} hrs</strong>
//         </p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";

const defaultDailyData = [
  { day: "Mon", units: 8 },
  { day: "Tue", units: 10 },
  { day: "Wed", units: 7 },
  { day: "Thu", units: 12 },
  { day: "Fri", units: 9 },
  { day: "Sat", units: 11 },
  { day: "Sun", units: 13 },
];

export default function Score() {
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

  function getEcoScore() {
    if (carbonKg >= 50) return 58;
    if (carbonKg >= 35) return 74;
    return 90;
  }

  const ecoScore = getEcoScore();

  let status = "Excellent";
  if (ecoScore < 80) status = "Good";
  if (ecoScore < 60) status = "Needs Improvement";

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Sustainability Meter</p>
          <h1>Eco Score</h1>
        </div>
      </div>

      <div className="score-layout">
        <div className="premium-card score-panel">
          <p className="section-tag">Current Score</p>
          <div className="premium-score-circle">{ecoScore}</div>
          <h2>{status}</h2>
        </div>

        <div className="premium-card">
          <p className="section-tag">Interpretation</p>
          <h2>Score Meaning</h2>
          <p className="info-text">90–100 → Outstanding energy efficiency</p>
          <p className="info-text">70–89 → Good sustainable usage</p>
          <p className="info-text">Below 70 → Needs optimization</p>
          <p className="info-text">Total Energy Used: {totalUnits.toFixed(2)} kWh</p>
          <p className="info-text">Estimated CO₂: {carbonKg.toFixed(2)} kg</p>
        </div>
      </div>
    </div>
  );
}
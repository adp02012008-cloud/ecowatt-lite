// import { useState, useEffect } from "react";

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

// export default function Simulator() {
//   const emissionFactor = 0.695;

//   const [usageHours, setUsageHours] = useState(() => {
//     return JSON.parse(localStorage.getItem("applianceHours")) || defaultUsageHours;
//   });

//   const [dailyData, setDailyData] = useState(() => {
//     return JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;
//   });

//   const [selectedAppliance, setSelectedAppliance] = useState("AC");
//   const [reduceHours, setReduceHours] = useState("");

//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     const savedUsage = JSON.parse(localStorage.getItem("applianceHours"));
//     const savedDaily = JSON.parse(localStorage.getItem("dailyEnergyData"));

//     if (savedUsage) setUsageHours(savedUsage);
//     if (savedDaily) setDailyData(savedDaily);
//   }, []);

//   const totalUnits = dailyData.reduce((sum, d) => sum + d.units, 0);
//   const originalCarbon = totalUnits * emissionFactor;

//   function simulate() {
//     const reduce = parseFloat(reduceHours);
//     if (isNaN(reduce) || reduce <= 0) {
//       alert("Enter valid reduction hours");
//       return;
//     }

//     const currentHours = usageHours[selectedAppliance];
//     const newHours = Math.max(currentHours - reduce, 0);

//     const savedUnits =
//       (currentHours - newHours) * appliancePower[selectedAppliance];

//     const newTotalUnits = totalUnits - savedUnits;
//     const newCarbon = newTotalUnits * emissionFactor;

//     function getEcoScore(carbon) {
//       if (carbon >= 50) return 58;
//       if (carbon >= 35) return 74;
//       return 90;
//     }

//     setResult({
//       savedUnits: savedUnits.toFixed(2),
//       newTotal: newTotalUnits.toFixed(2),
//       carbonSaved: (originalCarbon - newCarbon).toFixed(2),
//       newCarbon: newCarbon.toFixed(2),
//       newScore: getEcoScore(newCarbon),
//     });
//   }

//   return (
//     <div className="page">
//       <div className="page-title-row">
//         <div>
//           <p className="section-tag">Innovation Module</p>
//           <h1>Energy Savings Simulator</h1>
//           <p className="subtext">
//             Simulate how reducing appliance usage affects energy, carbon, and score
//           </p>
//         </div>
//       </div>

//       <div className="premium-card input-card">
//         <h2>Simulate Reduction</h2>

//         <div className="input-row">
//           <select
//             className="premium-input"
//             value={selectedAppliance}
//             onChange={(e) => setSelectedAppliance(e.target.value)}
//           >
//             <option>AC</option>
//             <option>Fan</option>
//             <option>Light</option>
//             <option>Fridge</option>
//             <option>TV</option>
//           </select>

//           <input
//             type="number"
//             placeholder="Reduce hours"
//             className="premium-input"
//             value={reduceHours}
//             onChange={(e) => setReduceHours(e.target.value)}
//           />

//           <button className="primary-btn" onClick={simulate}>
//             Simulate
//           </button>
//         </div>
//       </div>

//       {result && (
//         <div className="stats-grid">
//           <div className="premium-card stat-box">
//             <p>Energy Saved</p>
//             <h3>{result.savedUnits} kWh</h3>
//           </div>

//           <div className="premium-card stat-box">
//             <p>New Total Energy</p>
//             <h3>{result.newTotal} kWh</h3>
//           </div>

//           <div className="premium-card stat-box">
//             <p>CO₂ Saved</p>
//             <h3>{result.carbonSaved} kg</h3>
//           </div>

//           <div className="premium-card stat-box">
//             <p>New Eco Score</p>
//             <h3>{result.newScore}</h3>
//           </div>
//         </div>
//       )}

//       {result && (
//         <div className="premium-card">
//           <h2>Insight</h2>
//           <p className="info-text">
//             Reducing <strong>{selectedAppliance}</strong> usage by{" "}
//             <strong>{reduceHours} hours</strong> can significantly reduce your
//             energy consumption and improve sustainability.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useState, useEffect } from "react";

const appliancePower = {
  AC: 1.5,
  Fan: 0.08,
  Light: 0.05,
  Fridge: 0.2,
  TV: 0.1,
};

const defaultUsageHours = {
  AC: 4,
  Fan: 8,
  Light: 6,
  Fridge: 24,
  TV: 3,
};

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

export default function Simulator() {
  const emissionFactor = 0.695;

  const [usageHours, setUsageHours] = useState(() => {
    return JSON.parse(localStorage.getItem("applianceHours")) || defaultUsageHours;
  });

  const [dailyData, setDailyData] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;
  });

  const [selectedAppliance, setSelectedAppliance] = useState("AC");
  const [reduceHours, setReduceHours] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const savedUsage = JSON.parse(localStorage.getItem("applianceHours"));
    const savedDaily = JSON.parse(localStorage.getItem("dailyEnergyData"));

    if (savedUsage) setUsageHours(savedUsage);
    if (savedDaily) setDailyData(savedDaily);
  }, []);

  const totalUnits = dailyData.reduce((sum, d) => sum + d.units, 0);
  const originalCarbon = totalUnits * emissionFactor;
  const originalAmount = totalUnits * tariffRate;

  function simulate() {
    const reduce = parseFloat(reduceHours);
    if (isNaN(reduce) || reduce <= 0) {
      alert("Enter valid reduction hours");
      return;
    }

    const currentHours = usageHours[selectedAppliance];
    const newHours = Math.max(currentHours - reduce, 0);

    const savedUnits =
      (currentHours - newHours) * appliancePower[selectedAppliance];

    const newTotalUnits = totalUnits - savedUnits;
    const newCarbon = newTotalUnits * emissionFactor;
    const newAmount = newTotalUnits * tariffRate;
    const moneySaved = originalAmount - newAmount;

    function getEcoScore(carbon) {
      const maxCarbon = 80;
      let score = 100 - (carbon / maxCarbon) * 80;
      return Math.max(20, Math.min(100, Math.round(score)));
    }

    setResult({
      savedUnits: savedUnits.toFixed(2),
      newTotal: newTotalUnits.toFixed(2),
      carbonSaved: (originalCarbon - newCarbon).toFixed(2),
      newCarbon: newCarbon.toFixed(2),
      moneySaved: moneySaved.toFixed(2),
      newAmount: newAmount.toFixed(2),
      newScore: getEcoScore(newCarbon),
    });
  }

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Innovation Module</p>
          <h1>Energy Savings Simulator</h1>
          <p className="subtext">
            Simulate how reducing appliance usage affects energy, carbon, score, and money
          </p>
        </div>
      </div>

      <div className="premium-card input-card">
        <h2>Simulate Reduction</h2>

        <div className="input-row">
          <select
            className="premium-input"
            value={selectedAppliance}
            onChange={(e) => setSelectedAppliance(e.target.value)}
          >
            <option>AC</option>
            <option>Fan</option>
            <option>Light</option>
            <option>Fridge</option>
            <option>TV</option>
          </select>

          <input
            type="number"
            min="0"
            step="0.1"
            placeholder="Reduce hours"
            className="premium-input"
            value={reduceHours}
            onChange={(e) => {
              const val = e.target.value;
              if (val < 0) return;
              setReduceHours(val);
            }}
          />

          <button className="primary-btn" onClick={simulate}>
            Simulate
          </button>
        </div>
      </div>

      {result && (
        <div className="stats-grid">
          <div className="premium-card stat-box">
            <p>Energy Saved</p>
            <h3>{result.savedUnits} kWh</h3>
          </div>

          <div className="premium-card stat-box">
            <p>CO₂ Saved</p>
            <h3>{result.carbonSaved} kg</h3>
          </div>

          <div className="premium-card stat-box">
            <p>Money Saved</p>
            <h3>₹{result.moneySaved}</h3>
          </div>

          <div className="premium-card stat-box">
            <p>New Eco Score</p>
            <h3>{result.newScore}</h3>
          </div>
        </div>
      )}

      {result && (
        <div className="premium-card">
          <h2>Insight</h2>
          <p className="info-text">
            Reducing <strong>{selectedAppliance}</strong> usage by{" "}
            <strong>{reduceHours} hours</strong> can reduce your weekly energy to{" "}
            <strong>{result.newTotal} kWh</strong>, lower cost to{" "}
            <strong>₹{result.newAmount}</strong>, and improve sustainability.
          </p>
        </div>
      )}
    </div>
  );
}
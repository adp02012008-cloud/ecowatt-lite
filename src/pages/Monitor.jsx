// import { useEffect, useMemo, useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   LineChart,
//   Line,
// } from "recharts";

// const appliancePower = {
//   AC: 1.5,
//   Fan: 0.08,
//   Light: 0.05,
//   Fridge: 0.2,
//   TV: 0.1,
// };

// const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const defaultUsageHours = {
//   AC: 4,
//   Fan: 8,
//   Light: 6,
//   Fridge: 24,
//   TV: 3,
// };

// const defaultApplianceHoursByDay = {
//   Mon: { ...defaultUsageHours },
//   Tue: { ...defaultUsageHours },
//   Wed: { ...defaultUsageHours },
//   Thu: { ...defaultUsageHours },
//   Fri: { ...defaultUsageHours },
//   Sat: { ...defaultUsageHours },
//   Sun: { ...defaultUsageHours },
// };

// function calculateDayUnits(hoursObj) {
//   return Object.keys(appliancePower).reduce((sum, appliance) => {
//     return sum + appliancePower[appliance] * (hoursObj[appliance] || 0);
//   }, 0);
// }

// export default function Monitor() {
//   const [selectedDay, setSelectedDay] = useState("Mon");
//   const [selectedAppliance, setSelectedAppliance] = useState("AC");
//   const [enteredHours, setEnteredHours] = useState("");

//   const [applianceHoursByDay, setApplianceHoursByDay] = useState(() => {
//     return (
//       JSON.parse(localStorage.getItem("applianceHoursByDay")) ||
//       defaultApplianceHoursByDay
//     );
//   });

//   // selected day's hours
//   const currentDayHours = applianceHoursByDay[selectedDay];

//   // bar chart data for selected day
//   const applianceData = useMemo(() => {
//     return Object.keys(appliancePower).map((name) => ({
//       name,
//       hours: currentDayHours[name],
//       units: +(appliancePower[name] * currentDayHours[name]).toFixed(2),
//     }));
//   }, [currentDayHours]);

//   // line chart data for all days (derived from appliance hours)
//   const dailyData = useMemo(() => {
//     return daysList.map((day) => ({
//       day,
//       units: +calculateDayUnits(applianceHoursByDay[day]).toFixed(2),
//     }));
//   }, [applianceHoursByDay]);

//   const applianceTotal = useMemo(() => {
//     return applianceData
//       .reduce((sum, item) => sum + item.units, 0)
//       .toFixed(2);
//   }, [applianceData]);

//   const peakAppliance = useMemo(() => {
//     return applianceData.reduce((max, item) =>
//       item.units > max.units ? item : max
//     );
//   }, [applianceData]);

//   const weekTotal = useMemo(() => {
//     return dailyData.reduce((sum, item) => sum + item.units, 0).toFixed(2);
//   }, [dailyData]);

//   const peakDay = useMemo(() => {
//     return dailyData.reduce((max, item) =>
//       item.units > max.units ? item : max
//     );
//   }, [dailyData]);

//   useEffect(() => {
//     // save full linked structure
//     localStorage.setItem(
//       "applianceHoursByDay",
//       JSON.stringify(applianceHoursByDay)
//     );

//     // keep existing pages working
//     localStorage.setItem("dailyEnergyData", JSON.stringify(dailyData));
//     localStorage.setItem(
//       "applianceHours",
//       JSON.stringify(applianceHoursByDay[selectedDay])
//     );
//   }, [applianceHoursByDay, dailyData, selectedDay]);

//   function updateAppliance() {
//     const val = parseFloat(enteredHours);

//     if (isNaN(val) || val < 0) {
//       alert("Enter valid hours");
//       return;
//     }

//     setApplianceHoursByDay((prev) => ({
//       ...prev,
//       [selectedDay]: {
//         ...prev[selectedDay],
//         [selectedAppliance]: val,
//       },
//     }));

//     setEnteredHours("");
//   }

//   function randomSelectedDay() {
//     setApplianceHoursByDay((prev) => ({
//       ...prev,
//       [selectedDay]: {
//         AC: Math.floor(Math.random() * 8) + 1,
//         Fan: Math.floor(Math.random() * 12) + 4,
//         Light: Math.floor(Math.random() * 10) + 3,
//         Fridge: 24,
//         TV: Math.floor(Math.random() * 8) + 1,
//       },
//     }));
//   }

//   function resetSelectedDay() {
//     setApplianceHoursByDay((prev) => ({
//       ...prev,
//       [selectedDay]: { ...defaultUsageHours },
//     }));
//   }

//   function randomAllDays() {
//     const updated = {};
//     daysList.forEach((day) => {
//       updated[day] = {
//         AC: Math.floor(Math.random() * 8) + 1,
//         Fan: Math.floor(Math.random() * 12) + 4,
//         Light: Math.floor(Math.random() * 10) + 3,
//         Fridge: 24,
//         TV: Math.floor(Math.random() * 8) + 1,
//       };
//     });
//     setApplianceHoursByDay(updated);
//   }

//   function resetAllDays() {
//     setApplianceHoursByDay(defaultApplianceHoursByDay);
//   }

//   function getRecommendation() {
//     if (currentDayHours.AC >= 7 || peakDay.units >= 13) {
//       return "High energy usage detected. Reduce AC runtime and shift heavy usage away from peak days.";
//     }

//     if (currentDayHours.AC >= 5 || peakDay.units >= 10) {
//       return "Moderate usage pattern. Optimizing appliance timing can improve efficiency.";
//     }

//     return "Good energy usage pattern. System is efficient.";
//   }

//   return (
//     <div className="page">
//       <div className="page-title-row">
//         <div>
//           <p className="section-tag">Monitoring Module</p>
//           <h1>Energy Monitoring</h1>
//           <p className="subtext">
//             Appliance hours are linked directly to day-wise energy calculation
//           </p>
//         </div>
//       </div>

//       <div className="premium-card input-card">
//         <p className="section-tag">Day Selection</p>
//         <h2>Choose Day</h2>

//         <div className="input-row">
//           <select
//             value={selectedDay}
//             onChange={(e) => setSelectedDay(e.target.value)}
//             className="premium-input"
//           >
//             {daysList.map((day) => (
//               <option key={day}>{day}</option>
//             ))}
//           </select>

//           <button onClick={randomSelectedDay} className="secondary-btn">
//             Random Selected Day
//           </button>

//           <button onClick={resetSelectedDay} className="secondary-btn">
//             Reset Selected Day
//           </button>

//           <button onClick={randomAllDays} className="secondary-btn">
//             Random All Days
//           </button>

//           <button onClick={resetAllDays} className="secondary-btn">
//             Reset All Days
//           </button>
//         </div>
//       </div>

//       <div className="premium-card input-card">
//         <p className="section-tag">Appliance Control</p>
//         <h2>Update Appliance Hours for {selectedDay}</h2>

//         <div className="input-row">
//           <select
//             value={selectedAppliance}
//             onChange={(e) => setSelectedAppliance(e.target.value)}
//             className="premium-input"
//           >
//             <option>AC</option>
//             <option>Fan</option>
//             <option>Light</option>
//             <option>Fridge</option>
//             <option>TV</option>
//           </select>

//           <input
//             type="number"
//             min="0"
//             step="0.1"
//             placeholder="Enter hours"
//             value={enteredHours}
//             onChange={(e) => {
//               const val = e.target.value;
//               if (val < 0) return;
//               setEnteredHours(val);
//             }}
//             className="premium-input"
//           />

//           <button onClick={updateAppliance} className="primary-btn">
//             Update
//           </button>
//         </div>
//       </div>

//       <section className="stats-grid">
//         <div className="premium-card stat-box">
//           <p>{selectedDay} Total</p>
//           <h3>{applianceTotal} kWh</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>{selectedDay} Peak Appliance</p>
//           <h3>{peakAppliance.name}</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Weekly Units</p>
//           <h3>{weekTotal} kWh</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Peak Day</p>
//           <h3>{peakDay.day}</h3>
//         </div>
//       </section>

//       <section className="chart-grid">
//         <div className="premium-card">
//           <p className="section-tag">Selected Day Appliance Analytics</p>
//           <h2>{selectedDay} Appliance Consumption</h2>
//           <ResponsiveContainer width="100%" height={320}>
//             <BarChart data={applianceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="units" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="premium-card">
//           <p className="section-tag">Week Analytics</p>
//           <h2>Day-wise Consumption</h2>
//           <ResponsiveContainer width="100%" height={320}>
//             <LineChart data={dailyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip />
//               <Line dataKey="units" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       <div className="premium-card">
//         <p className="section-tag">Smart Insight</p>
//         <h2>Recommendation</h2>
//         <p className="info-text">{getRecommendation()}</p>
//       </div>

//       <div className="premium-card">
//         <p className="section-tag">Calculation Logic</p>
//         <h2>How Linking Works</h2>
//         <p className="info-text">
//           Energy for each day is derived from appliance usage hours using:
//           Energy (kWh) = Power (kW) × Time (hours). The day-wise graph is
//           automatically calculated from appliance data, so both charts and day
//           totals stay linked.
//         </p>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useMemo, useState } from "react";
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   LineChart,
//   Line,
// } from "recharts";

// const appliancePower = {
//   AC: 1.5,
//   Fan: 0.08,
//   Light: 0.05,
//   Fridge: 0.2,
//   TV: 0.1,
// };

// const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const defaultUsageHours = {
//   AC: 4,
//   Fan: 8,
//   Light: 6,
//   Fridge: 24,
//   TV: 3,
// };

// const defaultApplianceHoursByDay = {
//   Mon: { ...defaultUsageHours },
//   Tue: { ...defaultUsageHours },
//   Wed: { ...defaultUsageHours },
//   Thu: { ...defaultUsageHours },
//   Fri: { ...defaultUsageHours },
//   Sat: { ...defaultUsageHours },
//   Sun: { ...defaultUsageHours },
// };

// const tariffRate = 8; // ₹ per kWh

// function calculateDayUnits(hoursObj) {
//   return Object.keys(appliancePower).reduce((sum, appliance) => {
//     return sum + appliancePower[appliance] * (hoursObj[appliance] || 0);
//   }, 0);
// }

// export default function Monitor() {
//   const [selectedDay, setSelectedDay] = useState("Mon");
//   const [selectedAppliance, setSelectedAppliance] = useState("AC");
//   const [enteredHours, setEnteredHours] = useState("");

//   const [applianceHoursByDay, setApplianceHoursByDay] = useState(() => {
//     return (
//       JSON.parse(localStorage.getItem("applianceHoursByDay")) ||
//       defaultApplianceHoursByDay
//     );
//   });

//   const currentDayHours = applianceHoursByDay[selectedDay];

//   const applianceData = useMemo(() => {
//     return Object.keys(appliancePower).map((name) => {
//       const units = +(appliancePower[name] * currentDayHours[name]).toFixed(2);
//       return {
//         name,
//         hours: currentDayHours[name],
//         units,
//         amount: +(units * tariffRate).toFixed(2),
//       };
//     });
//   }, [currentDayHours]);

//   const dailyData = useMemo(() => {
//     return daysList.map((day) => {
//       const units = +calculateDayUnits(applianceHoursByDay[day]).toFixed(2);
//       return {
//         day,
//         units,
//         amount: +(units * tariffRate).toFixed(2),
//       };
//     });
//   }, [applianceHoursByDay]);

//   const applianceTotal = useMemo(() => {
//     return applianceData.reduce((sum, item) => sum + item.units, 0).toFixed(2);
//   }, [applianceData]);

//   const selectedDayAmount = useMemo(() => {
//     return applianceData.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
//   }, [applianceData]);

//   const peakAppliance = useMemo(() => {
//     return applianceData.reduce((max, item) =>
//       item.units > max.units ? item : max
//     );
//   }, [applianceData]);

//   const weekTotal = useMemo(() => {
//     return dailyData.reduce((sum, item) => sum + item.units, 0).toFixed(2);
//   }, [dailyData]);

//   const weekAmount = useMemo(() => {
//     return dailyData.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
//   }, [dailyData]);

//   const peakDay = useMemo(() => {
//     return dailyData.reduce((max, item) =>
//       item.units > max.units ? item : max
//     );
//   }, [dailyData]);

//   useEffect(() => {
//     localStorage.setItem(
//       "applianceHoursByDay",
//       JSON.stringify(applianceHoursByDay)
//     );
//     localStorage.setItem("dailyEnergyData", JSON.stringify(dailyData));
//     localStorage.setItem(
//       "applianceHours",
//       JSON.stringify(applianceHoursByDay[selectedDay])
//     );
//     localStorage.setItem("weeklyAmount", JSON.stringify(weekAmount));
//   }, [applianceHoursByDay, dailyData, selectedDay, weekAmount]);

//   function updateAppliance() {
//     const val = parseFloat(enteredHours);

//     if (isNaN(val) || val < 0) {
//       alert("Enter valid hours");
//       return;
//     }

//     setApplianceHoursByDay((prev) => ({
//       ...prev,
//       [selectedDay]: {
//         ...prev[selectedDay],
//         [selectedAppliance]: val,
//       },
//     }));

//     setEnteredHours("");
//   }

//   function randomSelectedDay() {
//     setApplianceHoursByDay((prev) => ({
//       ...prev,
//       [selectedDay]: {
//         AC: Math.floor(Math.random() * 8) + 1,
//         Fan: Math.floor(Math.random() * 12) + 4,
//         Light: Math.floor(Math.random() * 10) + 3,
//         Fridge: 24,
//         TV: Math.floor(Math.random() * 8) + 1,
//       },
//     }));
//   }

//   function resetSelectedDay() {
//     setApplianceHoursByDay((prev) => ({
//       ...prev,
//       [selectedDay]: { ...defaultUsageHours },
//     }));
//   }

//   function randomAllDays() {
//     const updated = {};
//     daysList.forEach((day) => {
//       updated[day] = {
//         AC: Math.floor(Math.random() * 8) + 1,
//         Fan: Math.floor(Math.random() * 12) + 4,
//         Light: Math.floor(Math.random() * 10) + 3,
//         Fridge: 24,
//         TV: Math.floor(Math.random() * 8) + 1,
//       };
//     });
//     setApplianceHoursByDay(updated);
//   }

//   function resetAllDays() {
//     setApplianceHoursByDay(defaultApplianceHoursByDay);
//   }

//   function getRecommendation() {
//     if (currentDayHours.AC >= 7 || peakDay.units >= 13) {
//       return "High energy usage detected. Reduce AC runtime and shift heavy usage away from peak days.";
//     }

//     if (currentDayHours.AC >= 5 || peakDay.units >= 10) {
//       return "Moderate usage pattern. Optimizing appliance timing can improve efficiency.";
//     }

//     return "Good energy usage pattern. System is efficient.";
//   }

//   return (
//     <div className="page">
//       <div className="page-title-row">
//         <div>
//           <p className="section-tag">Monitoring Module</p>
//           <h1>Energy Monitoring</h1>
//           <p className="subtext">
//             Appliance hours are linked directly to day-wise energy calculation
//           </p>
//         </div>
//       </div>

//       <div className="premium-card input-card">
//         <p className="section-tag">Day Selection</p>
//         <h2>Choose Day</h2>

//         <div className="input-row">
//           <select
//             value={selectedDay}
//             onChange={(e) => setSelectedDay(e.target.value)}
//             className="premium-input"
//           >
//             {daysList.map((day) => (
//               <option key={day}>{day}</option>
//             ))}
//           </select>

//           <button onClick={randomSelectedDay} className="secondary-btn">
//             Random Selected Day
//           </button>

//           <button onClick={resetSelectedDay} className="secondary-btn">
//             Reset Selected Day
//           </button>

//           <button onClick={randomAllDays} className="secondary-btn">
//             Random All Days
//           </button>

//           <button onClick={resetAllDays} className="secondary-btn">
//             Reset All Days
//           </button>
//         </div>
//       </div>

//       <div className="premium-card input-card">
//         <p className="section-tag">Appliance Control</p>
//         <h2>Update Appliance Hours for {selectedDay}</h2>

//         <div className="input-row">
//           <select
//             value={selectedAppliance}
//             onChange={(e) => setSelectedAppliance(e.target.value)}
//             className="premium-input"
//           >
//             <option>AC</option>
//             <option>Fan</option>
//             <option>Light</option>
//             <option>Fridge</option>
//             <option>TV</option>
//           </select>

//           <input
//             type="number"
//             min="0"
//             step="0.1"
//             placeholder="Enter hours"
//             value={enteredHours}
//             onChange={(e) => {
//               const val = e.target.value;
//               if (val < 0) return;
//               setEnteredHours(val);
//             }}
//             className="premium-input"
//           />

//           <button onClick={updateAppliance} className="primary-btn">
//             Update
//           </button>
//         </div>
//       </div>

//       <section className="stats-grid">
//         <div className="premium-card stat-box">
//           <p>{selectedDay} Total</p>
//           <h3>{applianceTotal} kWh</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>{selectedDay} Amount</p>
//           <h3>₹{selectedDayAmount}</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Weekly Units</p>
//           <h3>{weekTotal} kWh</h3>
//         </div>

//         <div className="premium-card stat-box">
//           <p>Weekly Amount</p>
//           <h3>₹{weekAmount}</h3>
//         </div>
//       </section>

//       <section className="chart-grid">
//         <div className="premium-card">
//           <p className="section-tag">Selected Day Appliance Analytics</p>
//           <h2>{selectedDay} Appliance Consumption</h2>
//           <ResponsiveContainer width="100%" height={320}>
//             <BarChart data={applianceData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="name" />
//               <YAxis />
//               <Tooltip
//                 formatter={(value, name) =>
//                   name === "amount" ? [`₹${value}`, "Amount"] : [value, "Units"]
//                 }
//               />
//               <Bar dataKey="units" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         <div className="premium-card">
//           <p className="section-tag">Week Analytics</p>
//           <h2>Day-wise Consumption</h2>
//           <ResponsiveContainer width="100%" height={320}>
//             <LineChart data={dailyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="day" />
//               <YAxis />
//               <Tooltip
//                 formatter={(value, name) =>
//                   name === "amount" ? [`₹${value}`, "Amount"] : [value, "Units"]
//                 }
//               />
//               <Line dataKey="units" strokeWidth={3} />
//             </LineChart>
//           </ResponsiveContainer>
//         </div>
//       </section>

//       <div className="premium-card">
//         <p className="section-tag">Smart Insight</p>
//         <h2>Recommendation</h2>
//         <p className="info-text">{getRecommendation()}</p>
//         <p className="info-text">
//           Peak appliance: <strong>{peakAppliance.name}</strong> | Peak day:{" "}
//           <strong>{peakDay.day}</strong>
//         </p>
//       </div>

//       <div className="premium-card">
//         <p className="section-tag">Calculation Logic</p>
//         <h2>How Cost Is Calculated</h2>
//         <p className="info-text">Energy (kWh) = Power (kW) × Time (hours)</p>
//         <p className="info-text">Amount (₹) = Energy (kWh) × ₹{tariffRate}</p>
//       </div>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
} from "recharts";

const appliancePower = {
  AC: 1.5,
  Fan: 0.08,
  Light: 0.05,
  Fridge: 0.2,
  TV: 0.1,
};

const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const defaultUsageHours = {
  AC: 4,
  Fan: 8,
  Light: 6,
  Fridge: 24,
  TV: 3,
};

const zeroUsageHours = {
  AC: 0,
  Fan: 0,
  Light: 0,
  Fridge: 0,
  TV: 0,
};

const defaultApplianceHoursByDay = {
  Mon: { ...defaultUsageHours },
  Tue: { ...defaultUsageHours },
  Wed: { ...defaultUsageHours },
  Thu: { ...defaultUsageHours },
  Fri: { ...defaultUsageHours },
  Sat: { ...defaultUsageHours },
  Sun: { ...defaultUsageHours },
};

const tariffRate = 8; // ₹ per kWh

function calculateDayUnits(hoursObj) {
  return Object.keys(appliancePower).reduce((sum, appliance) => {
    return sum + appliancePower[appliance] * (hoursObj[appliance] || 0);
  }, 0);
}

function generateRandomHours() {
  return {
    AC: Math.floor(Math.random() * 8) + 1,
    Fan: Math.floor(Math.random() * 12) + 4,
    Light: Math.floor(Math.random() * 10) + 3,
    Fridge: 24,
    TV: Math.floor(Math.random() * 8) + 1,
  };
}

export default function Monitor() {
  const [mode, setMode] = useState("random");
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [selectedAppliance, setSelectedAppliance] = useState("AC");
  const [enteredHours, setEnteredHours] = useState("");

  const [applianceHoursByDay, setApplianceHoursByDay] = useState(() => {
    return (
      JSON.parse(localStorage.getItem("applianceHoursByDay")) ||
      defaultApplianceHoursByDay
    );
  });

  const currentDayHours = applianceHoursByDay[selectedDay];

  const applianceData = useMemo(() => {
    return Object.keys(appliancePower).map((name) => {
      const units = +(appliancePower[name] * currentDayHours[name]).toFixed(2);
      return {
        name,
        hours: currentDayHours[name],
        units,
        amount: +(units * tariffRate).toFixed(2),
      };
    });
  }, [currentDayHours]);

  const dailyData = useMemo(() => {
    return daysList.map((day) => {
      const units = +calculateDayUnits(applianceHoursByDay[day]).toFixed(2);
      return {
        day,
        units,
        amount: +(units * tariffRate).toFixed(2),
      };
    });
  }, [applianceHoursByDay]);

  const applianceTotal = useMemo(() => {
    return applianceData.reduce((sum, item) => sum + item.units, 0).toFixed(2);
  }, [applianceData]);

  const selectedDayAmount = useMemo(() => {
    return applianceData.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
  }, [applianceData]);

  const peakAppliance = useMemo(() => {
    return applianceData.reduce((max, item) =>
      item.units > max.units ? item : max
    );
  }, [applianceData]);

  const weekTotal = useMemo(() => {
    return dailyData.reduce((sum, item) => sum + item.units, 0).toFixed(2);
  }, [dailyData]);

  const weekAmount = useMemo(() => {
    return dailyData.reduce((sum, item) => sum + item.amount, 0).toFixed(2);
  }, [dailyData]);

  const peakDay = useMemo(() => {
    return dailyData.reduce((max, item) =>
      item.units > max.units ? item : max
    );
  }, [dailyData]);

  useEffect(() => {
    localStorage.setItem(
      "applianceHoursByDay",
      JSON.stringify(applianceHoursByDay)
    );
    localStorage.setItem("dailyEnergyData", JSON.stringify(dailyData));
    localStorage.setItem(
      "applianceHours",
      JSON.stringify(applianceHoursByDay[selectedDay])
    );
    localStorage.setItem("weeklyAmount", JSON.stringify(weekAmount));
  }, [applianceHoursByDay, dailyData, selectedDay, weekAmount]);

  function handleModeChange(newMode) {
  setMode(newMode);

  if (newMode === "manual") {
    const zeroWeek = {};

    daysList.forEach((day) => {
      zeroWeek[day] = { ...zeroUsageHours };
    });

    setApplianceHoursByDay(zeroWeek);

    setEnteredHours("");
    setSelectedAppliance("AC");
  }
}

  function updateAppliance() {
    const val = parseFloat(enteredHours);

    if (isNaN(val) || val < 0) {
      alert("Enter valid hours");
      return;
    }

    setApplianceHoursByDay((prev) => ({
      ...prev,
      [selectedDay]: {
        ...prev[selectedDay],
        [selectedAppliance]: val,
      },
    }));

    setEnteredHours("");
  }

  function fetchSelectedDayData() {
    setApplianceHoursByDay((prev) => ({
      ...prev,
      [selectedDay]: generateRandomHours(),
    }));
  }

  function fetchWholeWeekData() {
    const updated = {};
    daysList.forEach((day) => {
      updated[day] = generateRandomHours();
    });
    setApplianceHoursByDay(updated);
  }

  function resetAllDays() {
    setApplianceHoursByDay(defaultApplianceHoursByDay);
  }

  function getRecommendation() {
    if (currentDayHours.AC >= 7 || peakDay.units >= 13) {
      return "High energy usage detected. Reduce AC runtime and shift heavy usage away from peak days.";
    }

    if (currentDayHours.AC >= 5 || peakDay.units >= 10) {
      return "Moderate usage pattern. Optimizing appliance timing can improve efficiency.";
    }

    return "Good energy usage pattern. System is efficient.";
  }

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Monitoring Module</p>
          <h1>Energy Monitoring</h1>
          <p className="subtext">
            Switch between fetched meter mode and manual entry mode
          </p>
        </div>
      </div>

      <div className="premium-card input-card">
        <p className="section-tag">Monitoring Mode</p>
        <h2>Select Data Mode</h2>

        <div className="input-row">
          <select
            value={mode}
            onChange={(e) => handleModeChange(e.target.value)}
            className="premium-input"
          >
            <option value="random">Random Fetch Mode</option>
            <option value="manual">Manual Entry Mode</option>
          </select>

          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="premium-input"
          >
            {daysList.map((day) => (
              <option key={day}>{day}</option>
            ))}
          </select>

          {mode === "random" && (
            <>
              <button onClick={fetchSelectedDayData} className="primary-btn">
                Fetch Selected Day
              </button>

              <button onClick={fetchWholeWeekData} className="secondary-btn">
                Fetch Whole Week
              </button>

              <button onClick={resetAllDays} className="secondary-btn">
                Reset
              </button>
            </>
          )}
        </div>
      </div>

      {mode === "random" && (
        <div className="premium-card">
          <p className="section-tag">Live Feed Simulation</p>
          <h2>Automatic Meter & Appliance Data</h2>
          <p className="info-text">
            In this mode, the system simulates direct data fetching from smart
            meters and connected appliances.
          </p>
        </div>
      )}

      {mode === "manual" && (
        <div className="premium-card input-card">
          <p className="section-tag">Manual Appliance Control</p>
          <h2>Update Appliance Hours for {selectedDay}</h2>

          <div className="input-row">
            <select
              value={selectedAppliance}
              onChange={(e) => setSelectedAppliance(e.target.value)}
              className="premium-input"
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
              placeholder="Enter hours"
              value={enteredHours}
              onChange={(e) => {
                const val = e.target.value;
                if (val < 0) return;
                setEnteredHours(val);
              }}
              className="premium-input"
            />

            <button onClick={updateAppliance} className="primary-btn">
              Update
            </button>
          </div>
        </div>
      )}

      <section className="stats-grid">
        <div className="premium-card stat-box">
          <p>{selectedDay} Total</p>
          <h3>{applianceTotal} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>{selectedDay} Amount</p>
          <h3>₹{selectedDayAmount}</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Weekly Units</p>
          <h3>{weekTotal} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Weekly Amount</p>
          <h3>₹{weekAmount}</h3>
        </div>
      </section>

      <section className="chart-grid">
        <div className="premium-card">
          <p className="section-tag">Selected Day Appliance Analytics</p>
          <h2>{selectedDay} Appliance Consumption</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={applianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                formatter={(value, name) =>
                  name === "amount" ? [`₹${value}`, "Amount"] : [value, "Units"]
                }
              />
              <Bar dataKey="units" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-card">
          <p className="section-tag">Week Analytics</p>
          <h2>Day-wise Consumption</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip
                formatter={(value, name) =>
                  name === "amount" ? [`₹${value}`, "Amount"] : [value, "Units"]
                }
              />
              <Line dataKey="units" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <div className="premium-card">
        <p className="section-tag">Smart Insight</p>
        <h2>Recommendation</h2>
        <p className="info-text">{getRecommendation()}</p>
        <p className="info-text">
          Peak appliance: <strong>{peakAppliance.name}</strong> | Peak day:{" "}
          <strong>{peakDay.day}</strong>
        </p>
      </div>

      <div className="premium-card">
        <p className="section-tag">Calculation Logic</p>
        <h2>How This Page Works</h2>
        <p className="info-text">Energy (kWh) = Power (kW) × Time (hours)</p>
        <p className="info-text">Amount (₹) = Energy (kWh) × ₹{tariffRate}</p>
      </div>
    </div>
  );
}
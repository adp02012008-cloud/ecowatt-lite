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

export default function Monitor() {
  const [usageHours, setUsageHours] = useState(() => {
    return JSON.parse(localStorage.getItem("applianceHours")) || defaultUsageHours;
  });

  const [dailyData, setDailyData] = useState(() => {
    return JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;
  });

  const [selectedAppliance, setSelectedAppliance] = useState("AC");
  const [enteredHours, setEnteredHours] = useState("");

  const [selectedDay, setSelectedDay] = useState("Mon");
  const [enteredUnits, setEnteredUnits] = useState("");

  useEffect(() => {
    localStorage.setItem("applianceHours", JSON.stringify(usageHours));
  }, [usageHours]);

  useEffect(() => {
    localStorage.setItem("dailyEnergyData", JSON.stringify(dailyData));
  }, [dailyData]);

  // 🔥 Appliance calculations
  const applianceData = useMemo(() => {
    return Object.keys(appliancePower).map((name) => ({
      name,
      hours: usageHours[name],
      units: +(appliancePower[name] * usageHours[name]).toFixed(2),
    }));
  }, [usageHours]);

  const applianceTotal = useMemo(
    () => applianceData.reduce((sum, item) => sum + item.units, 0).toFixed(2),
    [applianceData]
  );

  const peakAppliance = useMemo(
    () => applianceData.reduce((max, item) => (item.units > max.units ? item : max)),
    [applianceData]
  );

  // 🔥 Day calculations
  const dayTotal = useMemo(
    () => dailyData.reduce((sum, item) => sum + item.units, 0).toFixed(2),
    [dailyData]
  );

  const peakDay = useMemo(
    () => dailyData.reduce((max, item) => (item.units > max.units ? item : max)),
    [dailyData]
  );

  // 🔹 Update Appliance
  function updateAppliance() {
    const val = parseFloat(enteredHours);
    if (isNaN(val) || val < 0) return alert("Enter valid hours");

    setUsageHours((prev) => ({
      ...prev,
      [selectedAppliance]: val,
    }));

    setEnteredHours("");
  }

  // 🔹 Random Appliance
  function randomAppliance() {
    setUsageHours({
      AC: Math.floor(Math.random() * 8) + 1,
      Fan: Math.floor(Math.random() * 12) + 4,
      Light: Math.floor(Math.random() * 10) + 3,
      Fridge: 24,
      TV: Math.floor(Math.random() * 8) + 1,
    });
  }

  // 🔹 Reset Appliance
  function resetAppliance() {
    setUsageHours(defaultUsageHours);
  }

  // 🔹 Update Day
  function updateDay() {
    const val = parseFloat(enteredUnits);
    if (isNaN(val) || val < 0) return alert("Enter valid units");

    setDailyData((prev) =>
      prev.map((d) =>
        d.day === selectedDay ? { ...d, units: val } : d
      )
    );

    setEnteredUnits("");
  }

  // 🔹 Random Day
  function randomDay() {
    setDailyData((prev) =>
      prev.map((d) => ({
        ...d,
        units: Math.floor(Math.random() * 10) + 5,
      }))
    );
  }

  // 🔹 Reset Day
  function resetDay() {
    setDailyData(defaultDailyData);
  }

  // 🔥 Recommendation
  function getRecommendation() {
    if (usageHours.AC >= 7 || peakDay.units >= 13)
      return "High energy usage detected. Reduce AC runtime and shift usage away from peak days.";

    if (usageHours.AC >= 5 || peakDay.units >= 10)
      return "Moderate usage pattern. Optimizing appliance timing can improve efficiency.";

    return "Good energy usage pattern. System is efficient.";
  }

  return (
    <div className="page">

      <div className="page-title-row">
        <div>
          <p className="section-tag">Monitoring Module</p>
          <h1>Energy Monitoring</h1>
          <p className="subtext">
            Real-time simulation using appliance usage and day-wise tracking
          </p>
        </div>
      </div>

      {/* 🔥 Appliance Section */}
      <div className="premium-card input-card">
        <h2>Appliance Usage Control</h2>

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
            placeholder="Enter hours"
            value={enteredHours}
            onChange={(e) => setEnteredHours(e.target.value)}
            className="premium-input"
          />

          <button onClick={updateAppliance} className="primary-btn">
            Update
          </button>

          <button onClick={randomAppliance} className="secondary-btn">
            Random
          </button>

          <button onClick={resetAppliance} className="secondary-btn">
            Reset
          </button>
        </div>
      </div>

      {/* 🔥 Day Section */}
      <div className="premium-card input-card">
        <h2>Day-wise Usage Control</h2>

        <div className="input-row">
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="premium-input"
          >
            {dailyData.map((d) => (
              <option key={d.day}>{d.day}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Enter units"
            value={enteredUnits}
            onChange={(e) => setEnteredUnits(e.target.value)}
            className="premium-input"
          />

          <button onClick={updateDay} className="primary-btn">
            Update
          </button>

          <button onClick={randomDay} className="secondary-btn">
            Random
          </button>

          <button onClick={resetDay} className="secondary-btn">
            Reset
          </button>
        </div>
      </div>

      {/* 🔥 Stats */}
      <div className="stats-grid">
        <div className="premium-card stat-box">
          <p>Appliance Total</p>
          <h3>{applianceTotal} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Peak Appliance</p>
          <h3>{peakAppliance.name}</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Weekly Units</p>
          <h3>{dayTotal} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Peak Day</p>
          <h3>{peakDay.day}</h3>
        </div>
      </div>

      {/* 🔥 Charts */}
      <div className="chart-grid">
        <div className="premium-card">
          <h2>Appliance-wise Consumption</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={applianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-card">
          <h2>Day-wise Consumption</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line dataKey="units" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔥 Recommendation */}
      <div className="premium-card">
        <h2>Smart Recommendation</h2>
        <p className="info-text">{getRecommendation()}</p>
      </div>

      {/* 🔥 Formula */}
      <div className="premium-card">
        <h2>Calculation Logic</h2>
        <p>Energy (kWh) = Power (kW) × Time (hours)</p>
      </div>

    </div>
  );
}
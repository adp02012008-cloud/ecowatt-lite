import { useEffect, useMemo, useRef, useState } from "react";
import Chart from "chart.js/auto";

const appliancePower = { AC: 1.5, Fan: 0.08, Light: 0.05, Fridge: 0.2, TV: 0.1 };
const daysList = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const defaultUsageHours = { AC: 4, Fan: 8, Light: 6, Fridge: 24, TV: 3 };

const APPLIANCE_META = {
  AC:     { color: "#1d5fa6", bg: "rgba(29,95,166,0.12)",  icon: <svg viewBox="0 0 24 24"><path d="M4 8a8 8 0 0116 0v8H4V8z"/><path d="M9 16v2a3 3 0 006 0v-2"/></svg> },
  Fan:    { color: "#0a7a72", bg: "rgba(10,122,114,0.12)", icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 9c0-3 2.5-5.5 5.5-5.5A5.5 5.5 0 0123 9c0 1.5-1.3 3-3 3H12"/><path d="M12 15c0 3-2.5 5.5-5.5 5.5A5.5 5.5 0 011 15c0-1.5 1.3-3 3-3h8"/><path d="M9 12c-2.5 1.5-3.5 4.5-2 7"/><path d="M15 12c2.5-1.5 3.5-4.5 2-7"/></svg> },
  Light:  { color: "#c47c0a", bg: "rgba(196,124,10,0.12)", icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="2"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 010 14"/></svg> },
  Fridge: { color: "#6d44b8", bg: "rgba(109,68,184,0.12)", icon: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="10" y1="6" x2="10" y2="8"/><line x1="10" y1="14" x2="10" y2="18"/></svg> },
  TV:     { color: "#c0354a", bg: "rgba(192,53,74,0.12)",  icon: <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg> },
};

const defaultByDay = Object.fromEntries(daysList.map((d) => [d, { ...defaultUsageHours }]));

function calcUnits(h) {
  return Object.keys(appliancePower).reduce((s, k) => s + appliancePower[k] * (h[k] || 0), 0);
}

export default function Monitor() {
  const [selectedDay, setSelectedDay] = useState("Mon");
  const [selectedAppliance, setSelectedAppliance] = useState("AC");
  const [enteredHours, setEnteredHours] = useState("");
  const [applianceHoursByDay, setApplianceHoursByDay] = useState(
    () => JSON.parse(localStorage.getItem("applianceHoursByDay")) || defaultByDay
  );

  const barRef  = useRef(null);
  const lineRef = useRef(null);
  const barChart  = useRef(null);
  const lineChart = useRef(null);

  const currentDayHours = applianceHoursByDay[selectedDay];

  const applianceData = useMemo(() =>
    Object.keys(appliancePower).map((n) => ({
      name: n,
      hours: currentDayHours[n],
      units: +(appliancePower[n] * currentDayHours[n]).toFixed(2),
    })), [currentDayHours]);

  const dailyData = useMemo(() =>
    daysList.map((d) => ({ day: d, units: +calcUnits(applianceHoursByDay[d]).toFixed(2) })),
    [applianceHoursByDay]);

  const applianceTotal = useMemo(() => applianceData.reduce((s, i) => s + i.units, 0).toFixed(2), [applianceData]);
  const peakAppliance  = useMemo(() => applianceData.reduce((m, i) => i.units > m.units ? i : m), [applianceData]);
  const weekTotal = useMemo(() => dailyData.reduce((s, i) => s + i.units, 0).toFixed(2), [dailyData]);
  const peakDay   = useMemo(() => dailyData.reduce((m, i) => i.units > m.units ? i : m), [dailyData]);

  useEffect(() => {
    localStorage.setItem("applianceHoursByDay", JSON.stringify(applianceHoursByDay));
    localStorage.setItem("dailyEnergyData", JSON.stringify(dailyData));
    localStorage.setItem("applianceHours", JSON.stringify(applianceHoursByDay[selectedDay]));
  }, [applianceHoursByDay, dailyData, selectedDay]);

  // Charts
  useEffect(() => {
    if (barChart.current) barChart.current.destroy();
    if (barRef.current) {
      barChart.current = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: applianceData.map((a) => a.name),
          datasets: [{
            label: "kWh",
            data: applianceData.map((a) => a.units),
            backgroundColor: Object.values(APPLIANCE_META).map((m) => m.color),
            borderRadius: 7,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(26,122,69,0.07)" }, ticks: { callback: (v) => v + " kWh" } },
          },
        },
      });
    }
    return () => barChart.current?.destroy();
  }, [applianceData]);

  useEffect(() => {
    if (lineChart.current) lineChart.current.destroy();
    if (lineRef.current) {
      lineChart.current = new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: dailyData.map((d) => d.day),
          datasets: [{
            label: "kWh",
            data: dailyData.map((d) => d.units),
            borderColor: "#2ca05a",
            backgroundColor: "rgba(44,160,90,0.08)",
            fill: true,
            tension: 0.4,
            pointBackgroundColor: "#2ca05a",
            pointRadius: 5,
            pointHoverRadius: 7,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(26,122,69,0.07)" } },
          },
        },
      });
    }
    return () => lineChart.current?.destroy();
  }, [dailyData]);

  function updateAppliance() {
    const val = parseFloat(enteredHours);
    if (isNaN(val) || val < 0) { alert("Enter valid hours"); return; }
    setApplianceHoursByDay((prev) => ({
      ...prev,
      [selectedDay]: { ...prev[selectedDay], [selectedAppliance]: val },
    }));
    setEnteredHours("");
  }

  function randomDay() {
    setApplianceHoursByDay((prev) => ({
      ...prev,
      [selectedDay]: { AC: Math.floor(Math.random()*8)+1, Fan: Math.floor(Math.random()*12)+4, Light: Math.floor(Math.random()*10)+3, Fridge: 24, TV: Math.floor(Math.random()*8)+1 },
    }));
  }

  function resetDay() {
    setApplianceHoursByDay((prev) => ({ ...prev, [selectedDay]: { ...defaultUsageHours } }));
  }

  function randomAll() {
    const u = {};
    daysList.forEach((d) => {
      u[d] = { AC: Math.floor(Math.random()*8)+1, Fan: Math.floor(Math.random()*12)+4, Light: Math.floor(Math.random()*10)+3, Fridge: 24, TV: Math.floor(Math.random()*8)+1 };
    });
    setApplianceHoursByDay(u);
  }

  const stats = [
    { icon: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, cls: "blue",  label: `${selectedDay} Total`,    value: `${applianceTotal} kWh` },
    { icon: APPLIANCE_META[peakAppliance.name].icon,                                                   cls: "amber", label: "Peak Appliance",           value: peakAppliance.name },
    { icon: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, cls: "green", label: "Weekly Units", value: `${weekTotal} kWh` },
    { icon: <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, cls: "rose", label: "Peak Day", value: peakDay.day },
  ];

  return (
    <div className="page">
      <img
        className="page-img-strip"
        src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=1200&q=75&fit=crop"
        alt="Smart home"
      />

      <div className="page-title-row">
        <p className="section-tag">Monitoring Module</p>
        <h1>Energy Monitor</h1>
        <p className="subtext">Track appliance-by-appliance daily usage</p>
      </div>

      {/* Appliance quick view */}
      <div className="premium-card input-card">
        <p className="section-tag">Appliance Overview — {selectedDay}</p>
        <div className="appliance-grid-row">
          {Object.keys(appliancePower).map((name) => (
            <div
              key={name}
              className={`appliance-card ${selectedAppliance === name ? "selected" : ""}`}
              onClick={() => setSelectedAppliance(name)}
              style={selectedAppliance === name ? { background: APPLIANCE_META[name].color, borderColor: APPLIANCE_META[name].color } : {}}
            >
              {APPLIANCE_META[name].icon}
              <div>{name}</div>
              <div className="app-hours">{currentDayHours[name]}h</div>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="premium-card input-card">
        <p className="section-tag">Controls</p>
        <div className="input-row">
          <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="premium-input">
            {daysList.map((d) => <option key={d}>{d}</option>)}
          </select>
          <input
            type="number" min="0" step="0.1"
            placeholder="Enter hours"
            value={enteredHours}
            onChange={(e) => setEnteredHours(e.target.value)}
            className="premium-input"
          />
          <button onClick={updateAppliance} className="action-btn">
            <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
            Update
          </button>
          <button onClick={randomDay} className="ghost-btn">
            <svg viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            Random Day
          </button>
          <button onClick={randomAll} className="ghost-btn">
            <svg viewBox="0 0 24 24"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/></svg>
            Random All
          </button>
          <button onClick={resetDay} className="ghost-btn">
            <svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>
            Reset
          </button>
        </div>
      </div>

      {/* Stats */}
      <section className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="premium-card stat-box">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <p>{s.label}</p>
            <h3>{s.value}</h3>
          </div>
        ))}
      </section>

      {/* Charts */}
      <section className="chart-grid">
        <div className="premium-card">
          <p className="section-tag">Appliance Breakdown</p>
          <h2 style={{ fontSize: 17 }}>{selectedDay} — kWh per Appliance</h2>
          <div className="chart-canvas-wrap">
            <canvas ref={barRef} role="img" aria-label="Appliance energy bar chart" />
          </div>
        </div>
        <div className="premium-card">
          <p className="section-tag">Weekly Trend</p>
          <h2 style={{ fontSize: 17 }}>Day-wise Consumption</h2>
          <div className="chart-canvas-wrap">
            <canvas ref={lineRef} role="img" aria-label="Weekly energy line chart" />
          </div>
        </div>
      </section>
    </div>
  );
}
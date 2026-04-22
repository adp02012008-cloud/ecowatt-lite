import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import Chart from "chart.js/auto";

const defaultDailyData = [
  { day: "Mon", units: 8 },  { day: "Tue", units: 10 }, { day: "Wed", units: 7 },
  { day: "Thu", units: 12 }, { day: "Fri", units: 9 },  { day: "Sat", units: 11 },
  { day: "Sun", units: 13 },
];

const FLOW = [
  { label: "Energy Data", icon: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
  { label: "AI Logic",    icon: <svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg> },
  { label: "Carbon Calc", icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> },
  { label: "Smart Tips",  icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
];

const IMG_STRIPS = [
  {
    url: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&q=75&fit=crop",
    label: "Solar",
    icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  },
  {
    url: "https://images.unsplash.com/photo-1542601906897-ecd4aa5ea949?w=400&q=75&fit=crop",
    label: "Forest",
    icon: <svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.7 21C8 19 9 18 12 18c0 0 5-3 5-10z"/></svg>,
  },
  {
    url: "https://images.unsplash.com/photo-1558449028-b53a39d100fc?w=400&q=75&fit=crop",
    label: "Smart Home",
    icon: <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>,
  },
];

export default function Home() {
  const emissionFactor = 0.695;
  const barRef    = useRef(null);
  const donutRef  = useRef(null);
  const barInst   = useRef(null);
  const donutInst = useRef(null);

  const [dailyData, setDailyData] = useState(
    () => JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dailyEnergyData"));
    if (saved) setDailyData(saved);
  }, []);

  const totalUnits = dailyData.reduce((s, i) => s + i.units, 0);
  const carbonKg   = totalUnits * emissionFactor;
  const predictedUnits = (
    (dailyData[dailyData.length - 1].units +
     dailyData[dailyData.length - 2].units +
     dailyData[dailyData.length - 3].units) / 3
  ).toFixed(1);

  const getEcoScore = (c) => Math.max(20, Math.min(100, Math.round(100 - (c / 80) * 80)));
  const ecoScore    = getEcoScore(carbonKg);
  const carbonStatus = carbonKg >= 50 ? "High" : carbonKg >= 35 ? "Moderate" : "Low";

  const stats = [
    { icon: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, cls: "blue",  label: "Weekly Units",   value: `${totalUnits.toFixed(1)} kWh` },
    { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, cls: "green", label: "Eco Score", value: `${ecoScore}/100` },
    { icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, cls: "amber", label: "Carbon Status", value: carbonStatus },
    { icon: <svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.7 21C8 19 9 18 12 18c0 0 5-3 5-10z"/><line x1="12" y1="18" x2="12" y2="22"/></svg>, cls: "rose", label: "CO₂ Emitted", value: `${carbonKg.toFixed(1)} kg` },
  ];

  // Bar chart
  useEffect(() => {
    if (barInst.current) barInst.current.destroy();
    if (!barRef.current) return;
    const maxVal = Math.max(...dailyData.map((d) => d.units));
    barInst.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: dailyData.map((d) => d.day),
        datasets: [{
          data: dailyData.map((d) => d.units),
          backgroundColor: dailyData.map((d) => d.units === maxVal ? "#c0354a" : "#2ca05a"),
          borderRadius: 7,
          borderSkipped: false,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { family: "'Cabinet Grotesk', sans-serif", size: 11 } } },
          y: { grid: { color: "rgba(26,122,69,0.07)" }, ticks: { callback: (v) => v + " kWh" } },
        },
      },
    });
    return () => barInst.current?.destroy();
  }, [dailyData]);

  // Donut chart
  useEffect(() => {
    if (donutInst.current) donutInst.current.destroy();
    if (!donutRef.current) return;
    donutInst.current = new Chart(donutRef.current, {
      type: "doughnut",
      data: {
        labels: ["AC", "Fridge", "Light", "Fan", "TV"],
        datasets: [{
          data: [60, 16, 9, 7, 8],
          backgroundColor: ["#1d5fa6", "#6d44b8", "#c47c0a", "#0a7a72", "#c0354a"],
          borderWidth: 0,
          hoverOffset: 5,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false, cutout: "68%",
        plugins: { legend: { position: "right", labels: { boxWidth: 10, padding: 10, font: { family: "'Cabinet Grotesk', sans-serif", size: 11 } } } },
      },
    });
    return () => donutInst.current?.destroy();
  }, []);

  return (
    <div className="page">
      {/* HERO */}
      <section className="premium-hero">
        <img className="hero-bg-img" src="https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&q=80&fit=crop" alt="Energy landscape" />
        <div className="hero-overlay-grad" />
        <div className="hero">
          <div className="hero-tag">Smart Energy Platform</div>
          <h1>EcoWatt Lite</h1>
          <p className="hero-text">Track usage · Predict demand · Cut carbon</p>
          <div className="hero-actions">
            <NavLink to="/monitor" className="primary-btn">
              <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              Monitor
            </NavLink>
            <NavLink to="/score" className="secondary-btn">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
              Score
            </NavLink>
          </div>
        </div>
        <div className="hero-side-card">
          <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
          <div className="mini-label">Next-Day Prediction</div>
          <h2>{predictedUnits} kWh</h2>
          <span>3-day average</span>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="premium-card stat-box">
            <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
            <p>{s.label}</p>
            <h3>{s.value}</h3>
          </div>
        ))}
      </section>

      {/* CHARTS */}
      <div className="chart-grid">
        <div className="premium-card">
          <p className="section-tag">Consumption</p>
          <h2 style={{ fontSize: 17 }}>Weekly kWh</h2>
          <div className="chart-canvas-wrap">
            <canvas ref={barRef} role="img" aria-label="Weekly energy bar chart" />
          </div>
        </div>
        <div className="premium-card">
          <p className="section-tag">Breakdown</p>
          <h2 style={{ fontSize: 17 }}>By Appliance</h2>
          <div className="chart-canvas-wrap">
            <canvas ref={donutRef} role="img" aria-label="Appliance donut chart" />
          </div>
        </div>
      </div>

      {/* IMAGE STRIPS */}
      <div className="img-strip-row">
        {IMG_STRIPS.map((img, i) => (
          <div key={i} className="img-strip-thumb">
            <img src={img.url} alt={img.label} />
            <div className="img-overlay">
              {img.icon}
              <span>{img.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FLOW */}
      <div className="premium-card">
        <div className="section-head">
          <div>
            <p className="section-tag">Workflow</p>
            <h2>How It Works</h2>
          </div>
        </div>
        <div className="flow-row">
          {FLOW.map((f, i) => (
            <React.Fragment key={i}>
              <div className="flow-node">
                {f.icon}
                <span>{f.label}</span>
              </div>
              {i < FLOW.length - 1 && <span className="flow-arrow">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
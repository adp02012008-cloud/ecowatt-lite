import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const defaultDailyData = [
  { day: "Mon", units: 8 }, { day: "Tue", units: 10 }, { day: "Wed", units: 7 },
  { day: "Thu", units: 12 }, { day: "Fri", units: 9 }, { day: "Sat", units: 11 }, { day: "Sun", units: 13 },
];

export default function CarbonTracker() {
  const emissionFactor = 0.695;
  const barRef  = useRef(null);
  const lineRef = useRef(null);
  const barChart  = useRef(null);
  const lineChart = useRef(null);

  const [dailyData, setDailyData] = useState(
    () => JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dailyEnergyData"));
    if (saved) setDailyData(saved);
  }, []);

  const totalUnits = dailyData.reduce((s, i) => s + i.units, 0);
  const carbonKg   = (totalUnits * emissionFactor).toFixed(2);
  const treesNeeded = (Number(carbonKg) / 21.77).toFixed(2);
  const treeCount   = Math.min(10, Math.ceil(Number(treesNeeded)));

  const level = Number(carbonKg) >= 50 ? "High" : Number(carbonKg) >= 35 ? "Moderate" : "Low";
  const levelColor = level === "High" ? "var(--rose)" : level === "Moderate" ? "var(--amber)" : "var(--green)";
  const levelBg    = level === "High" ? "rgba(192,53,74,0.08)" : level === "Moderate" ? "rgba(196,124,10,0.08)" : "rgba(26,122,69,0.08)";
  const levelBorder = level === "High" ? "rgba(192,53,74,0.25)" : level === "Moderate" ? "rgba(196,124,10,0.25)" : "rgba(26,122,69,0.25)";

  const co2Data = dailyData.map((d) => +(d.units * emissionFactor).toFixed(2));

  useEffect(() => {
    if (barChart.current) barChart.current.destroy();
    if (barRef.current) {
      barChart.current = new Chart(barRef.current, {
        type: "bar",
        data: {
          labels: dailyData.map((d) => d.day),
          datasets: [{
            label: "CO₂ kg",
            data: co2Data,
            backgroundColor: co2Data.map((v) => v >= 7 ? "#c0354a" : v >= 5 ? "#c47c0a" : "#2ca05a"),
            borderRadius: 7,
            borderSkipped: false,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(26,122,69,0.07)" }, ticks: { callback: (v) => v + " kg" } },
          },
        },
      });
    }
    return () => barChart.current?.destroy();
  }, [dailyData]);

  useEffect(() => {
    if (lineChart.current) lineChart.current.destroy();
    if (lineRef.current) {
      lineChart.current = new Chart(lineRef.current, {
        type: "line",
        data: {
          labels: dailyData.map((d) => d.day),
          datasets: [
            {
              label: "CO₂ Emitted",
              data: co2Data,
              borderColor: "#c0354a",
              backgroundColor: "rgba(192,53,74,0.07)",
              fill: true,
              tension: 0.4,
              pointBackgroundColor: "#c0354a",
              pointRadius: 4,
            },
            {
              label: "Target",
              data: dailyData.map(() => 5),
              borderColor: "#2ca05a",
              borderDash: [5, 4],
              pointRadius: 0,
              borderWidth: 1.5,
            },
          ],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { position: "top", labels: { boxWidth: 10, padding: 10 } } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "rgba(26,122,69,0.07)" }, ticks: { callback: (v) => v + " kg" } },
          },
        },
      });
    }
    return () => lineChart.current?.destroy();
  }, [dailyData]);

  const stats = [
    {
      icon: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
      cls: "blue", label: "Energy Used", value: `${totalUnits.toFixed(1)} kWh`,
    },
    {
      icon: <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
      cls: "rose", label: "CO₂ Emitted", value: `${carbonKg} kg`,
    },
    {
      icon: <svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.7 21C8 19 9 18 12 18c0 0 5-3 5-10z"/><line x1="12" y1="18" x2="12" y2="22"/></svg>,
      cls: "green", label: "Trees to Offset", value: treesNeeded,
    },
    {
      icon: <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
      cls: "amber", label: "Emission Factor", value: "0.695",
    },
  ];

  return (
    <div className="page">
      <img
        className="page-img-strip"
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=75&fit=crop&crop=center"
        alt="Forest"
      />

      <div className="page-title-row">
        <p className="section-tag">Carbon Module</p>
        <h1>Carbon Tracker</h1>
        <p className="subtext">Your weekly carbon footprint at a glance</p>
      </div>

      {/* Status Card */}
      <div
        className="premium-card"
        style={{ textAlign: "center", padding: "32px 24px", marginBottom: 16, background: levelBg, border: `1.5px solid ${levelBorder}` }}
      >
        <div style={{
          width: 64, height: 64, borderRadius: 18,
          background: levelBg, border: `1.5px solid ${levelBorder}`,
          display: "flex", alignItems: "center", justifyContent: "center",
          margin: "0 auto 12px",
        }}>
          {level === "High" ? (
            <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, stroke: levelColor, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
              <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
          ) : level === "Moderate" ? (
            <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, stroke: levelColor, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" style={{ width: 30, height: 30, stroke: levelColor, fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}>
              <path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.7 21C8 19 9 18 12 18c0 0 5-3 5-10z"/><line x1="12" y1="18" x2="12" y2="22"/>
            </svg>
          )}
        </div>
        <p className="section-tag" style={{ color: levelColor }}>Carbon Level</p>
        <h2 style={{ fontSize: 36, color: levelColor }}>{level}</h2>
        <p className="info-text" style={{ marginTop: 6 }}>Based on your weekly monitored data</p>
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
      <div className="chart-grid">
        <div className="premium-card">
          <p className="section-tag">CO₂ by Day</p>
          <h2 style={{ fontSize: 17 }}>Daily Emissions</h2>
          <div className="chart-canvas-wrap">
            <canvas ref={barRef} role="img" aria-label="Daily CO2 emissions bar chart" />
          </div>
        </div>
        <div className="premium-card">
          <p className="section-tag">Green Offset</p>
          <h2 style={{ fontSize: 17 }}>Trees Needed</h2>
          <div className="tree-grid-wrap">
            {Array.from({ length: treeCount }).map((_, i) => (
              <div key={i} className="tree-cell" style={{ animationDelay: `${i * 0.15}s` }}>
                <svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.7 21C8 19 9 18 12 18c0 0 5-3 5-10z"/><line x1="12" y1="18" x2="12" y2="22"/></svg>
              </div>
            ))}
          </div>
          <p className="info-text" style={{ textAlign: "center", marginTop: 10, fontSize: 12 }}>
            {treesNeeded} trees × 21.77 kg CO₂/yr
          </p>
        </div>
      </div>

      {/* CO2 vs Target line */}
      <div className="premium-card" style={{ marginBottom: 16 }}>
        <p className="section-tag">Trend</p>
        <h2 style={{ fontSize: 17 }}>CO₂ vs Target</h2>
        <div className="chart-canvas-wrap" style={{ height: 170 }}>
          <canvas ref={lineRef} role="img" aria-label="CO2 vs target line chart" />
        </div>
      </div>

      <div className="two-col-grid">
        <div className="premium-card">
          <p className="section-tag">Impact</p>
          <h2 style={{ fontSize: 17 }}>Your Carbon Footprint</h2>
          <p className="info-text" style={{ marginTop: 6 }}>Each kWh emits ~0.695 kg of CO₂.</p>
          <div className="highlight-number">{carbonKg} kg</div>
        </div>
        <div className="premium-card">
          <p className="section-tag">Formula</p>
          <h2 style={{ fontSize: 17 }}>How It's Calculated</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 14 }}>
            <div className="formula-step" style={{ color: "var(--blue)" }}>
              <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              <span>{totalUnits.toFixed(1)} kWh</span>
            </div>
            <div className="formula-divider">✕ 0.695</div>
            <div className="formula-step" style={{ background: "rgba(192,53,74,0.07)", color: "var(--rose)" }}>
              <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>{carbonKg} kg CO₂</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
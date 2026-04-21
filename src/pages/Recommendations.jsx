import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const defaultDailyData = [
  { day: "Mon", units: 8 }, { day: "Tue", units: 10 }, { day: "Wed", units: 7 },
  { day: "Thu", units: 12 }, { day: "Fri", units: 9 }, { day: "Sat", units: 11 }, { day: "Sun", units: 13 },
];
const defaultUsageHours = { AC: 4, Fan: 8, Light: 6, Fridge: 24, TV: 3 };

const APPLIANCE_ICONS = {
  AC:     <svg viewBox="0 0 24 24"><path d="M4 8a8 8 0 0116 0v8H4V8z"/><path d="M9 16v2a3 3 0 006 0v-2"/></svg>,
  Fan:    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 9c0-3 2.5-5.5 5.5-5.5A5.5 5.5 0 0123 9c0 1.5-1.3 3-3 3H12"/></svg>,
  Light:  <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="2"/><path d="M9 18h6"/><path d="M12 2a7 7 0 010 14"/></svg>,
  Fridge: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/><line x1="10" y1="6" x2="10" y2="8"/></svg>,
  TV:     <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>,
};

const REC_STYLES = [
  { bg: "rgba(192,53,74,0.07)",  border: "rgba(192,53,74,0.2)",  iconBg: "rgba(192,53,74,0.12)",  iconColor: "var(--rose)" },
  { bg: "rgba(26,122,69,0.07)",  border: "rgba(26,122,69,0.2)",  iconBg: "rgba(26,122,69,0.12)",  iconColor: "var(--green)" },
  { bg: "rgba(196,124,10,0.07)", border: "rgba(196,124,10,0.2)", iconBg: "rgba(196,124,10,0.12)", iconColor: "var(--amber)" },
  { bg: "rgba(29,95,166,0.07)",  border: "rgba(29,95,166,0.2)",  iconBg: "rgba(29,95,166,0.12)",  iconColor: "var(--blue)" },
  { bg: "rgba(109,68,184,0.07)", border: "rgba(109,68,184,0.2)", iconBg: "rgba(109,68,184,0.12)", iconColor: "var(--purple)" },
];

export default function Recommendations() {
  const radarRef   = useRef(null);
  const radarChart = useRef(null);

  const [dailyData, setDailyData] = useState(
    () => JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData
  );
  const [usageHours, setUsageHours] = useState(
    () => JSON.parse(localStorage.getItem("applianceHours")) || defaultUsageHours
  );

  useEffect(() => {
    const d = JSON.parse(localStorage.getItem("dailyEnergyData"));
    const h = JSON.parse(localStorage.getItem("applianceHours"));
    if (d) setDailyData(d);
    if (h) setUsageHours(h);
  }, []);

  const totalUnits = dailyData.reduce((s, d) => s + d.units, 0);
  const peakDay    = dailyData.reduce((m, d) => d.units > m.units ? d : m);

  function generateRecommendations() {
    const recs = [];
    if (usageHours.AC >= 7)
      recs.push({ icon: APPLIANCE_ICONS.AC, title: "Reduce AC Usage", text: "Running too long. Raise thermostat 2°C or use timer.", color: 0 });
    if (usageHours.Fan >= 10)
      recs.push({ icon: APPLIANCE_ICONS.Fan, title: "Fan Overuse", text: "Switch off when leaving rooms.", color: 0 });
    if (totalUnits >= 70)
      recs.push({ icon: <svg viewBox="0 0 24 24"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>, title: "High Weekly Usage", text: "Identify and reduce heavy appliances.", color: 2 });
    if (peakDay.units >= 12)
      recs.push({ icon: <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, title: `Peak: ${peakDay.day}`, text: `High usage on ${peakDay.day}. Distribute load across the week.`, color: 2 });
    if (usageHours.Light >= 8)
      recs.push({ icon: APPLIANCE_ICONS.Light, title: "Switch to LED", text: "Long lighting hours. Use LED bulbs and motion sensors.", color: 3 });
    if (recs.length === 0)
      recs.push({ icon: <svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>, title: "All Good!", text: "Energy usage is well optimised. Keep it up!", color: 1 });
    return recs;
  }

  const recs = generateRecommendations();
  const overallScore = recs.length === 1 && recs[0].title === "All Good!" ? "Excellent" : recs.length <= 2 ? "Good" : "Needs Work";
  const bannerColor  = overallScore === "Excellent" ? "var(--green)" : overallScore === "Good" ? "var(--amber)" : "var(--rose)";
  const bannerBg     = overallScore === "Excellent" ? "rgba(26,122,69,0.85)" : overallScore === "Good" ? "rgba(196,124,10,0.85)" : "rgba(192,53,74,0.85)";

  // Radar chart: appliance efficiency scores
  useEffect(() => {
    if (radarChart.current) radarChart.current.destroy();
    if (radarRef.current) {
      const maxHours = { AC: 12, Fan: 12, Light: 12, Fridge: 24, TV: 10 };
      radarChart.current = new Chart(radarRef.current, {
        type: "radar",
        data: {
          labels: ["AC", "Fan", "Light", "Fridge", "TV"],
          datasets: [{
            label: "Efficiency %",
            data: Object.keys(maxHours).map((k) =>
              Math.round(100 - (usageHours[k] / maxHours[k]) * 100)
            ),
            backgroundColor: "rgba(44,160,90,0.15)",
            borderColor: "#2ca05a",
            pointBackgroundColor: "#2ca05a",
            pointRadius: 4,
          }],
        },
        options: {
          responsive: true, maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              min: 0, max: 100,
              ticks: { display: false },
              grid: { color: "rgba(26,122,69,0.1)" },
              pointLabels: { font: { family: "'Cabinet Grotesk', sans-serif", size: 11 } },
            },
          },
        },
      });
    }
    return () => radarChart.current?.destroy();
  }, [usageHours]);

  return (
    <div className="page">
      <img
        className="page-img-strip"
        src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=75&fit=crop"
        alt="Smart office"
      />

      <div className="page-title-row">
        <p className="section-tag">Smart Guidance</p>
        <h1>Recommendations</h1>
        <p className="subtext">Personalised tips from your energy data</p>
      </div>

      {/* Overall banner */}
      <div
        className="premium-card"
        style={{
          display: "flex", alignItems: "center", gap: 18, padding: "20px 24px",
          marginBottom: 16, background: bannerBg, border: "none",
        }}
      >
        <div style={{
          width: 52, height: 52, borderRadius: 15, background: "rgba(255,255,255,0.2)",
          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
          {overallScore === "Excellent"
            ? <svg viewBox="0 0 24 24" style={{ width: 26, height: 26, stroke: "#fff", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}><polyline points="20 6 9 17 4 12"/></svg>
            : overallScore === "Good"
            ? <svg viewBox="0 0 24 24" style={{ width: 26, height: 26, stroke: "#fff", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
            : <svg viewBox="0 0 24 24" style={{ width: 26, height: 26, stroke: "#fff", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          }
        </div>
        <div>
          <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "1.5px", fontWeight: 700, color: "rgba(255,255,255,0.75)", fontFamily: "'Cabinet Grotesk', sans-serif" }}>Overall Status</p>
          <h2 style={{ fontSize: 22, color: "#fff", marginTop: 2 }}>{overallScore}</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 13, marginTop: 3 }}>
            {recs.length} insight{recs.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      {/* Recommendation cards */}
      <div className="recommend-grid" style={{ marginBottom: 16 }}>
        {recs.map((r, i) => {
          const style = REC_STYLES[r.color] || REC_STYLES[0];
          return (
            <div
              key={i}
              className="premium-card recommendation-card"
              style={{ background: style.bg, borderColor: style.border }}
            >
              <div className="rec-icon-wrap" style={{ background: style.iconBg, color: style.iconColor }}>
                {r.icon}
              </div>
              <p className="section-tag" style={{ color: style.iconColor }}>Insight {i + 1}</p>
              <h2>{r.title}</h2>
              <p className="info-text">{r.text}</p>
            </div>
          );
        })}
      </div>

      {/* Radar chart */}
      <div className="premium-card" style={{ marginBottom: 16 }}>
        <p className="section-tag">Efficiency</p>
        <h2 style={{ fontSize: 17 }}>Appliance Efficiency Radar</h2>
        <div className="chart-canvas-wrap" style={{ height: 220 }}>
          <canvas ref={radarRef} role="img" aria-label="Appliance efficiency radar chart" />
        </div>
      </div>

      {/* Appliance pills */}
      <div className="premium-card">
        <p className="section-tag">Current Readings</p>
        <h2 style={{ fontSize: 17, marginBottom: 12 }}>Appliance Hours</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[["AC","blue"],["Fan","teal"],["Light","amber"],["Fridge","purple"],["TV","rose"]].map(([name, cls]) => (
            <div key={name} className="appliance-pill">
              <span style={{ color: `var(--${cls})` }}>{APPLIANCE_ICONS[name]}</span>
              <span>{name}</span>
              <span className="pill-val">{usageHours[name]}h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
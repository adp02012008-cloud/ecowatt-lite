import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const defaultDailyData = [
  { day:"Mon",units:8},{day:"Tue",units:10},{day:"Wed",units:7},
  { day:"Thu",units:12},{day:"Fri",units:9},{day:"Sat",units:11},{day:"Sun",units:13},
];

export default function Score() {
  const emissionFactor = 0.695;
  const lineRef  = useRef(null);
  const lineInst = useRef(null);

  const [dailyData, setDailyData] = useState(
    () => JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData
  );

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("dailyEnergyData"));
    if (saved) setDailyData(saved);
  }, []);

  const totalUnits = dailyData.reduce((s, i) => s + i.units, 0);
  const carbonKg   = totalUnits * emissionFactor;
  const ecoScore   = Math.max(20, Math.min(100, Math.round(100 - (carbonKg / 80) * 80)));

  const status      = ecoScore >= 80 ? "Outstanding" : ecoScore >= 60 ? "Good" : "Needs Work";
  const scoreColor  = ecoScore >= 80 ? "#2ca05a" : ecoScore >= 60 ? "#c47c0a" : "#c0354a";
  const scoreBg     = ecoScore >= 80 ? "rgba(44,160,90,0.08)"  : ecoScore >= 60 ? "rgba(196,124,10,0.08)"  : "rgba(192,53,74,0.08)";
  const scoreBorder = ecoScore >= 80 ? "rgba(44,160,90,0.2)"   : ecoScore >= 60 ? "rgba(196,124,10,0.2)"   : "rgba(192,53,74,0.2)";

  const circumference = Math.PI * 80;
  const progress      = (ecoScore / 100) * circumference;

  const tiers = [
    { range: "90–100", label: "Outstanding", color: "#2ca05a", bg: "rgba(44,160,90,0.07)",   border: "rgba(44,160,90,0.2)",   icon: <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg> },
    { range: "60–89",  label: "Good",        color: "#c47c0a", bg: "rgba(196,124,10,0.07)",  border: "rgba(196,124,10,0.2)",  icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg> },
    { range: "< 60",   label: "Needs Work",  color: "#c0354a", bg: "rgba(192,53,74,0.07)",   border: "rgba(192,53,74,0.2)",   icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg> },
  ];

  const historyScores = [
    Math.max(20, ecoScore - 13), Math.max(20, ecoScore - 9),
    Math.max(20, ecoScore - 6),  Math.max(20, ecoScore - 8),
    Math.max(20, ecoScore - 1),  ecoScore,
  ];

  useEffect(() => {
    if (lineInst.current) lineInst.current.destroy();
    if (!lineRef.current) return;
    lineInst.current = new Chart(lineRef.current, {
      type: "line",
      data: {
        labels: ["W1","W2","W3","W4","W5","W6"],
        datasets: [{
          data: historyScores,
          borderColor: scoreColor, backgroundColor: scoreBg,
          fill: true, tension: 0.4,
          pointBackgroundColor: scoreColor, pointRadius: 5, pointHoverRadius: 7,
        }],
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false } },
          y: { min: 0, max: 100, grid: { color: "rgba(26,122,69,0.07)" } },
        },
      },
    });
    return () => lineInst.current?.destroy();
  }, [dailyData]);

  const activeTier = tiers.find((t) => t.label === status);

  return (
    <div className="page">
      <img className="page-img-strip" src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=75&fit=crop" alt="Green landscape" />

      <div className="page-title-row">
        <p className="section-tag">Sustainability Meter</p>
        <h1>Eco Score</h1>
        <p className="subtext">Your sustainability rating this week</p>
      </div>

      <section className="score-layout">
        {/* Gauge */}
        <div className="premium-card score-panel">
          <p className="section-tag">Your Score</p>
          <div style={{ position: "relative", display: "flex", justifyContent: "center", marginTop: 8 }}>
            <svg width="220" height="130" viewBox="0 0 220 120">
              <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke="rgba(0,0,0,0.07)" strokeWidth="14" strokeLinecap="round"/>
              <path d="M 20 110 A 90 90 0 0 1 200 110" fill="none" stroke={scoreColor} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${progress} ${circumference}`} style={{ transition: "stroke-dasharray 1s ease" }}/>
              <text x="110" y="100" textAnchor="middle" fill={scoreColor} fontSize="38" fontWeight="700" fontFamily="Clash Display,sans-serif">{ecoScore}</text>
              <text x="110" y="118" textAnchor="middle" fill="#9ca3af" fontSize="10" fontFamily="Cabinet Grotesk,sans-serif">out of 100</text>
            </svg>
          </div>

          {activeTier && (
            <div style={{ width: 52, height: 52, borderRadius: 16, background: scoreBg, border: `1.5px solid ${scoreBorder}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "8px auto", color: scoreColor }}>
              {activeTier.icon}
            </div>
          )}
          <h2 style={{ color: scoreColor, fontSize: 22, marginTop: 2 }}>{status}</h2>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 18 }}>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>Energy</div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 20 }}>{totalUnits.toFixed(1)} kWh</div>
            </div>
            <div style={{ width: 1, background: "var(--border)" }} />
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: 10, color: "var(--muted)", textTransform: "uppercase", letterSpacing: 1, fontWeight: 700 }}>CO₂</div>
              <div style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 20 }}>{carbonKg.toFixed(1)} kg</div>
            </div>
          </div>
        </div>

        {/* Tiers + history chart */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {tiers.map((t, i) => (
            <div key={i} className="score-tier-card" style={{ background: t.bg, borderColor: t.label === status ? t.color : t.border, boxShadow: t.label === status ? `0 4px 18px ${t.color}25` : "none", color: t.color }}>
              {t.icon}
              <div>
                <div style={{ fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 14 }}>{t.range}</div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{t.label}</div>
              </div>
              {t.label === status && <span className="you-tag" style={{ background: t.color }}>YOU</span>}
            </div>
          ))}

          <div className="premium-card" style={{ padding: 16 }}>
            <p className="section-tag">History</p>
            <h2 style={{ fontSize: 15 }}>6-Week Trend</h2>
            <div className="chart-canvas-wrap" style={{ height: 130, marginTop: 8 }}>
              <canvas ref={lineRef} role="img" aria-label="Eco score 6-week history" />
            </div>
          </div>
        </div>
      </section>

      <div className="premium-card" style={{ marginTop: 16 }}>
        <p className="section-tag">Formula</p>
        <h2 style={{ fontSize: 17 }}>Score Calculation</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 14, flexWrap: "wrap" }}>
          <div style={{ background: "var(--surface2)", borderRadius: 12, padding: "11px 16px", fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 14, border: "1px solid var(--border)" }}>
            100 − (CO₂ ÷ 80) × 80
          </div>
          <span style={{ color: "var(--muted)", fontSize: 18 }}>→</span>
          <div style={{ background: scoreBg, borderRadius: 12, padding: "11px 16px", fontFamily: "'Clash Display',sans-serif", fontWeight: 700, fontSize: 14, color: scoreColor, border: `1px solid ${scoreBorder}` }}>
            Score = {ecoScore}
          </div>
        </div>
      </div>
    </div>
  );
}
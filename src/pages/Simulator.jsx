import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

const appliancePower    = { AC: 1.5, Fan: 0.08, Light: 0.05, Fridge: 0.2, TV: 0.1 };
const defaultUsageHours = { AC: 4, Fan: 8, Light: 6, Fridge: 24, TV: 3 };
const defaultDailyData  = [{ day:"Mon",units:8},{day:"Tue",units:10},{day:"Wed",units:7},{day:"Thu",units:12},{day:"Fri",units:9},{day:"Sat",units:11},{day:"Sun",units:13}];

const APPLIANCE_META = {
  AC:     { color: "#1d5fa6", bg: "rgba(29,95,166,0.1)",  icon: <svg viewBox="0 0 24 24"><path d="M4 8a8 8 0 0116 0v8H4V8z"/><path d="M9 16v2a3 3 0 006 0v-2"/></svg> },
  Fan:    { color: "#0a7a72", bg: "rgba(10,122,114,0.1)", icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M12 9c0-3 2.5-5.5 5.5-5.5A5.5 5.5 0 0123 9c0 1.5-1.3 3-3 3H12"/></svg> },
  Light:  { color: "#c47c0a", bg: "rgba(196,124,10,0.1)", icon: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="2"/><path d="M9 18h6"/><path d="M12 2a7 7 0 010 14"/></svg> },
  Fridge: { color: "#6d44b8", bg: "rgba(109,68,184,0.1)", icon: <svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="5" y1="10" x2="19" y2="10"/></svg> },
  TV:     { color: "#c0354a", bg: "rgba(192,53,74,0.1)",  icon: <svg viewBox="0 0 24 24"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg> },
};

export default function Simulator() {
  const emissionFactor = 0.695;
  const barRef  = useRef(null);
  const barInst = useRef(null);

  const [usageHours] = useState(() => JSON.parse(localStorage.getItem("applianceHours"))  || defaultUsageHours);
  const [dailyData]  = useState(() => JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData);

  const [selectedAppliance, setSelected] = useState("AC");
  const [reduceHours, setReduceHours]    = useState("");
  const [result, setResult]              = useState(null);

  const totalUnits     = dailyData.reduce((s, d) => s + d.units, 0);
  const originalCarbon = totalUnits * emissionFactor;
  const meta           = APPLIANCE_META[selectedAppliance];

  function simulate() {
    const reduce = parseFloat(reduceHours);
    if (isNaN(reduce) || reduce <= 0) { alert("Enter valid reduction hours"); return; }
    const currentH   = usageHours[selectedAppliance];
    const newH       = Math.max(currentH - reduce, 0);
    const savedUnits = (currentH - newH) * appliancePower[selectedAppliance];
    const newTotal   = totalUnits - savedUnits;
    const newCarbon  = newTotal * emissionFactor;
    const getScore   = (c) => c >= 50 ? 58 : c >= 35 ? 74 : 90;
    setResult({
      savedUnits:  savedUnits.toFixed(2),
      newTotal:    newTotal.toFixed(2),
      carbonSaved: (originalCarbon - newCarbon).toFixed(2),
      newCarbon:   newCarbon.toFixed(2),
      newScore:    getScore(newCarbon),
      oldScore:    getScore(originalCarbon),
    });
  }

  useEffect(() => {
    if (barInst.current) barInst.current.destroy();
    if (!result || !barRef.current) return;
    barInst.current = new Chart(barRef.current, {
      type: "bar",
      data: {
        labels: ["Energy Saved", "New Total", "CO₂ Saved", "New CO₂"],
        datasets: [{
          data: [parseFloat(result.savedUnits), parseFloat(result.newTotal), parseFloat(result.carbonSaved), parseFloat(result.newCarbon)],
          backgroundColor: ["#2ca05a", "#1d5fa6", "#2ca05a", "#c0354a"],
          borderRadius: 7, borderSkipped: false,
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
    return () => barInst.current?.destroy();
  }, [result]);

  const resultStats = result ? [
    { icon: <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>, cls: "green", label: "Energy Saved",  value: `${result.savedUnits} kWh` },
    { icon: <svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>, cls: "blue",  label: "New Total",    value: `${result.newTotal} kWh` },
    { icon: <svg viewBox="0 0 24 24"><path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.7 21C8 19 9 18 12 18c0 0 5-3 5-10z"/></svg>, cls: "green", label: "CO₂ Saved",   value: `${result.carbonSaved} kg` },
    { icon: <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>, cls: "amber", label: "New Eco Score", value: result.newScore },
  ] : [];

  return (
    <div className="page">
      <img className="page-img-strip" src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=75&fit=crop" alt="Analytics" />

      <div className="page-title-row">
        <p className="section-tag">Innovation Module</p>
        <h1>Savings Simulator</h1>
        <p className="subtext">What if you used less? Find out instantly.</p>
      </div>

      {/* Appliance picker */}
      <div className="premium-card input-card">
        <p className="section-tag">Pick Appliance</p>
        <div className="sim-appliance-grid">
          {Object.keys(APPLIANCE_META).map((name) => {
            const m   = APPLIANCE_META[name];
            const sel = selectedAppliance === name;
            return (
              <div key={name} className={`sim-app-card${sel ? " selected" : ""}`}
                onClick={() => setSelected(name)}
                style={{ background: sel ? m.color : m.bg, borderColor: sel ? m.color : "var(--border)", color: sel ? "#fff" : m.color, boxShadow: sel ? `0 6px 18px ${m.color}40` : "none" }}>
                {m.icon}
                <div>{name}</div>
                <div style={{ fontSize: 10, opacity: 0.75 }}>{appliancePower[name]} kW</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Input */}
      <div className="premium-card input-card" style={{ background: meta.bg, border: `1.5px solid ${meta.color}25` }}>
        <p className="section-tag" style={{ color: meta.color }}>Simulate: {selectedAppliance}</p>
        <p className="info-text">Current usage: <strong>{usageHours[selectedAppliance]} hrs/day</strong></p>
        <div className="input-row" style={{ marginTop: 12 }}>
          <input type="number" placeholder="Hours to reduce" className="premium-input" value={reduceHours} onChange={(e) => setReduceHours(e.target.value)} />
          <button className="action-btn" onClick={simulate} style={{ background: meta.color, boxShadow: `0 6px 18px ${meta.color}40` }}>
            <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            Run Simulation
          </button>
        </div>
      </div>

      {result && (
        <>
          <section className="stats-grid">
            {resultStats.map((s, i) => (
              <div key={i} className="premium-card stat-box">
                <div className={`stat-icon ${s.cls}`}>{s.icon}</div>
                <p>{s.label}</p>
                <h3>{s.value}</h3>
              </div>
            ))}
          </section>

          {/* Before / After */}
          <div className="premium-card" style={{ marginBottom: 16 }}>
            <p className="section-tag">Score Impact</p>
            <h2 style={{ fontSize: 17 }}>Before vs After</h2>
            <div className="before-after-row">
              <div className="ba-box" style={{ background: "rgba(192,53,74,0.07)", borderColor: "rgba(192,53,74,0.2)" }}>
                <div className="ba-label">Before</div>
                <div className="ba-val" style={{ color: "var(--rose)" }}>{result.oldScore}</div>
              </div>
              <svg viewBox="0 0 24 24" style={{ width: 28, height: 28, stroke: "var(--muted)", fill: "none", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round", flexShrink: 0 }}>
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
              <div className="ba-box" style={{ background: "rgba(44,160,90,0.07)", borderColor: "rgba(44,160,90,0.2)" }}>
                <div className="ba-label">After</div>
                <div className="ba-val" style={{ color: "var(--green)" }}>{result.newScore}</div>
              </div>
            </div>
            <p className="info-text" style={{ marginTop: 12, textAlign: "center" }}>
              Reducing <strong>{selectedAppliance}</strong> by <strong>{reduceHours}h</strong> improves score by{" "}
              <strong style={{ color: "var(--green)" }}>+{result.newScore - result.oldScore}</strong>
            </p>
          </div>

          {/* Chart */}
          <div className="premium-card">
            <p className="section-tag">Breakdown</p>
            <h2 style={{ fontSize: 17 }}>Savings Overview</h2>
            <div className="chart-canvas-wrap" style={{ height: 200 }}>
              <canvas ref={barRef} role="img" aria-label="Savings breakdown bar chart" />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
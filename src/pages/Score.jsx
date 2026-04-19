export default function Score() {
  const ecoScore = 82;
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
        </div>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";

export default function Score() {
  const ecoScore = 82;

  let status = "Excellent";
  if (ecoScore < 80) status = "Good";
  if (ecoScore < 60) status = "Needs Improvement";

  return (
    <div className="page">
      <div className="topbar">
        <h1>Eco Score</h1>
        <Link to="/" className="btn">Back</Link>
      </div>

      <div className="card center-card">
        <h2>Your Sustainability Score</h2>
        <p className="score-circle">{ecoScore}</p>
        <p className="status-text">{status}</p>
      </div>

      <div className="card">
        <h3>How score is interpreted</h3>
        <p>90–100 → Outstanding energy efficiency</p>
        <p>70–89 → Good sustainable usage</p>
        <p>Below 70 → Needs optimization</p>
      </div>
    </div>
  );
}
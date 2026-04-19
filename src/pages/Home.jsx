import { FaArrowRight, FaBolt, FaLeaf, FaBrain, FaLightbulb } from "react-icons/fa";

export default function Home() {
  const predictedUnits = 11.2;
  const ecoScore = 82;

  return (
    <div className="page">
      <section className="hero premium-hero">
        <div>
          <p className="section-tag">Smart Energy Platform</p>
          <h1>EcoWatt Lite Dashboard</h1>
          <p className="hero-text">
            Monitor usage, estimate carbon impact, predict next-day consumption,
            and guide users toward more sustainable energy behavior.
          </p>

          <div className="hero-actions">
            <button className="primary-btn">Live Prototype</button>
            <button className="secondary-btn">System Overview</button>
          </div>
        </div>

        <div className="hero-side-card">
          <p className="mini-label">Next-Day Prediction</p>
          <h2>{predictedUnits} kWh</h2>
          <span>Based on recent usage pattern</span>
        </div>
      </section>

      <section className="stats-grid">
        <div className="premium-card stat-box">
          <p>Total Efficiency</p>
          <h3>87%</h3>
        </div>
        <div className="premium-card stat-box">
          <p>Eco Score</p>
          <h3>{ecoScore}/100</h3>
        </div>
        <div className="premium-card stat-box">
          <p>Carbon Status</p>
          <h3>Moderate</h3>
        </div>
        <div className="premium-card stat-box">
          <p>Recommendation Count</p>
          <h3>05</h3>
        </div>
      </section>

      <section className="premium-card">
        <div className="section-head">
          <div>
            <p className="section-tag">Workflow</p>
            <h2>System Flow</h2>
          </div>
        </div>

        <div className="flow-row">
          <div className="flow-node">
            <FaBolt />
            <span>User Energy Data</span>
          </div>
          <FaArrowRight className="flow-arrow" />
          <div className="flow-node">
            <FaBrain />
            <span>Prediction Logic</span>
          </div>
          <FaArrowRight className="flow-arrow" />
          <div className="flow-node">
            <FaLeaf />
            <span>Carbon Analysis</span>
          </div>
          <FaArrowRight className="flow-arrow" />
          <div className="flow-node">
            <FaLightbulb />
            <span>Smart Recommendations</span>
          </div>
        </div>
      </section>

      <section className="two-col-grid">
        <div className="premium-card">
          <p className="section-tag">AI Insight</p>
          <h2>Main Prediction</h2>
          <p className="info-text">
            The system estimates next-day consumption using recent energy
            patterns. In future, this can be extended with machine learning
            models like Linear Regression or Random Forest.
          </p>
          <div className="highlight-number">{predictedUnits} kWh</div>
        </div>

        <div className="premium-card">
          <p className="section-tag">Project Value</p>
          <h2>Why It Matters</h2>
          <p className="info-text">
            EcoWatt Lite is designed to make electricity usage easier to
            understand and more actionable through monitoring, carbon awareness,
            and intelligent sustainability guidance.
          </p>
        </div>
      </section>
    </div>
  );
}
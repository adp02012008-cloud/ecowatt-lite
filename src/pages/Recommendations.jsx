import { Link } from "react-router-dom";

export default function Recommendations() {
  const recommendations = [
    "Reduce AC usage during peak evening hours.",
    "Switch off lights and fans when not in use.",
    "Use LED bulbs to reduce electricity consumption.",
    "Run heavy appliances during low-demand periods.",
    "Monitor refrigerator and cooling settings regularly.",
  ];

  return (
    <div className="page">
      <div className="topbar">
        <h1>Smart Recommendations</h1>
        <Link to="/" className="btn">Back</Link>
      </div>

      <div className="card">
        <h2>Energy Saving Tips</h2>
        <ul className="list">
          {recommendations.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
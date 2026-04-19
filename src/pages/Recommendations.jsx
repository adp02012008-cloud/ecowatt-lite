export default function Recommendations() {
  const recommendations = [
    {
      title: "Reduce Peak-Hour AC Load",
      text: "Limit AC usage during high-demand evening periods to reduce energy spikes.",
    },
    {
      title: "Shift Heavy Appliance Usage",
      text: "Use washing machines and water heaters during lower-demand periods.",
    },
    {
      title: "Improve Lighting Efficiency",
      text: "Replace conventional bulbs with LED lights to reduce electricity consumption.",
    },
    {
      title: "Smart Cooling Practices",
      text: "Set AC temperatures optimally and maintain clean filters for better efficiency.",
    },
  ];

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Smart Guidance</p>
          <h1>Recommendations</h1>
        </div>
      </div>

      <div className="recommend-grid">
        {recommendations.map((item, index) => (
          <div className="premium-card recommendation-card" key={index}>
            <h2>{item.title}</h2>
            <p className="info-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";

export default function Monitor() {
  const dailyData = [
    { day: "Mon", units: 8 },
    { day: "Tue", units: 10 },
    { day: "Wed", units: 7 },
    { day: "Thu", units: 12 },
    { day: "Fri", units: 9 },
    { day: "Sat", units: 11 },
    { day: "Sun", units: 13 },
  ];

  const applianceData = [
    { name: "AC", units: 5 },
    { name: "Fan", units: 2 },
    { name: "Light", units: 1.5 },
    { name: "Fridge", units: 3 },
    { name: "TV", units: 2.5 },
  ];

  const totalUnits = dailyData.reduce((sum, item) => sum + item.units, 0);
  const peakDay = dailyData.reduce((max, item) =>
    item.units > max.units ? item : max
  );

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Monitoring Module</p>
          <h1>Energy Monitoring</h1>
        </div>
      </div>

      <div className="stats-grid">
        <div className="premium-card stat-box">
          <p>Total Weekly Units</p>
          <h3>{totalUnits} kWh</h3>
        </div>
        <div className="premium-card stat-box">
          <p>Peak Usage Day</p>
          <h3>{peakDay.day}</h3>
        </div>
        <div className="premium-card stat-box">
          <p>Highest Usage</p>
          <h3>{peakDay.units} kWh</h3>
        </div>
      </div>

      <div className="chart-grid">
        <div className="premium-card">
          <p className="section-tag">Trend Analysis</p>
          <h2>Weekly Usage Trend</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="units" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="premium-card">
          <p className="section-tag">Breakdown</p>
          <h2>Appliance Consumption</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={applianceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="units" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
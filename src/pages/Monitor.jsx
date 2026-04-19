import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
      <div className="topbar">
        <h1>Energy Monitoring</h1>
        <Link to="/" className="btn">Back</Link>
      </div>

      <div className="stats-row">
        <div className="card">
          <h3>Total Weekly Units</h3>
          <p className="big-value">{totalUnits} kWh</p>
        </div>

        <div className="card">
          <h3>Peak Usage Day</h3>
          <p className="big-value">{peakDay.day}</p>
          <p>{peakDay.units} kWh</p>
        </div>
      </div>

      <div className="card">
        <h2>Weekly Energy Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dailyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="units" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h2>Appliance Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
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
  );
}
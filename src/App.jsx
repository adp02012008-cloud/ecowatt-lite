import "./App.css";
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

function App() {
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

  const avgLast3Days =
    (dailyData[dailyData.length - 1].units +
      dailyData[dailyData.length - 2].units +
      dailyData[dailyData.length - 3].units) / 3;

  const predictedUnits = avgLast3Days.toFixed(1);

  const carbonEmission = (totalUnits * 0.82).toFixed(2);

  function getSuggestion() {
    if (totalUnits > 65) {
      return "High usage! Reduce AC usage during peak hours.";
    } else if (totalUnits > 55) {
      return "Moderate usage. Turn off unused devices.";
    } else {
      return "Good job! Energy usage is efficient.";
    }
  }

  function getEcoScore() {
    if (totalUnits > 65) return 55;
    if (totalUnits > 55) return 75;
    return 90;
  }

  const suggestion = getSuggestion();
  const ecoScore = getEcoScore();

  return (
    <div className="app">
      <h1>EcoWatt Lite Dashboard</h1>

      <div className="cards">
        <div className="card">
          <h3>Total Units</h3>
          <p>{totalUnits} kWh</p>
        </div>

        <div className="card">
          <h3>Prediction</h3>
          <p>{predictedUnits} kWh</p>
        </div>

        <div className="card">
          <h3>Carbon</h3>
          <p>{carbonEmission} kg CO₂</p>
        </div>

        <div className="card">
          <h3>Eco Score</h3>
          <p>{ecoScore}/100</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart-box">
          <h2>Weekly Usage</h2>
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

        <div className="chart-box">
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

      <div className="bottom">
        <div className="card">
          <h2>AI Insight</h2>
          <p>Predicted next-day usage: {predictedUnits} kWh</p>
        </div>

        <div className="card">
          <h2>Recommendation</h2>
          <p>{suggestion}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
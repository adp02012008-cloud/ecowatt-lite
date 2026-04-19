import { useMemo } from "react";

const appliancePower = {
  AC: 1.5,
  Fan: 0.08,
  Light: 0.05,
  Fridge: 0.2,
  TV: 0.1,
};

const defaultUsageHours = {
  AC: 4,
  Fan: 8,
  Light: 6,
  Fridge: 24,
  TV: 3,
};

const defaultDailyData = [
  { day: "Mon", units: 8 },
  { day: "Tue", units: 10 },
  { day: "Wed", units: 7 },
  { day: "Thu", units: 12 },
  { day: "Fri", units: 9 },
  { day: "Sat", units: 11 },
  { day: "Sun", units: 13 },
];

export default function Recommendations() {
  const usageHours =
    JSON.parse(localStorage.getItem("applianceHours")) || defaultUsageHours;

  const dailyData =
    JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData;

  const applianceData = useMemo(() => {
    return Object.keys(appliancePower).map((name) => ({
      name,
      hours: usageHours[name],
      units: +(appliancePower[name] * usageHours[name]).toFixed(2),
    }));
  }, [usageHours]);

  const totalApplianceUnits = useMemo(() => {
    return applianceData.reduce((sum, item) => sum + item.units, 0);
  }, [applianceData]);

  const totalDayUnits = useMemo(() => {
    return dailyData.reduce((sum, item) => sum + item.units, 0);
  }, [dailyData]);

  const peakAppliance = useMemo(() => {
    return applianceData.reduce((max, item) =>
      item.units > max.units ? item : max
    );
  }, [applianceData]);

  const peakDay = useMemo(() => {
    return dailyData.reduce((max, item) =>
      item.units > max.units ? item : max
    );
  }, [dailyData]);

  const averageDayUnits = useMemo(() => {
    return totalDayUnits / dailyData.length;
  }, [totalDayUnits, dailyData.length]);

  const lowestDay = useMemo(() => {
    return dailyData.reduce((min, item) =>
      item.units < min.units ? item : min
    );
  }, [dailyData]);

  const cards = useMemo(() => {
    const result = [];

    // Priority alert
    if (peakAppliance.name === "AC" && peakAppliance.units >= 9) {
      result.push({
        title: "High Priority Alert",
        type: "alert",
        text: `AC is the highest energy-consuming appliance at ${peakAppliance.units} kWh. Reducing AC runtime or increasing temperature setting can significantly lower total consumption.`,
      });
    } else if (peakDay.units >= 13) {
      result.push({
        title: "Peak-Day Alert",
        type: "alert",
        text: `${peakDay.day} has the highest day-wise usage at ${peakDay.units} kWh. Shift heavy appliance usage away from this day to reduce load.`,
      });
    } else {
      result.push({
        title: "System Status",
        type: "positive",
        text: "No extreme spike detected in current energy usage. Your overall usage pattern is relatively stable.",
      });
    }

    // Appliance specific
    if (usageHours.AC >= 7) {
      result.push({
        title: "Cooling Optimization",
        type: "warning",
        text: `AC is used for ${usageHours.AC} hours. Since AC has a high power rating, even a 1–2 hour reduction can save noticeable energy.`,
      });
    }

    if (usageHours.Fan >= 12) {
      result.push({
        title: "Fan Usage Insight",
        type: "warning",
        text: `Fan usage is ${usageHours.Fan} hours. Check whether all fans are needed continuously throughout the day.`,
      });
    }

    if (usageHours.Light >= 10) {
      result.push({
        title: "Lighting Recommendation",
        type: "warning",
        text: `Lighting usage is high at ${usageHours.Light} hours. Use LED bulbs and switch off unused lights to improve efficiency.`,
      });
    }

    if (usageHours.TV >= 6) {
      result.push({
        title: "Entertainment Load",
        type: "info",
        text: `TV usage is ${usageHours.TV} hours. Reducing entertainment appliance runtime can slightly improve energy efficiency.`,
      });
    }

    if (usageHours.Fridge === 24) {
      result.push({
        title: "Continuous Appliance Note",
        type: "info",
        text: "Fridge runs continuously by design. Keep cooling settings optimized and avoid frequent door opening to reduce unnecessary load.",
      });
    }

    // Day wise pattern
    if (peakDay.units - lowestDay.units >= 5) {
      result.push({
        title: "Weekly Variation Insight",
        type: "info",
        text: `There is a noticeable difference between your highest day (${peakDay.day}: ${peakDay.units} kWh) and lowest day (${lowestDay.day}: ${lowestDay.units} kWh). This indicates uneven weekly consumption.`,
      });
    } else {
      result.push({
        title: "Balanced Day-wise Usage",
        type: "positive",
        text: "Your day-wise usage is fairly balanced across the week, which indicates a consistent energy pattern.",
      });
    }

    // Overall total recommendation
    if (totalDayUnits >= 70 || totalApplianceUnits >= 12) {
      result.push({
        title: "Overall Efficiency Action",
        type: "alert",
        text: "Total monitored consumption is high. Focus first on reducing AC runtime and avoiding heavy usage during peak days.",
      });
    } else if (totalDayUnits >= 55 || totalApplianceUnits >= 9) {
      result.push({
        title: "Moderate Optimization Needed",
        type: "warning",
        text: "Your energy usage is moderate. Small improvements in appliance timing can improve efficiency.",
      });
    } else {
      result.push({
        title: "Efficient Usage Pattern",
        type: "positive",
        text: "Your current usage pattern is efficient. Maintain this behavior for better sustainability performance.",
      });
    }

    // Best day suggestion
    result.push({
      title: "Suggested Action Plan",
      type: "info",
      text: `Use ${lowestDay.day} as your benchmark low-consumption day and try to follow similar appliance usage patterns on higher-consumption days.`,
    });

    return result;
  }, [
    peakAppliance,
    peakDay,
    lowestDay,
    totalDayUnits,
    totalApplianceUnits,
    usageHours,
  ]);

  function getBadgeClass(type) {
    if (type === "alert") return "badge red-badge";
    if (type === "warning") return "badge yellow-badge";
    if (type === "positive") return "badge green-badge";
    return "badge blue-badge";
  }

  function getScoreLabel() {
    if (totalDayUnits >= 70 || totalApplianceUnits >= 12) return "Needs Improvement";
    if (totalDayUnits >= 55 || totalApplianceUnits >= 9) return "Moderate";
    return "Efficient";
  }

  return (
    <div className="page">
      <div className="page-title-row">
        <div>
          <p className="section-tag">Smart Guidance</p>
          <h1>Recommendations</h1>
          <p className="subtext">
            Generated dynamically from Monitoring page appliance usage and day-wise energy data.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="premium-card stat-box">
          <p>Total Day-wise Units</p>
          <h3>{totalDayUnits.toFixed(2)} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Total Appliance Units</p>
          <h3>{totalApplianceUnits.toFixed(2)} kWh</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Peak Appliance</p>
          <h3>{peakAppliance.name}</h3>
        </div>

        <div className="premium-card stat-box">
          <p>Efficiency Status</p>
          <h3>{getScoreLabel()}</h3>
        </div>
      </div>

      <div className="premium-card">
        <p className="section-tag">Quick Summary</p>
        <h2>System Insight</h2>
        <p className="info-text">
          The highest consuming appliance is <strong>{peakAppliance.name}</strong> at{" "}
          <strong>{peakAppliance.units} kWh</strong>. The peak day is{" "}
          <strong>{peakDay.day}</strong> with <strong>{peakDay.units} kWh</strong>.
          Average day-wise usage is <strong>{averageDayUnits.toFixed(2)} kWh</strong>.
        </p>
      </div>

      <div className="recommend-grid">
        {cards.map((item, index) => (
          <div className="premium-card recommendation-card" key={index}>
            <div className={getBadgeClass(item.type)}>{item.title}</div>
            <p className="info-text recommendation-text">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
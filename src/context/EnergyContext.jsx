import { createContext, useState } from "react";

export const EnergyContext = createContext();

const defaultDailyData = [
  { day: "Mon", units: 8 },
  { day: "Tue", units: 10 },
  { day: "Wed", units: 7 },
  { day: "Thu", units: 12 },
  { day: "Fri", units: 9 },
  { day: "Sat", units: 11 },
  { day: "Sun", units: 13 },
];

export function EnergyProvider({ children }) {
  const [dailyData, setDailyData] = useState(
    () => JSON.parse(localStorage.getItem("dailyEnergyData")) || defaultDailyData
  );

  const updateDailyData = (data) => {
    setDailyData(data);
    localStorage.setItem("dailyEnergyData", JSON.stringify(data));
  };

  return (
    <EnergyContext.Provider value={{ dailyData, setDailyData: updateDailyData }}>
      {children}
    </EnergyContext.Provider>
  );
}
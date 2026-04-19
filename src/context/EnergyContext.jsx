import { createContext, useState } from "react";

export const EnergyContext = createContext();

export function EnergyProvider({ children }) {
  const [dailyData, setDailyData] = useState([
    { day: "Mon", units: 8 },
    { day: "Tue", units: 10 },
    { day: "Wed", units: 7 },
    { day: "Thu", units: 12 },
    { day: "Fri", units: 9 },
    { day: "Sat", units: 11 },
    { day: "Sun", units: 13 },
  ]);

  return (
    <EnergyContext.Provider value={{ dailyData, setDailyData }}>
      {children}
    </EnergyContext.Provider>
  );
}
// import { NavLink } from "react-router-dom";
// import {
//   FaBolt,
//   FaChartLine,
//   FaLeaf,
//   FaLightbulb,
//   FaMedal,
// } from "react-icons/fa";

// export default function Sidebar() {
//   return (
//     <aside className="sidebar">
//       <div className="brand">
//         <div className="brand-icon">
//           <FaBolt />
//         </div>
//         <div>
//           <h2>EcoWatt</h2>
//           <p>Smart Energy Suite</p>
//         </div>
//       </div>

//       <nav className="nav-links">
//         <NavLink to="/" className="nav-item">
//           <FaChartLine />
//           <span>Overview</span>
//         </NavLink>

//         <NavLink to="/monitor" className="nav-item">
//           <FaChartLine />
//           <span>Monitoring</span>
//         </NavLink>

//         <NavLink to="/carbon" className="nav-item">
//           <FaLeaf />
//           <span>Carbon Tracker</span>
//         </NavLink>

//         <NavLink to="/recommendations" className="nav-item">
//           <FaLightbulb />
//           <span>Recommendations</span>
//         </NavLink>

//         <NavLink to="/score" className="nav-item">
//           <FaMedal />
//           <span>Eco Score</span>
//         </NavLink>
//       </nav>

//       <div className="sidebar-footer">
//         <p>AI-powered sustainable energy experience</p>
//       </div>
//     </aside>
//   );
// }

import { NavLink } from "react-router-dom";
import {
  FaBolt,
  FaChartLine,
  FaLeaf,
  FaLightbulb,
  FaMedal,
  FaFlask,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <FaBolt />
        </div>

        <div>
          <h2>EcoWatt</h2>
          <p>Smart Energy Suite</p>
        </div>
      </div>

      <nav className="nav-links">
        <NavLink to="/" className="nav-item">
          <FaChartLine />
          <span>Overview</span>
        </NavLink>

        <NavLink to="/monitor" className="nav-item">
          <FaChartLine />
          <span>Monitoring</span>
        </NavLink>

        <NavLink to="/carbon" className="nav-item">
          <FaLeaf />
          <span>Carbon Tracker</span>
        </NavLink>

        <NavLink to="/recommendations" className="nav-item">
          <FaLightbulb />
          <span>Recommendations</span>
        </NavLink>

        <NavLink to="/simulator" className="nav-item">
          <FaFlask />
          <span>Simulator</span>
        </NavLink>
        
        <NavLink to="/score" className="nav-item">
          <FaMedal />
          <span>Eco Score</span>
        </NavLink>

      </nav>

      <div className="sidebar-footer">
        <p>AI-powered sustainable energy experience</p>
      </div>
    </aside>
  );
}
import { NavLink } from "react-router-dom";

const NAV = [
  {
    to: "/",
    label: "Home",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    to: "/monitor",
    label: "Monitor",
    icon: (
      <svg viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    to: "/carbon",
    label: "Carbon",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    to: "/recommendations",
    label: "Tips",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
  },
  {
    to: "/simulator",
    label: "Simulate",
    icon: (
      <svg viewBox="0 0 24 24">
        <polygon points="5 3 19 12 5 21 5 3" />
      </svg>
    ),
  },
  {
    to: "/score",
    label: "Score",
    icon: (
      <svg viewBox="0 0 24 24">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
  },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">
          <svg viewBox="0 0 24 24">
            <path d="M17 8C8 10 5.9 16.17 3.82 19.34A1 1 0 004.7 21C8 19 9 18 12 18c0 0 5-3 5-10z" />
            <line x1="12" y1="18" x2="12" y2="22" />
          </svg>
        </div>
      </div>

      <nav className="nav-links">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            end={n.to === "/"}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            {n.icon}
            <span>{n.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
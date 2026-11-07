
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: "▦" },
    { name: "Timetable", path: "/timetable", icon: "▤" },
    { name: "Projects", path: "/projects", icon: "▣" },
    { name: "Teachers", path: "/teachers", icon: "♙" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>Timely<span>.</span></h2>
        <p>College Planner</p>
      </div>

      <nav className="sidebar-navigation">
        <p className="sidebar-label">MENU</p>

        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end={item.end}
            className={({ isActive }) =>
              `sidebar-menu-item ${isActive ? "active" : ""}`
            }
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `sidebar-menu-item ${isActive ? "active" : ""}`
          }
        >
          <span className="sidebar-icon">⚙</span>
          <span>Settings</span>
        </NavLink>

        <div className="sidebar-help">
          <div className="help-icon">✦</div>
          <h4>Need help?</h4>
          <p>Get help managing your schedule.</p>
          <button
            type="button"
            onClick={() => alert("Help section coming soon!")}
          >
            Get Support →
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

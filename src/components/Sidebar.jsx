import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">🎓</div>

        <div>
          <h2>Timely</h2>
          <span>College Planner</span>
        </div>
      </div>

      <nav className="sidebar-nav">

        <p className="nav-title">MENU</p>

        <a href="#" className="nav-item active">
          <span>⌂</span>
          Dashboard
        </a>

        <a href="#" className="nav-item">
          <span>▦</span>
          Timetable
        </a>

        <a href="#" className="nav-item">
          <span>◫</span>
          Subjects
        </a>

        <a href="#" className="nav-item">
          <span>◉</span>
          Teachers
        </a>

        <p className="nav-title">GENERAL</p>

        <a href="#" className="nav-item">
          <span>⚙</span>
          Settings
        </a>

      </nav>

      <div className="sidebar-bottom">

        <div className="help-box">
          <div className="help-icon">?</div>

          <div>
            <strong>Need help?</strong>
            <p>Check your schedule</p>
          </div>
        </div>

      </div>

    </aside>
  );
}

export default Sidebar;
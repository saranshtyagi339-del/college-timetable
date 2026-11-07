
import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-heading">
        <h1>Dashboard</h1>
        <p>Manage your college schedule easily</p>
      </div>

      <div className="navbar-actions">
        {/* Search */}
        <div className="navbar-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search..."
            aria-label="Search"
          />
        </div>

        {/* Notification */}
        <button
          type="button"
          className="notification-btn"
          aria-label="Notifications"
          onClick={() => alert("No new notifications")}
        >
          ♧
        </button>

        {/* Student Profile */}
        <div className="navbar-profile">
          <div className="profile-avatar">ST</div>

          <div className="profile-details">
            <h4>Student</h4>
            <p>CSE • Semester V</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

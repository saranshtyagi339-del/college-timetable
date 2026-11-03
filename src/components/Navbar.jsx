import "./Navbar.css";

function Navbar() {
  return (
    <header className="navbar">

      <div className="page-title">
        <h1>Dashboard</h1>
        <p>Manage your college schedule easily</p>
      </div>

      <div className="navbar-actions">

        <div className="search-box">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search..."
          />
        </div>

        <button className="notification-btn">
          ♢
        </button>

        <div className="profile">
          <div className="profile-avatar">
            ST
          </div>

          <div className="profile-info">
            <strong>Student</strong>
            <span>CSE • Semester V</span>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;
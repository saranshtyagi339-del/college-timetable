
import { Link } from "react-router-dom";
import "./RoleSelection.css";

function RoleSelection() {
  const roles = [
    {
      title: "Student",
      description:
        "Access your personal dashboard, weekly timetable and academic information.",
      icon: "🎓",
      path: "/login/student",
      className: "student-role",
      features: ["View weekly timetable", "Check daily classes", "Manage profile"],
    },
    {
      title: "Teacher",
      description:
        "View your assigned classes, teaching schedule and faculty information.",
      icon: "👨‍🏫",
      path: "/login/teacher",
      className: "teacher-role",
      features: ["View teaching schedule", "Check assigned classes", "View profile"],
    },
    {
      title: "Timetable Admin",
      description:
        "Manage students, teachers, classrooms and publish college timetables.",
      icon: "📅",
      path: "/login/admin",
      className: "admin-role",
      features: ["Create timetables", "Manage faculty", "Publish schedules"],
    },
  ];

  return (
    <div className="role-selection-page">

      {/* Header */}
      <header className="role-header">
        <div className="role-brand">
          <div className="brand-icon">T</div>
          <div>
            <h1>Timely<span>.</span></h1>
            <p>COLLEGE PLANNER</p>
          </div>
        </div>

        <span className="header-status">
          <span className="status-dot"></span>
          Smart Academic Portal
        </span>
      </header>

      {/* Main content */}
      <main className="role-main">

        <div className="role-heading">
          <span className="role-eyebrow">WELCOME TO TIMELY</span>

          <h2>
            Your college schedule,
            <br />
            <span>simplified.</span>
          </h2>

          <p>
            One platform for students, teachers and administrators.
            Select your account type to continue.
          </p>
        </div>

        {/* Role cards */}
        <div className="role-grid">

          {roles.map((role) => (
            <Link
              to={role.path}
              className={`role-card ${role.className}`}
              key={role.title}
            >

              <div className="role-card-top">
                <div className="role-icon">
                  {role.icon}
                </div>

                <span className="role-arrow">↗</span>
              </div>

              <div className="role-card-content">
                <span className="role-label">PORTAL ACCESS</span>

                <h3>{role.title}</h3>

                <p>{role.description}</p>
              </div>

              <div className="role-features">
                {role.features.map((feature) => (
                  <div className="role-feature" key={feature}>
                    <span className="feature-check">✓</span>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="role-continue">
                Continue to Login
                <span>→</span>
              </div>

            </Link>
          ))}

        </div>

        {/* Footer information */}
        <div className="role-bottom">
          <div className="role-security">
            <span>🔒</span>
            Secure access for authorized college users
          </div>

          <p>
            Timely College Planner © 2026
          </p>
        </div>

      </main>
    </div>
  );
}

export default RoleSelection;


import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  let user = null;

  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

  if (!localStorage.getItem("token") || !user) {
    window.location.href = "/login/admin";
    return null;
  }

  if (user.role !== "admin") {
    window.location.href = "/";
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  const managementCards = [
    {
      title: "Timetable Management",
      description: "Create, update and publish college timetables.",
      icon: "📅",
      action: () => navigate("/timetable"),
      button: "Manage Timetable",
    },
    {
      title: "Teacher Management",
      description: "Add, update, search and manage teacher records.",
      icon: "👨‍🏫",
      action: () => navigate("/teachers"),
      button: "Manage Teachers",
    },
    {
      title: "Student Management",
      description: "Manage student profiles and academic details.",
      icon: "🎓",
      action: () => navigate("/admin/students"),
      button: "Manage Students",
    },
    {
      title: "Classroom Management",
      description: "Organize classrooms and room information.",
      icon: "🏫",
      action: () => alert("Classroom Management will be added next."),
      button: "Manage Classrooms",
    },
  ];

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        <button className="admin-logout" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="admin-welcome">
        <h2>College Management Portal</h2>
        <p>
          Manage timetables, teachers, students and academic resources
          from one place.
        </p>
      </section>

      <section className="admin-management">
        <h2>Management Modules</h2>

        <div className="admin-card-grid">
          {managementCards.map((card) => (
            <div className="admin-management-card" key={card.title}>
              <div className="admin-card-icon">{card.icon}</div>
              <h3>{card.title}</h3>
              <p>{card.description}</p>

              <button onClick={card.action}>
                {card.button} →
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default AdminDashboard;

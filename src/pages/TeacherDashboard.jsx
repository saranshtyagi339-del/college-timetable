
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const API_URL = `${API_BASE_URL}/api/classes`;

function TeacherDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const savedUser = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!token || !savedUser || savedUser.role !== "teacher") {
          navigate("/login/teacher");
          return;
        }

        setUser(savedUser);

        const response = await fetch(API_URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message || "Unable to load timetable.");
        }

        setClasses(result.data || []);
      } catch (err) {
        setError(err.message || "Unable to connect to the server.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="teacher-dashboard">
      <header className="teacher-header">
        <div>
          <h1>Teacher Dashboard</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
      </header>

      <section className="teacher-profile">
        <div>
          <span>Department</span>
          <h3>{user.department || "Not assigned"}</h3>
        </div>

        <div>
          <span>Email Address</span>
          <h3>{user.email}</h3>
        </div>

        <div>
          <span>Total Classes</span>
          <h3>{classes.length}</h3>
        </div>
      </section>

      <section className="teacher-schedule">
        <h2>My Teaching Schedule</h2>
        <p className="teacher-subtitle">
          Your officially published teaching timetable.
        </p>

        {loading ? (
          <p className="teacher-status">Loading your schedule...</p>
        ) : error ? (
          <p className="teacher-status teacher-error">{error}</p>
        ) : classes.length === 0 ? (
          <p className="teacher-status">
            No published classes are assigned to you yet.
          </p>
        ) : (
          days.map((day) => {
            const dailyClasses = classes.filter(
              (item) => item.day === day
            );

            return (
              <div className="teacher-day" key={day}>
                <h3>{day}</h3>

                {dailyClasses.length === 0 ? (
                  <p className="teacher-no-class">No classes scheduled.</p>
                ) : (
                  dailyClasses.map((item) => (
                    <article className="teacher-class-card" key={item._id}>
                      <div>
                        <h4>{item.subject}</h4>
                        <p>
                          {item.course} · Semester {item.semester} · Section{" "}
                          {item.section}
                        </p>
                      </div>

                      <div>
                        <strong>
                          {item.startTime} - {item.endTime}
                        </strong>
                        <p>Room: {item.room}</p>
                      </div>

                      <span>{item.type}</span>
                    </article>
                  ))
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default TeacherDashboard;

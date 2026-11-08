
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TeacherDashboard.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const API_URL = `${API_BASE_URL}/api/classes`;

function TeacherDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Demo Teacher",
    department: "Computer Science",
    email: "teacher@timely.demo",
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (savedUser) {
        setUser((previous) => ({ ...previous, ...savedUser }));
      }
    } catch {
      console.log("Using demo teacher profile.");
    }

    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to load timetable.");
      }

      setClasses(Array.isArray(result.data) ? result.data : []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="teacher-dashboard">
      <header className="teacher-header">
        <div>
          <h1>Teacher Dashboard</h1>
          <p>Welcome, {user.name}!</p>
        </div>

        <button onClick={() => navigate("/")}>Home</button>
      </header>

      <section className="teacher-profile">
        <div>
          <span>Department</span>
          <h3>{user.department || "Not assigned"}</h3>
        </div>

        <div>
          <span>Email Address</span>
          <h3>{user.email || "Demo Account"}</h3>
        </div>

        <div>
          <span>Total Classes</span>
          <h3>{classes.length}</h3>
        </div>
      </section>

      <section className="teacher-schedule">
        <h2>Teaching Schedule</h2>

        <p className="teacher-subtitle">
          Published college timetable.
        </p>

        {loading ? (
          <p className="teacher-status">Loading schedule...</p>
        ) : error ? (
          <p className="teacher-status teacher-error">{error}</p>
        ) : classes.length === 0 ? (
          <p className="teacher-status">
            No published classes are available yet.
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
                  <p className="teacher-no-class">
                    No classes scheduled.
                  </p>
                ) : (
                  dailyClasses.map((item) => (
                    <article
                      className="teacher-class-card"
                      key={item._id}
                    >
                      <div>
                        <h4>{item.subject}</h4>
                        <p>
                          {item.course || "Course not assigned"} ·
                          Semester {item.semester || "N/A"} ·
                          Section {item.section || "N/A"}
                        </p>
                      </div>

                      <div>
                        <strong>
                          {item.startTime} - {item.endTime}
                        </strong>
                        <p>Room: {item.room || "Not assigned"}</p>
                      </div>

                      <span>{item.type || "Regular"}</span>
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

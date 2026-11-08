
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const API_URL = `${API_BASE_URL}/api/classes`;

function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Demo Student",
    course: "Computer Science Engineering",
    semester: 5,
    section: "A",
  });

  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Use saved student information when available.
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));

      if (savedUser) {
        setUser((previous) => ({ ...previous, ...savedUser }));
      }
    } catch {
      console.log("Using demo student profile.");
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
    <div className="student-dashboard">
      <header className="student-header">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome, {user.name}!</p>
        </div>

        <button onClick={() => navigate("/")}>Home</button>
      </header>

      <section className="student-profile">
        <div>
          <span>Course</span>
          <h3>{user.course || "Not assigned"}</h3>
        </div>

        <div>
          <span>Semester</span>
          <h3>{user.semester || "Not assigned"}</h3>
        </div>

        <div>
          <span>Section</span>
          <h3>{user.section || "Not assigned"}</h3>
        </div>
      </section>

      <section className="student-timetable">
        <div className="student-section-heading">
          <div>
            <h2>My Weekly Timetable</h2>
            <p>Your published class schedule.</p>
          </div>

          <span>{classes.length} Classes</span>
        </div>

        {loading ? (
          <p className="student-status">Loading timetable...</p>
        ) : error ? (
          <p className="student-status student-error">{error}</p>
        ) : classes.length === 0 ? (
          <p className="student-status">
            No published timetable is available yet.
          </p>
        ) : (
          days.map((day) => {
            const dailyClasses = classes.filter(
              (item) => item.day === day
            );

            return (
              <div className="student-day" key={day}>
                <h3>{day}</h3>

                {dailyClasses.length === 0 ? (
                  <p className="student-no-class">No classes scheduled.</p>
                ) : (
                  <div className="student-class-list">
                    {dailyClasses.map((item) => (
                      <article
                        className="student-class-card"
                        key={item._id}
                      >
                        <div>
                          <h4>{item.subject}</h4>
                          <p>{item.teacher}</p>
                        </div>

                        <div>
                          <span>
                            {item.startTime} - {item.endTime}
                          </span>
                          <p>{item.room}</p>
                        </div>

                        <span className="student-class-type">
                          {item.type}
                        </span>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
}

export default StudentDashboard;

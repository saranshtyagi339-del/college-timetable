
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./StudentDashboard.css";

const API_URL = "http://localhost:5000/api/classes";

function StudentDashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      const token = localStorage.getItem("token");

      if (!token || !savedUser || savedUser.role !== "student") {
        navigate("/login/student");
        return;
      }

      setUser(savedUser);
      fetchTimetable(token);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      navigate("/login/student");
    }
  }, [navigate]);

  const fetchTimetable = async (token) => {
    try {
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
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) return null;

  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="student-dashboard">
      <header className="student-header">
        <div>
          <h1>Student Dashboard</h1>
          <p>Welcome back, {user.name}!</p>
        </div>

        <button onClick={handleLogout}>Logout</button>
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
            <p>Your officially published class schedule.</p>
          </div>

          <span>{classes.length} Classes</span>
        </div>

        {loading ? (
          <p className="student-status">Loading your timetable...</p>
        ) : error ? (
          <p className="student-status student-error">{error}</p>
        ) : classes.length === 0 ? (
          <p className="student-status">
            No published timetable is available for your course, semester
            and section yet.
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
                      <article className="student-class-card" key={item._id}>
                        <div>
                          <h4>{item.subject}</h4>
                          <p>{item.teacher}</p>
                        </div>

                        <div>
                          <span>{item.startTime} - {item.endTime}</span>
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

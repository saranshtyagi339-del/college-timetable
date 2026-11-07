
import { useCallback, useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import StatCard from "../components/StatCard";
import Timetable from "../components/Timetable";
import "./Dashboard.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function Dashboard() {
  const [stats, setStats] = useState({
    totalClasses: 0,
    totalSubjects: 0,
    totalTeachers: 0,
    totalClassrooms: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refreshStats = useCallback(async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/classes/stats`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to load statistics");
      }

      setStats(result.data);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshStats();
  }, [refreshStats]);

  return (
    <AppLayout>
      <section className="welcome-section">
        <div>
          <p className="welcome-label">OVERVIEW</p>
          <h2>Good morning, Student 👋</h2>
          <p>Here's what's happening with your schedule today.</p>
        </div>
      </section>

      {error && <p className="error-message">{error}</p>}

      <section className="stats-grid">
        <StatCard
          title="Total Classes"
          value={loading ? "..." : stats.totalClasses}
          description="In your timetable"
          icon="📚"
        />

        <StatCard
          title="Subjects"
          value={loading ? "..." : stats.totalSubjects}
          description="Unique subjects"
          icon="📖"
        />

        <StatCard
          title="Teachers"
          value={loading ? "..." : stats.totalTeachers}
          description="Faculty members"
          icon="👨‍🏫"
        />

        <StatCard
          title="Classrooms"
          value={loading ? "..." : stats.totalClassrooms}
          description="Unique rooms"
          icon="🏫"
        />
      </section>

      <Timetable onDataChange={refreshStats} />
    </AppLayout>
  );
}

export default Dashboard;

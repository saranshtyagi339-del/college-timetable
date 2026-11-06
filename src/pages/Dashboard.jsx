
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import Timetable from "../components/Timetable";

import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="app-layout">

      {/* Sidebar Navigation */}
      <Sidebar />

      {/* Main Dashboard Section */}
      <div className="main-section">

        {/* Top Navbar */}
        <Navbar />

        <main className="dashboard">

          {/* Welcome Section */}
          <section className="welcome-section">
            <div>
              <p className="welcome-label">
                OVERVIEW
              </p>

              <h2>
                Good morning, Student 👋
              </h2>

              <p>
                Here's what's happening with your schedule today.
              </p>
            </div>
          </section>

          {/* Statistics Cards */}
          <section className="stats-grid">

            <StatCard
              title="Total Classes"
              value="24"
              description="This week"
              icon="📚"
            />

            <StatCard
              title="Subjects"
              value="8"
              description="This semester"
              icon="📖"
            />

            <StatCard
              title="Teachers"
              value="12"
              description="Faculty members"
              icon="👨‍🏫"
            />

            <StatCard
              title="Classrooms"
              value="10"
              description="Available rooms"
              icon="🏫"
            />

          </section>

          {/* Interactive Timetable with CRUD Operations */}
          <Timetable />

        </main>
      </div>
    </div>
  );
}

export default Dashboard;

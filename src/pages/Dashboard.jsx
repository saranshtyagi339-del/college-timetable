import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-section">

        <Navbar />

        <main className="dashboard">

          <section className="welcome-section">
            <div>
              <p className="welcome-label">OVERVIEW</p>
              <h2>Good morning, Student 👋</h2>
              <p>
                Here's what's happening with your schedule today.
              </p>
            </div>

            <button className="add-class-btn">
              + Add Class
            </button>
          </section>

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

          <section className="content-grid">

            <div className="schedule-panel">

              <div className="section-header">
                <div>
                  <h3>Today's Schedule</h3>
                  <p>Monday, September 28</p>
                </div>

                <button>View All</button>
              </div>

              <div className="schedule-item">
                <div className="time">
                  09:00
                  <span>10:00</span>
                </div>

                <div className="class-info">
                  <h4>Data Structures</h4>
                  <p>Dr. Sharma • Room C-204</p>
                </div>

                <span className="class-type">
                  Lecture
                </span>
              </div>

              <div className="schedule-item">
                <div className="time">
                  10:00
                  <span>11:00</span>
                </div>

                <div className="class-info">
                  <h4>Operating Systems</h4>
                  <p>Dr. Singh • Room B-102</p>
                </div>

                <span className="class-type">
                  Lecture
                </span>
              </div>

              <div className="schedule-item">
                <div className="time">
                  11:00
                  <span>12:00</span>
                </div>

                <div className="class-info">
                  <h4>Database Management</h4>
                  <p>Dr. Kumar • Room C-301</p>
                </div>

                <span className="class-type">
                  Lecture
                </span>
              </div>

            </div>

            <div className="quick-panel">

              <h3>Quick Actions</h3>

              <button>
                <span>＋</span>
                Add New Class
              </button>

              <button>
                <span>▦</span>
                View Timetable
              </button>

              <button>
                <span>📚</span>
                Manage Subjects
              </button>

            </div>

          </section>

        </main>

      </div>

    </div>
  );
}

export default Dashboard;
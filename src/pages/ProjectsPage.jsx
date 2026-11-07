
import AppLayout from "../components/AppLayout";

function ProjectsPage() {
  return (
    <AppLayout>
      <section className="welcome-section">
        <div>
          <p className="welcome-label">WORKSPACE</p>
          <h2>My Projects</h2>
          <p>Manage your college projects and assignments.</p>
        </div>
      </section>

      <div className="schedule-panel">
        <h3>Projects Management</h3>
        <p>Project management features will be developed here.</p>
      </div>
    </AppLayout>
  );
}

export default ProjectsPage;

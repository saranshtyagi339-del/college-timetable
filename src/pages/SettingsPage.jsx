
import AppLayout from "../components/AppLayout";

function SettingsPage() {
  return (
    <AppLayout>
      <section className="welcome-section">
        <div>
          <p className="welcome-label">PREFERENCES</p>
          <h2>Settings</h2>
          <p>Manage your application preferences.</p>
        </div>
      </section>

      <div className="schedule-panel">
        <h3>Application Settings</h3>
        <p>Profile and application settings will be developed here.</p>
      </div>
    </AppLayout>
  );
}

export default SettingsPage;

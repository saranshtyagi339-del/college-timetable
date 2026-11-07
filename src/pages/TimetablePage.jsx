
import AppLayout from "../components/AppLayout";
import Timetable from "../components/Timetable";

function TimetablePage() {
  return (
    <AppLayout>
      <section className="welcome-section">
        <div>
          <p className="welcome-label">SCHEDULE</p>
          <h2>My Timetable</h2>
          <p>Manage your weekly college class schedule.</p>
        </div>
      </section>

      <Timetable />
    </AppLayout>
  );
}

export default TimetablePage;


import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function AppLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="main-section">
        <Navbar />

        <main className="dashboard">
          {children}
        </main>
      </div>
    </div>
  );
}

export default AppLayout;

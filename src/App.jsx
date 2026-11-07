
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";
import TimetablePage from "./pages/TimetablePage";
import ProjectsPage from "./pages/ProjectsPage";
import TeachersPage from "./pages/TeachersPage";
import SettingsPage from "./pages/SettingsPage";
import Login from "./pages/Login";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentsPage from "./pages/StudentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Welcome and role selection page */}
        <Route path="/" element={<RoleSelection />} />

        {/* Existing application pages */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/login/:role" element={<Login />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentsPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;


import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import RoleSelection from "./pages/RoleSelection";
import Dashboard from "./pages/Dashboard";
import TimetablePage from "./pages/TimetablePage";
import ProjectsPage from "./pages/ProjectsPage";
import TeachersPage from "./pages/TeachersPage";
import SettingsPage from "./pages/SettingsPage";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import StudentsPage from "./pages/StudentsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main welcome page */}
        <Route path="/" element={<RoleSelection />} />

        {/* Main dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Student dashboard - no login */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />

        {/* Teacher dashboard - no login */}
        <Route path="/teacher" element={<TeacherDashboard />} />
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />

        {/* Admin dashboard - no login */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<StudentsPage />} />

        {/* Other application pages */}
        <Route path="/timetable" element={<TimetablePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/settings" element={<SettingsPage />} />

        {/* Redirect unknown pages */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

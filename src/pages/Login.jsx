
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./Login.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

function Login() {
  const { role } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const roleDetails = {
    student: {
      title: "Student Login",
      subtitle: "Access your personal academic dashboard.",
      icon: "🎓",
    },
    teacher: {
      title: "Teacher Login",
      subtitle: "Access your teaching schedule and classes.",
      icon: "👨‍🏫",
    },
    admin: {
      title: "Timetable Admin Login",
      subtitle: "Manage and publish college timetables.",
      icon: "📅",
    },
  };

  const selectedRole = role?.toLowerCase();
  const currentRole = roleDetails[selectedRole];

  if (!currentRole) {
    return (
      <div className="login-page">
        <div className="login-card">
          <h2>Invalid login portal</h2>
          <Link to="/">Back to role selection</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            role: selectedRole,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save authentication details
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSuccess(`Welcome, ${data.user.name}! Login successful.`);
      setPassword("");

      // Redirect according to the authenticated role
      if (data.user.role === "student") {
        navigate("/student/dashboard");
      } else if (data.user.role === "teacher") {
        navigate("/teacher/dashboard");
      } else if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      }
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Link to="/" className="login-back">
        ← Back to role selection
      </Link>

      <div className="login-card">
        <Link to="/" className="login-brand">
          <span className="login-brand-icon">T</span>
          <span>
            Timely<span className="brand-dot">.</span>
          </span>
        </Link>

        <div className="login-icon">{currentRole.icon}</div>

        <h1>{currentRole.title}</h1>
        <p className="login-subtitle">{currentRole.subtitle}</p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>

          <input
            id="email"
            type="email"
            placeholder="Enter your college email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Password</label>

          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          {error && (
            <p style={{ color: "#dc2626", fontSize: "13px" }}>
              {error}
            </p>
          )}

          {success && (
            <p style={{ color: "#16a34a", fontSize: "13px" }}>
              {success}
            </p>
          )}

          <button
            type="submit"
            className="login-button"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
            {!loading && <span>→</span>}
          </button>
        </form>

        <p className="login-footer">
          Secure access to your college portal.
        </p>
      </div>
    </div>
  );
}

export default Login;


import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import "./StudentsPage.css";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const API_URL = `${API_BASE_URL}/api/students`;

function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const emptyForm = {
    name: "",
    email: "",
    password: "",
    course: "",
    semester: "",
    section: "",
  };

  const [form, setForm] = useState(emptyForm);

  const getToken = () => localStorage.getItem("token");

  const fetchStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to fetch students.");
      }

      setStudents(result.data || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const url = editingId
      ? `${API_URL}/${editingId}`
      : API_URL;

    const method = editingId ? "PUT" : "POST";

    const payload = { ...form };

    if (editingId && !payload.password) {
      delete payload.password;
    }

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save student.");
      }

      setSuccess(
        editingId
          ? "Student updated successfully."
          : "Student added successfully."
      );

      setForm(emptyForm);
      setEditingId(null);
      setShowForm(false);
      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (student) => {
    setEditingId(student._id || student.id);

    setForm({
      name: student.name || "",
      email: student.email || "",
      password: "",
      course: student.course || "",
      semester: student.semester || "",
      section: student.section || "",
    });

    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete student.");
      }

      setSuccess("Student deleted successfully.");
      fetchStudents();
    } catch (err) {
      setError(err.message);
    }
  };

  const closeForm = () => {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  };

  const filteredStudents = students.filter((student) => {
    const searchText = search.toLowerCase();

    return (
      student.name?.toLowerCase().includes(searchText) ||
      student.email?.toLowerCase().includes(searchText) ||
      student.course?.toLowerCase().includes(searchText)
    );
  });

  return (
    <AppLayout>
      <div className="students-page">
        <div className="students-heading">
          <div>
            <h1>Student Management</h1>
            <p>Manage student accounts and academic information.</p>
          </div>

          <button
            className="add-student-btn"
            onClick={() => {
              closeForm();
              setShowForm(true);
              setSuccess("");
            }}
          >
            + Add Student
          </button>
        </div>

        <div className="student-summary">
          <div className="student-summary-card">
            <span>Total Students</span>
            <h2>{students.length}</h2>
          </div>

          <div className="student-summary-card">
            <span>Showing Results</span>
            <h2>{filteredStudents.length}</h2>
          </div>
        </div>

        {error && <div className="student-message error">{error}</div>}
        {success && <div className="student-message success">{success}</div>}

        {showForm && (
          <form className="student-form" onSubmit={handleSubmit}>
            <h2>{editingId ? "Edit Student" : "Add New Student"}</h2>

            <div className="student-form-grid">
              <input
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />

              <input
                name="email"
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />

              <input
                name="password"
                type="password"
                placeholder={
                  editingId
                    ? "New Password (leave blank to keep current)"
                    : "Password (minimum 8 characters)"
                }
                value={form.password}
                onChange={handleChange}
                required={!editingId}
                minLength={8}
              />

              <input
                name="course"
                placeholder="Course (e.g. Computer Science)"
                value={form.course}
                onChange={handleChange}
                required
              />

              <input
                name="semester"
                type="number"
                min="1"
                max="12"
                placeholder="Semester"
                value={form.semester}
                onChange={handleChange}
                required
              />

              <input
                name="section"
                placeholder="Section (e.g. A)"
                value={form.section}
                onChange={handleChange}
                required
              />
            </div>

            <div className="student-form-actions">
              <button type="submit" className="add-student-btn">
                {editingId ? "Save Changes" : "Create Student"}
              </button>

              <button
                type="button"
                className="cancel-student-btn"
                onClick={closeForm}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="students-table-card">
          <div className="students-table-heading">
            <h2>All Students</h2>

            <input
              type="search"
              placeholder="Search by name, email or course..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>

          {loading ? (
            <p className="student-empty">Loading students...</p>
          ) : filteredStudents.length === 0 ? (
            <p className="student-empty">No students found.</p>
          ) : (
            <div className="students-table-wrapper">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Email</th>
                    <th>Course</th>
                    <th>Semester</th>
                    <th>Section</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student._id || student.id}>
                      <td>{student.name}</td>
                      <td>{student.email}</td>
                      <td>{student.course || "—"}</td>
                      <td>{student.semester || "—"}</td>
                      <td>{student.section || "—"}</td>
                      <td>
                        <div className="student-actions">
                          <button onClick={() => handleEdit(student)}>
                            Edit
                          </button>

                          <button
                            className="delete-student-btn"
                            onClick={() =>
                              handleDelete(student._id || student.id)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}

export default StudentsPage;

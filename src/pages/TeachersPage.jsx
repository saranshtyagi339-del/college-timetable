
import { useEffect, useState } from "react";
import AppLayout from "../components/AppLayout";
import "./TeachersPage.css";

const API_URL = "http://localhost:5000/api/teachers";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  department: "",
  subject: "",
  designation: "",
};

function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch teachers");
      }

      setTeachers(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Open form for adding a teacher
  const handleAddClick = () => {
    setEditingId(null);
    setFormData(initialForm);
    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Open form for editing a teacher
  const handleEdit = (teacher) => {
    setEditingId(teacher._id);

    setFormData({
      name: teacher.name || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      department: teacher.department || "",
      subject: teacher.subject || "",
      designation: teacher.designation || "",
    });

    setError("");
    setSuccess("");
    setShowForm(true);
  };

  // Add or update a teacher
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);
      setError("");
      setSuccess("");

      const url = editingId
        ? `${API_URL}/${editingId}`
        : API_URL;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
          result.error ||
          "Unable to save teacher"
        );
      }

      setSuccess(
        editingId
          ? "Teacher updated successfully!"
          : "Teacher added successfully!"
      );

      setFormData(initialForm);
      setEditingId(null);
      setShowForm(false);

      await fetchTeachers();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  // Delete a teacher
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccess("");

      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to delete teacher"
        );
      }

      setSuccess("Teacher deleted successfully!");
      await fetchTeachers();
    } catch (err) {
      setError(err.message);
    }
  };

  // Cancel form
  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(initialForm);
    setError("");
  };

  // Search teachers
  const filteredTeachers = teachers.filter((teacher) => {
    const searchText = search.toLowerCase();

    return (
      teacher.name?.toLowerCase().includes(searchText) ||
      teacher.email?.toLowerCase().includes(searchText) ||
      teacher.department?.toLowerCase().includes(searchText) ||
      teacher.subject?.toLowerCase().includes(searchText)
    );
  });

  return (
    <AppLayout>
      <section className="welcome-section">
        <div>
          <p className="welcome-label">FACULTY MANAGEMENT</p>
          <h2>Teachers</h2>
          <p>Manage your college faculty and teacher information.</p>
        </div>
      </section>

      <section className="teacher-page">

        {/* Teacher statistics */}
        <div className="teacher-summary">
          <div className="teacher-summary-card">
            <span>Total Teachers</span>
            <h3>{teachers.length}</h3>
          </div>

          <div className="teacher-summary-card">
            <span>Departments</span>
            <h3>
              {new Set(teachers.map((teacher) => teacher.department)).size}
            </h3>
          </div>

          <div className="teacher-summary-card">
            <span>Subjects</span>
            <h3>
              {new Set(teachers.map((teacher) => teacher.subject)).size}
            </h3>
          </div>
        </div>

        {/* Teacher list header */}
        <div className="teacher-toolbar">
          <div>
            <h3>Faculty Directory</h3>
            <p>View and manage your teaching staff.</p>
          </div>

          <button
            type="button"
            className="teacher-add-btn"
            onClick={handleAddClick}
          >
            + Add Teacher
          </button>
        </div>

        {/* Search */}
        <div className="teacher-search">
          <input
            type="text"
            placeholder="Search by name, email, department or subject..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        {/* Messages */}
        {error && (
          <div className="teacher-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="teacher-success" role="status">
            {success}
          </div>
        )}

        {/* Add/Edit Teacher Form */}
        {showForm && (
          <div className="teacher-form-card">
            <h3>
              {editingId ? "Edit Teacher" : "Add New Teacher"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="teacher-form-grid">

                <div className="teacher-form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter teacher name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="teacher-form-group">
                  <label>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="teacher-form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="teacher-form-group">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    placeholder="e.g. Computer Science"
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="teacher-form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="e.g. Data Structures"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="teacher-form-group">
                  <label>Designation</label>
                  <input
                    type="text"
                    name="designation"
                    placeholder="e.g. Assistant Professor"
                    value={formData.designation}
                    onChange={handleChange}
                    required
                  />
                </div>

              </div>

              <div className="teacher-form-actions">
                <button
                  type="button"
                  className="teacher-cancel-btn"
                  onClick={handleCancel}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="teacher-save-btn"
                  disabled={saving}
                >
                  {saving
                    ? "Saving..."
                    : editingId
                    ? "Update Teacher"
                    : "Save Teacher"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Teacher cards */}
        {loading ? (
          <div className="teacher-empty">
            Loading teachers...
          </div>
        ) : filteredTeachers.length === 0 ? (
          <div className="teacher-empty">
            <h3>No teachers found</h3>
            <p>
              {search
                ? "Try a different search term."
                : "Click Add Teacher to add your first teacher."}
            </p>
          </div>
        ) : (
          <div className="teacher-grid">
            {filteredTeachers.map((teacher) => (
              <div className="teacher-card" key={teacher._id}>

                <div className="teacher-card-top">
                  <div className="teacher-avatar">
                    {teacher.name?.charAt(0).toUpperCase()}
                  </div>

                  <div className="teacher-card-heading">
                    <h3>{teacher.name}</h3>
                    <span>{teacher.designation}</span>
                  </div>
                </div>

                <div className="teacher-details">
                  <p>
                    <strong>Email:</strong> {teacher.email}
                  </p>

                  <p>
                    <strong>Phone:</strong> {teacher.phone}
                  </p>

                  <p>
                    <strong>Department:</strong> {teacher.department}
                  </p>

                  <p>
                    <strong>Subject:</strong> {teacher.subject}
                  </p>
                </div>

                <div className="teacher-card-actions">
                  <button
                    type="button"
                    className="teacher-edit-btn"
                    onClick={() => handleEdit(teacher)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="teacher-delete-btn"
                    onClick={() => handleDelete(teacher._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </section>
    </AppLayout>
  );
}

export default TeachersPage;

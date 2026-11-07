
import { useEffect, useState } from "react";
import DaySelector from "./DaySelector";
import ClassCard from "./ClassCard";
import "./Timetable.css";

// Use Render URL in production and localhost during local development
const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
).replace(/\/$/, "");

const API_URL = `${API_BASE_URL}/api/classes`;

function Timetable({ onDataChange }) {
  const [classes, setClasses] = useState([]);
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const emptyForm = {
    subject: "",
    teacher: "",
    room: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    type: "Lecture",
    course: "Computer Science",
    semester: "5",
    section: "A",
    status: "draft",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Common authorization headers
  const getAuthHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  // Fetch classes from MongoDB
  async function fetchClasses() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to fetch classes.");
      }

      setClasses(result.data || []);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClasses();
  }, []);

  // Filter classes by selected day and search
  const filteredClasses = classes.filter((classItem) => {
    const search = searchTerm.toLowerCase();

    return (
      classItem.day === selectedDay &&
      (
        classItem.subject?.toLowerCase().includes(search) ||
        classItem.teacher?.toLowerCase().includes(search) ||
        classItem.room?.toLowerCase().includes(search) ||
        classItem.course?.toLowerCase().includes(search)
      )
    );
  });

  // Handle input changes
  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Open Add Class form
  function handleAddClick() {
    setEditingClass(null);

    setFormData({
      ...emptyForm,
      day: selectedDay,
    });

    setShowForm(true);
    setError("");
    setSuccessMessage("");
  }

  // Open Edit Class form
  function handleEditClick(classItem) {
    setEditingClass(classItem);

    setFormData({
      subject: classItem.subject || "",
      teacher: classItem.teacher || "",
      room: classItem.room || "",
      day: classItem.day || "Monday",
      startTime: classItem.startTime || "",
      endTime: classItem.endTime || "",
      type: classItem.type || "Lecture",
      course: classItem.course || "Computer Science",
      semester: String(classItem.semester || 5),
      section: classItem.section || "A",
      status: classItem.status || "draft",
    });

    setShowForm(true);
    setError("");
    setSuccessMessage("");
  }

  // Add or update class
  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setError("");
      setSuccessMessage("");

      const isEditing = Boolean(editingClass);

      const url = isEditing
        ? `${API_URL}/${editingClass._id}`
        : API_URL;

      const method = isEditing ? "PUT" : "POST";

      const payload = {
        ...formData,
        semester: Number(formData.semester),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to save class.");
      }

      const savedClass = result.data;

      setClasses((previousClasses) => {
        if (isEditing) {
          return previousClasses.map((item) =>
            item._id === savedClass._id ? savedClass : item
          );
        }

        return [...previousClasses, savedClass];
      });

      setSelectedDay(savedClass.day);
      setSearchTerm("");
      setShowForm(false);
      setEditingClass(null);
      setFormData(emptyForm);

      setSuccessMessage(
        isEditing
          ? "Class updated successfully!"
          : "New class added successfully!"
      );

      if (onDataChange) {
        await onDataChange();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  // Delete class
  async function handleDelete(classId) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this class?"
    );

    if (!confirmed) return;

    try {
      setError("");
      setSuccessMessage("");

      const response = await fetch(`${API_URL}/${classId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to delete class.");
      }

      setClasses((previousClasses) =>
        previousClasses.filter((item) => item._id !== classId)
      );

      setSuccessMessage("Class deleted successfully!");

      if (onDataChange) {
        await onDataChange();
      }
    } catch (error) {
      setError(error.message);
    }
  }

  // Cancel form
  function handleCancel() {
    setShowForm(false);
    setEditingClass(null);
    setFormData(emptyForm);
    setError("");
  }

  return (
    <section className="timetable-section">
      <div className="timetable-header">
        <div>
          <h2>Weekly Timetable</h2>
          <p>View and manage your daily class schedule</p>
        </div>

        <button
          className="add-timetable-btn"
          onClick={handleAddClick}
          type="button"
        >
          + Add Class
        </button>
      </div>

      <DaySelector
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />

      <div className="timetable-toolbar">
        <h3>{selectedDay}'s Classes</h3>

        <input
          type="text"
          placeholder="Search subject, teacher or room..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>

      <p className="class-count">
        Showing {filteredClasses.length} classes
      </p>

      {successMessage && (
        <div className="success-message" role="status">
          <span>✓</span>
          {successMessage}
        </div>
      )}

      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}

      {showForm && (
        <div className="class-form-container">
          <h3>{editingClass ? "Edit Class" : "Add New Class"}</h3>

          <form onSubmit={handleSubmit} className="class-form">
            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                placeholder="Enter subject name"
                required
              />
            </div>

            <div className="form-group">
              <label>Teacher Name</label>
              <input
                type="text"
                name="teacher"
                value={formData.teacher}
                onChange={handleInputChange}
                placeholder="Enter teacher name"
                required
              />
            </div>

            <div className="form-group">
              <label>Room</label>
              <input
                type="text"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                placeholder="Example: C-204"
                required
              />
            </div>

            <div className="form-group">
              <label>Course</label>
              <input
                type="text"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                placeholder="Example: Computer Science"
                required
              />
            </div>

            <div className="form-group">
              <label>Semester</label>
              <input
                type="number"
                name="semester"
                value={formData.semester}
                onChange={handleInputChange}
                min="1"
                max="12"
                required
              />
            </div>

            <div className="form-group">
              <label>Section</label>
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleInputChange}
                placeholder="Example: A"
                required
              />
            </div>

            <div className="form-group">
              <label>Day</label>
              <select
                name="day"
                value={formData.day}
                onChange={handleInputChange}
              >
                {[
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                ].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Start Time</label>
              <input
                type="text"
                name="startTime"
                value={formData.startTime}
                onChange={handleInputChange}
                placeholder="09:00 AM"
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="text"
                name="endTime"
                value={formData.endTime}
                onChange={handleInputChange}
                placeholder="10:00 AM"
                required
              />
            </div>

            <div className="form-group">
              <label>Class Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
              >
                <option value="Lecture">Lecture</option>
                <option value="Practical">Practical</option>
              </select>
            </div>

            <div className="form-group">
              <label>Publication Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
              >
                <option value="draft">Save as Draft</option>
                <option value="published">Publish Timetable</option>
              </select>
            </div>

            <div className="form-buttons">
              <button type="submit" className="save-btn">
                {editingClass ? "Update Class" : "Save Class"}
              </button>

              <button
                type="button"
                className="cancel-btn"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading classes from database...</p>
      ) : filteredClasses.length > 0 ? (
        <div className="class-list">
          {filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem._id}
              classItem={classItem}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No classes found</h3>
          <p>Try another search or add a new class.</p>
        </div>
      )}
    </section>
  );
}

export default Timetable;

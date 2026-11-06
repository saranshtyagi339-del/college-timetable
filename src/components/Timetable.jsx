
import { useState } from "react";

import timetableData from "../data/timetableData";
import DaySelector from "./DaySelector";
import ClassCard from "./ClassCard";

import "./Timetable.css";

function Timetable() {

  // Store all timetable classes in React state
  const [classesByDay, setClassesByDay] = useState(() => {
    return Object.fromEntries(
      Object.entries(timetableData).map(([day, classes]) => [
        day,
        [...classes],
      ])
    );
  });

  // Store the currently selected day
  const [selectedDay, setSelectedDay] = useState("Monday");

  // Store search text
  const [searchTerm, setSearchTerm] = useState("");

  // Control whether the class form is visible
  const [showForm, setShowForm] = useState(false);

  // Store the class being edited, if any
  const [editingClass, setEditingClass] = useState(null);

  // Form data
  const emptyForm = {
    subject: "",
    teacher: "",
    room: "",
    day: "Monday",
    startTime: "",
    endTime: "",
    type: "Lecture",
  };

  const [formData, setFormData] = useState(emptyForm);

  // Get classes for the selected day
  const classes = classesByDay[selectedDay] || [];

  // Filter classes using the search field
  const filteredClasses = classes.filter((classItem) => {
    const search = searchTerm.toLowerCase();

    return (
      classItem.subject.toLowerCase().includes(search) ||
      classItem.teacher.toLowerCase().includes(search) ||
      classItem.room.toLowerCase().includes(search)
    );
  });

  // Update form fields
  function handleInputChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  // Open an empty form to add a class
  function handleAddClick() {
    setEditingClass(null);

    setFormData({
      ...emptyForm,
      day: selectedDay,
    });

    setShowForm(true);
  }

  // Open the form with existing class details
  function handleEditClick(classItem) {
    setEditingClass({
      id: classItem.id,
      originalDay: selectedDay,
    });

    setFormData({
      subject: classItem.subject,
      teacher: classItem.teacher,
      room: classItem.room,
      day: selectedDay,
      startTime: classItem.startTime,
      endTime: classItem.endTime,
      type: classItem.type,
    });

    setShowForm(true);
  }

  // Add a new class or update an existing class
  function handleSubmit(event) {
    event.preventDefault();

    const newClass = {
      id: editingClass ? editingClass.id : Date.now(),
      subject: formData.subject.trim(),
      teacher: formData.teacher.trim(),
      room: formData.room.trim(),
      startTime: formData.startTime.trim(),
      endTime: formData.endTime.trim(),
      type: formData.type,
    };

    setClassesByDay((previousClasses) => {
      const updatedClasses = { ...previousClasses };

      // If editing, remove the old version first
      if (editingClass) {
        updatedClasses[editingClass.originalDay] =
          updatedClasses[editingClass.originalDay].filter(
            (item) => item.id !== editingClass.id
          );
      }

      // Add the new or updated class to its chosen day
      updatedClasses[formData.day] = [
        ...(updatedClasses[formData.day] || []),
        newClass,
      ];

      return updatedClasses;
    });

    // Show the day where the class was saved
    setSelectedDay(formData.day);

    // Close and reset the form
    setShowForm(false);
    setEditingClass(null);
    setFormData(emptyForm);
    setSearchTerm("");
  }

  // Delete a class
  function handleDelete(classId) {
    setClassesByDay((previousClasses) => ({
      ...previousClasses,
      [selectedDay]: previousClasses[selectedDay].filter(
        (item) => item.id !== classId
      ),
    }));
  }

  // Close the form without saving
  function handleCancel() {
    setShowForm(false);
    setEditingClass(null);
    setFormData(emptyForm);
  }

  return (
    <section className="timetable-section">

      {/* Timetable heading */}
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

      {/* Day selector */}
      <DaySelector
        selectedDay={selectedDay}
        onDayChange={setSelectedDay}
      />

      {/* Search and class count */}
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
        Showing {filteredClasses.length} of {classes.length} classes
      </p>

      {/* Add/Edit class form */}
      {showForm && (
        <div className="class-form-container">
          <h3>
            {editingClass ? "Edit Class" : "Add New Class"}
          </h3>

          <form onSubmit={handleSubmit} className="class-form">

            <div className="form-group">
              <label>Subject Name</label>
              <input
                type="text"
                name="subject"
                placeholder="Enter subject name"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Teacher Name</label>
              <input
                type="text"
                name="teacher"
                placeholder="Enter teacher name"
                value={formData.teacher}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Room</label>
              <input
                type="text"
                name="room"
                placeholder="Example: C-204"
                value={formData.room}
                onChange={handleInputChange}
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
                {Object.keys(classesByDay).map((day) => (
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
                placeholder="Example: 09:00 AM"
                value={formData.startTime}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>End Time</label>
              <input
                type="text"
                name="endTime"
                placeholder="Example: 10:00 AM"
                value={formData.endTime}
                onChange={handleInputChange}
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

      {/* Display class cards */}
      <div className="class-list">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
              onEdit={handleEditClick}
              onDelete={handleDelete}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No classes found</h3>
            <p>
              Try another search or add a new class.
            </p>
          </div>
        )}
      </div>

    </section>
  );
}

export default Timetable;

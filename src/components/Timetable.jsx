import { useState } from "react";
import timetableData from "../data/timetableData";
import DaySelector from "./DaySelector";
import ClassCard from "./ClassCard";
import "./Timetable.css";

function Timetable() {
  const [selectedDay, setSelectedDay] = useState("Monday");
  const [searchTerm, setSearchTerm] = useState("");

  const classes = timetableData[selectedDay];

  const filteredClasses = classes.filter((classItem) => {
    const search = searchTerm.toLowerCase();

    return (
      classItem.subject.toLowerCase().includes(search) ||
      classItem.teacher.toLowerCase().includes(search) ||
      classItem.room.toLowerCase().includes(search)
    );
  });

  return (
    <section className="timetable-section">
      <div className="timetable-header">
        <div>
          <h2>Weekly Timetable</h2>
          <p>View and manage your daily class schedule</p>
        </div>

        <div className="timetable-count">
          {filteredClasses.length} Classes
        </div>
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

      <div className="class-list">
        {filteredClasses.length > 0 ? (
          filteredClasses.map((classItem) => (
            <ClassCard
              key={classItem.id}
              classItem={classItem}
            />
          ))
        ) : (
          <div className="empty-state">
            <h3>No classes found</h3>
            <p>Try another search or select a different day.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Timetable;
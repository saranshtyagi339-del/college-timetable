import "./ClassCard.css";

function ClassCard({ classItem }) {
  return (
    <div className="class-card">
      <div className="class-time">
        <strong>{classItem.startTime}</strong>
        <span>{classItem.endTime}</span>
      </div>

      <div className="class-details">
        <h3>{classItem.subject}</h3>
        <p>{classItem.teacher}</p>
        <span className="room-name">Room: {classItem.room}</span>
      </div>

      <span
        className={`class-badge ${
          classItem.type === "Practical" ? "practical" : ""
        }`}
      >
        {classItem.type}
      </span>
    </div>
  );
}

export default ClassCard;
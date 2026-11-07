
import "./ClassCard.css";

function ClassCard({ classItem, onEdit, onDelete }) {
  return (
    <div className="class-card">

      <div className="class-time">
        <strong>{classItem.startTime}</strong>
        <span>{classItem.endTime}</span>
      </div>

      <div className="class-details">
        <h3>{classItem.subject}</h3>
        <p>{classItem.teacher}</p>
        <span className="room-name">
          Room: {classItem.room}
        </span>
      </div>

      <span
        className={`class-badge ${
          classItem.type === "Practical" ? "practical" : ""
        }`}
      >
        {classItem.type}
      </span>

      <div className="class-actions">
        <button
          type="button"
          className="edit-btn"
          onClick={() => onEdit(classItem)}
        >
          Edit
        </button>

        <button
          type="button"
          className="delete-btn"
          onClick={() => onDelete(classItem._id)}
        >
          Delete
        </button>
      </div>

    </div>
  );
}

export default ClassCard;

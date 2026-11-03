import "./DaySelector.css";
function DaySelector({ selectedDay, onDayChange }) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  return (
    <div className="day-selector">
      {days.map((day) => (
        <button
          key={day}
          type="button"
          className={`day-button ${
            selectedDay === day ? "selected" : ""
          }`}
          onClick={() => onDayChange(day)}
        >
          {day}
        </button>
      ))}
    </div>
  );
}

export default DaySelector;
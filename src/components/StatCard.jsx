
import "./StatCard.css";

function StatCard({ title, value, description, icon }) {
  return (
    <div className="stat-card">
      <div className="stat-card-icon">
        <span>{icon}</span>
      </div>

      <div className="stat-card-content">
        <p className="stat-card-title">{title}</p>
        <h2 className="stat-card-value">{value}</h2>
        <p className="stat-card-description">{description}</p>
      </div>
    </div>
  );
}

export default StatCard;

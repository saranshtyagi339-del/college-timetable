import "./StatCard.css";

function StatCard({ title, value, description, icon }) {
  return (
    <div className="stat-card">

      <div className="stat-top">
        <div className="stat-icon">
          {icon}
        </div>
      </div>

      <div className="stat-content">
        <p>{title}</p>
        <h2>{value}</h2>
        <span>{description}</span>
      </div>

    </div>
  );
}

export default StatCard;
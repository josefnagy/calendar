import React from "react";

const StatsCard = ({ title, stats }) => {
  const renderStats = stats.map((stat) => {
    return (
      <div className="stat" key={stat.label}>
        <span className="stat-name">{stat.label}</span>
        <span className="stat-value">{stat.value}</span>
      </div>
    );
  });

  return (
    <div className="stats__card">
      <h2 className="stat-card__title">{title}</h2>
      {renderStats}
    </div>
  );
};

export default StatsCard;

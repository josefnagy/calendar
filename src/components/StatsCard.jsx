import React from "react";

const StatsCard = ({ title, stats }) => {
  const renderStats = stats.map((stat) => {
    console.log(stat.value === "0 hodin");
    if (stat.value === "0 hodin" || stat.value === "0 Kč") {
      return "";
    } else {
      return (
        <div className="stat" key={stat.label}>
          <span className="stat-name">{stat.label}</span>
          <span className="stat-value">{stat.value}</span>
        </div>
      );
    }
  });

  return (
    <div className="stats__card">
      <h2 className="stat-card__title">{title}</h2>
      {renderStats}
    </div>
  );
};

export default StatsCard;

import React from "react";
import { useSelector } from "react-redux";

const Stats = () => {
  const calendar = useSelector((state) => state.date.calendar);

  const countDays = (stored, current) => {
    if (current.dayInWeek < 5) return stored + 1;
    else return stored;
  };

  const workingDays = calendar.reduce(countDays, 0);
  const workingHoursPerDay = 7.5;
  const workingHoursForMonth = workingDays * workingHoursPerDay;

  return (
    <div className="stats">
      <div className="stats__card">
        <h2 className="stat-card__title">Směny</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
      </div>
      <div className="stats__card">
        <h2 className="stat-card__title">Příplatky</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
      </div>
      <div className="stats__card">
        <h2 className="stat-card__title">Mzda</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
      </div>
      <div className="stats__card">
        <h2 className="stat-card__title">Ostatní</h2>
        <div className="stat">
          <span className="stat-name">norma:</span>
          <span className="stat-value">{workingHoursForMonth}</span>
        </div>
      </div>
    </div>
  );
};

export default Stats;

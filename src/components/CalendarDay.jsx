import React from "react";
import { Link } from "react-router-dom";

const CalendarDay = ({ day, events }) => {
  const renderEvents = events.map((event) => {
    return <li key={event.type}>{event.label}</li>;
  });

  const dayId = `${day.year}-${day.month}-${day.day}`;

  return (
    <Link to={`/day/${dayId}`}>
      <div
        className={`
        calendar__day
        ${day.when}
        ${day.holiday !== "" ? "holiday" : ""}
        ${day.today ? "today" : ""}
      `}
      >
        <div className="notices"></div>
        <div className="events">
          <ul>{renderEvents}</ul>
        </div>
        <div className="day">{day.day}</div>
      </div>
    </Link>
  );
};

export default CalendarDay;

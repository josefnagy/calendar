import React from "react";

const CalendarDay = ({ day }) => {
  const renderEvents = day.events.map((event) => {
    return <li key={event.type}>{event.label}</li>;
  });

  return (
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
  );
};

export default CalendarDay;

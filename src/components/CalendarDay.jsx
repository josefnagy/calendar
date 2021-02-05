import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setSelectedDay } from "../actions";

const CalendarDay = ({ day, events, setSelectedDay }) => {
  const renderEvents = events.map((event) => {
    return <li key={event.type}>{event.label}</li>;
  });

  const dayId = `${day.year}-${day.month}-${day.day}`;

  return (
    <Link to={`/day/${dayId}`} onClick={() => setSelectedDay(day.day)}>
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

export default connect(null, { setSelectedDay })(CalendarDay);

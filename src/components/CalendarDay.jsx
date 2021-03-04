import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setSelectedDay } from "../actions";
import { URL } from "../js/config";

const CalendarDay = ({ day, events, setSelectedDay }) => {
  const renderEvents = events.map((event) => {
    return <li key={event.key}>{event.label}</li>;
  });

  const dayId = `${day.year}-${day.month}-${day.day}`;
  const dayIdArr = [day.year, day.month, day.day];

  // console.log(day);

  return (
    <Link to={`${URL}/day/${dayId}`} onClick={() => setSelectedDay(dayIdArr)}>
      <div
        className={`
        calendar__day
        ${day.when}
        ${day.holiday !== "" ? "holiday" : ""}
        ${day.today ? "today" : ""}
      `}
      >
        <div className="notices">{day.holiday ? day.holiday : ""}</div>
        <div className="events">
          <ul>{renderEvents}</ul>
        </div>
        <div className="day">{day.day}</div>
      </div>
    </Link>
  );
};

export default connect(null, { setSelectedDay })(CalendarDay);

import React from "react";

const CalendarDay = ({ day }) => {
  return (
    <div
      className={`
        calendar__day
        ${day.when}
        ${day.holiday !== "" ? "holiday" : ""}
        ${day.event !== "" ? day.event.type : ""}
      `}
    >
      {day.day}
    </div>
  );
};

export default CalendarDay;

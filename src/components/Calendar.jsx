import React from "react";
import CalendarDay from "./CalendarDay.jsx";

import createCalendar from "../js/cal";

const Calendar = ({ year, month, today }) => {
  const calendar = createCalendar(year, month);

  const renderCal = calendar.map((day, index) => {
    if (
      day.year === today[0] &&
      day.month === today[1] &&
      day.day === today[2]
    ) {
      day.today = true;
    }
    return <CalendarDay key={index} day={day} />;
  });

  return <div className="calendar">{renderCal}</div>;
};

export default Calendar;

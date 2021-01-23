import React from "react";
import CalendarDay from "./CalendarDay.jsx";

import createCalendar from "../js/cal";

const Calendar = ({ year, month }) => {
  const calendar = createCalendar(year, month);

  const renderCal = calendar.map((day, index) => {
    return <CalendarDay key={index} day={day} />;
  });

  return <div className="calendar">{renderCal}</div>;
};

export default Calendar;

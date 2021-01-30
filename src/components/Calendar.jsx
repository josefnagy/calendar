import React, { useEffect } from "react";
import { connect } from "react-redux";
import CalendarDay from "./CalendarDay.jsx";
import { setDate } from "../actions";

import createCalendar from "../js/cal";

const Calendar = ({ date, setDate }) => {
  useEffect(() => {
    setDate({ calYear: date.currentYear, calMonth: date.currentMonth });
  }, [setDate]);

  const calendar = createCalendar(date.calYear, date.calMonth);

  const renderCal = calendar.map((day, index) => {
    if (
      day.year === date.currentYear &&
      day.month === date.currentMonth &&
      day.day === date.currentDay
    ) {
      day.today = true;
    }
    return <CalendarDay key={index} day={day} />;
  });

  return <div className="calendar">{renderCal}</div>;
};

const mapStateToProps = (state) => {
  return { date: state.date };
};

export default connect(mapStateToProps, { setDate })(Calendar);

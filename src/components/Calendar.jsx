import React from "react";
import { connect } from "react-redux";
import CalendarDay from "./CalendarDay.jsx";

const Calendar = ({ date }) => {
  const renderCal = date.calendar.map((day, index) => {
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

export default connect(mapStateToProps)(Calendar);

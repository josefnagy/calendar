import React, { useEffect } from "react";
import { connect } from "react-redux";

import CalendarDay from "./CalendarDay.jsx";
import { fetchEvents, setDate, showMonth } from "../actions";

const Calendar = ({ date, fetchEvents, events, match, showMonth }) => {
  const year = match.params.year ? match.params.year : date.currentYear;
  const month = match.params.month ? match.params.month : date.currentMonth;

  useEffect(() => {
    showMonth(year, month);
    console.log(match);

    // fetch events if there arent in localStorage
    if (events.length === 0) {
      // fetchEvents(date.calYear, date.calMonth);
    }
  }, [fetchEvents, showMonth, year, month]);

  const renderCal = date.calendar.map((day, index) => {
    if (
      day.year === date.currentYear &&
      day.month === date.currentMonth &&
      day.day === date.currentDay
    ) {
      day.today = true;
    }

    const eventsInDay = events.filter((event) => {
      return (
        day.year === event.year &&
        day.month === event.month &&
        day.day === event.day
      );
    });
    return <CalendarDay key={index} day={day} events={eventsInDay} />;
  });

  return <div className="calendar">{renderCal}</div>;
};

const mapStateToProps = (state) => {
  return {
    date: state.date,
    events: Object.values(state.events.allEvents),
    selectedDay: state.events.selectedDay,
  };
};

export default connect(mapStateToProps, { fetchEvents, setDate, showMonth })(
  Calendar
);

import React, { useEffect } from "react";
import { connect } from "react-redux";

import CalendarDay from "./CalendarDay.jsx";
import { fetchEvents } from "../actions";

const Calendar = ({ date, fetchEvents, events, selectedDay }) => {
  useEffect(() => {
    if (events.length === 0 || "month" in selectedDay) {
      fetchEvents(date.calYear, date.calMonth);
    }
  }, [fetchEvents, events]);

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
  if (state.events.allEvents.length === 0) {
    return {
      date: state.date,
      events: [],
      selectedDay: state.events.selectedDay,
    };
  } else {
    return {
      date: state.date,
      events: state.events.allEvents,
      selectedDay: state.events.selectedDay,
    };
  }
};

export default connect(mapStateToProps, { fetchEvents })(Calendar);

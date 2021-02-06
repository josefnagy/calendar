import React, { useEffect } from "react";
import { connect } from "react-redux";

import CalendarDay from "./CalendarDay.jsx";
import { fetchEvents } from "../actions";

const Calendar = ({ date, fetchEvents, events }) => {
  // tady diky tomu se to nejak zacykli. vyresit to linkama a ne ze se budou next a prev butonama vypalovat akce, to je hovadina

  useEffect(() => {
    fetchEvents(date.calYear, date.calMonth);
  }, [fetchEvents]);

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

export default connect(mapStateToProps, { fetchEvents })(Calendar);

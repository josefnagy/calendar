import React, { useEffect } from "react";
import { connect } from "react-redux";

import CalendarDay from "./CalendarDay.jsx";
import {
  fetchEvents,
  fetchStats,
  setDate,
  showMonth,
  checkIfInSync,
  fetchEventsForMonth,
} from "../actions";
import { nextMonthDate, prevMonthDate } from "../js/cal";

const Calendar = ({
  date,
  fetchEvents,
  fetchStats,
  synced,
  events,
  match,
  showMonth,
  userId,
  setDate,
  fetchedMonths,
  checkIfInSync,
  localUpdatedAt,
  fetchEventsForMonth,
}) => {
  const year = match.params.year ? match.params.year : date.currentYear;
  const month = match.params.month ? match.params.month : date.currentMonth;

  useEffect(() => {
    console.log("3");
    setDate();
  }, [setDate]);

  useEffect(() => {
    //look at params month, and check if there was events fetched for surrounding months

    if (match.params.year && match.params.month) {
      const [prevYear, prevMonth] = prevMonthDate(year, month);
      const prevMonthDateId = `${prevYear}-${prevMonth}`;

      const [nextYear, nextMonth] = nextMonthDate(year, month);
      const nextMonthDateId = `${nextYear}-${nextMonth}`;

      const prevFetched = fetchedMonths.indexOf(prevMonthDateId);
      const nextFetched = fetchedMonths.indexOf(nextMonthDateId);

      if (prevFetched === -1 && userId) {
        fetchEventsForMonth(prevYear, prevMonth, userId);
      }
      if (nextFetched === -1 && userId) {
        fetchEventsForMonth(nextYear, nextMonth, userId);
      }
    }
    showMonth(year, month);

    // check if is someone signedIn
    if (userId) {
      checkIfInSync(localUpdatedAt);
      if (!synced) {
        fetchEvents(date.calYear, date.calMonth, userId);
        fetchStats(userId);
      }
    }
  }, [fetchEvents, showMonth, year, month, userId, synced]);

  const renderCal = date.calendar.map((day, index) => {
    if (
      day.year === date.currentYear &&
      day.month === date.currentMonth &&
      day.day === date.currentDay
    ) {
      day.today = true;
    }

    const id = `${day.year}-${day.month}-${day.day}`;

    const eventsInDay = events.filter((event) => {
      return id === event.id && event.userId === userId;
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
    userId: state.auth.user ? state.auth.user.uid : null,
    isSignedIn: state.auth.isSignedIn,
    fetchedMonths: state.events.fetchedMonths ? state.events.fetchedMonths : [],
    localUpdatedAt: state.events.updatedAt,
    synced: state.events.synced,
  };
};

export default connect(mapStateToProps, {
  fetchEvents,
  fetchStats,
  setDate,
  showMonth,
  checkIfInSync,
  fetchEventsForMonth,
})(Calendar);

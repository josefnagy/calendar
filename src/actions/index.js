import db, { auth } from "../apis/firebase";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import {
  nextMonthDate,
  prevMonthDate,
  whatADay,
  getWorkingDaysInMonth,
} from "../js/cal";

import {
  SET_DATE,
  FETCH_EVENTS,
  FETCH_EVENTS_FOR_MONTH,
  SHOW_A_DAY,
  NEW_EVENT,
  EDIT_EVENT,
  SHOW_EDIT,
  DELETE_EVENT,
  SET_SELECTED_DAY,
  SHOW_MONTH,
  CREATE_USER,
  LOGIN,
  LOGOUT,
  SET_USER,
  CLEAN_ERROR,
  SET_ERROR,
  ADD_STATS,
  DELETE_STATS,
  UPDATE_STATS,
} from "./types";

import history from "../history";

export const createUser = (email, password) => {
  return async (dispatch) => {
    await auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User Created");
        dispatch({ type: CREATE_USER, payload: userCredential });
        history.push("/");
      })
      .catch((error) => {
        console.error("Error creating user: ", error);
        dispatch({ type: CREATE_USER, payload: error });
      });
  };
};

export const setError = (error) => {
  return { type: SET_ERROR, payload: error };
};

export const cleanError = () => {
  return { type: CLEAN_ERROR };
};

export const setUser = (user) => {
  return { type: SET_USER, payload: user };
};

export const login = (email, password) => {
  return async (dispatch) => {
    await auth
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log("User logged IN");
        dispatch({ type: LOGIN, payload: userCredential });
        history.push("/");
      })
      .catch((error) => {
        console.error("Error loggin in user: ", error);
        dispatch({ type: LOGIN, payload: error });
      });
  };
};

export const logout = () => {
  console.log("logout");
  return async (dispatch) => {
    const res = await auth
      .signOut()
      .then(() => {
        console.log("User logged out");
        return { type: LOGOUT };
      })
      .catch((error) => {
        console.error("An Error happended", error);
      });
    dispatch(res);
  };
};

export const setDate = () => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  return {
    type: SET_DATE,
    payload: { date: currentDate, currentDay, currentMonth, currentYear },
  };
};

export const showMonth = (calYear, calMonth) => {
  return { type: SHOW_MONTH, payload: { calYear, calMonth } };
};

export const setSelectedDay = (day) => {
  return { type: SET_SELECTED_DAY, payload: day };
};

export const deleteEvent = (id) => {
  return async (dispatch) => {
    const res = await db
      .collection("events")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document succesfully deleted!");
        return { type: DELETE_EVENT, payload: id };
      })
      .catch((error) => {
        console.error("Error removing event: ", error);
      });
    dispatch(res);
  };
};

export const editEvent = (eventId, updatedValues, id) => {
  return async (dispatch) => {
    const res = await db
      .collection("events")
      .doc(eventId)
      .update(updatedValues)
      .then(() => {
        console.log("Document succesfully updated");
        return { type: EDIT_EVENT, payload: [eventId, updatedValues] };
      })
      .catch((error) => {
        console.log("Error updating document: ", error);
      });
    history.push(`/day/${id}`);
    dispatch(res);
  };
};

export const showEdit = (id) => {
  console.log("--- SHOW EDIT ... FETCHED FROM DB ---");
  return async (dispatch) => {
    const res = await db
      .collection("events")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return doc.data();
        } else {
          console.log("no such document");
          return null;
        }
      })
      .catch((err) => {
        console.log("Error adding event ", err);
      });
    dispatch({ type: SHOW_EDIT, payload: res });
  };
};

export const editStats = (updatedValues) => {
  console.log(updatedValues);
  return { type: UPDATE_STATS };
};

export const deleteStats = (eventId) => {
  return (dispatch, getState) => {
    const wholeState = getState();
    const ev = wholeState.events.allEvents[eventId];
    const event = createEvent(ev);
    const stat = wholeState.stats;
    const stats = { ...stat };

    stats[event.dateId].extras.afternoonShiftBonus -= event.afternoonBonus;
    stats[event.dateId].extras.holidayShiftBonus -= event.holidayBonus;
    stats[event.dateId].extras.nightShiftBonus -= event.nightBonus;
    stats[event.dateId].extras.weekendShiftBonus -= event.weekendBonus;

    switch (event.workingHoursType) {
      case "work":
        stats[event.dateId].shifts.workingEvents--;
        if (
          event.function === "Strojvedoucí" &&
          (event.location === "Uhelná služba" || event.location === "Zárubecký")
        ) {
          stats[event.dateId].shifts.workedHoursIn7 -= Number(
            event.workingHours
          );
        } else {
          stats[event.dateId].shifts.workedHoursIn6 -= Number(
            event.workingHours
          );
        }
        break;

      case "holidayAverage":
        stats[event.dateId].shifts.paymentInHolidayAverage -= Number(
          event.workingHours
        );
        break;

      case "obstacleInWork":
        stats[event.dateId].shifts.obstacleInWork -= Number(event.workingHours);
        break;

      case "sickLeaveAverage":
        stats[event.dateId].shifts.sickLeave -= Number(event.workingHours);
        break;

      case "nv":
        stats[event.dateId].shifts.nv -= Number(event.workingHours);
        break;

      default:
        break;
    }
    dispatch({ type: DELETE_STATS, payload: stats });
  };
};

export const addStats = (ev) => {
  return (dispatch, getState) => {
    const event = createEvent(ev);
    const today = whatADay(event.year, event.month, event.day);

    const stats = getState().stats;
    const newStats = { ...stats };

    if (!(event.dateId in stats)) {
      newStats[event.dateId] = {
        shifts: {
          workingEvents: 0,
          workingDays: getWorkingDaysInMonth(event.year, event.month),
          workingHoursPerDay: 7.5,
          workedHoursIn6: 0,
          workedHoursIn7: 0,
          paymentInHolidayAverage: 0,
          obstacleInWork: 0,
          sickLeave: 0,
          sickLeaveDays: 0,
          nv: 0,
          get workingHoursForMonth() {
            return this.workingDays * this.workingHoursPerDay;
          },
        },
        extras: {
          weekendShiftBonus: 0,
          nightShiftBonus: 0,
          afternoonShiftBonus: 0,
          holidayShiftBonus: 0,
        },
      };
    }

    newStats[event.dateId].extras.afternoonShiftBonus += event.afternoonBonus;
    newStats[event.dateId].extras.nightShiftBonus += event.nightBonus;
    newStats[event.dateId].extras.weekendShiftBonus += event.weekendBonus;
    newStats[event.dateId].extras.holidayShiftBonus += event.holidayBonus;

    switch (event.workingHoursType) {
      case "work":
        newStats[event.dateId].shifts.workingEvents++;
        if (
          event.function === "Strojvedoucí" &&
          (event.location === "Uhelná služba" || event.location === "Zárubecký")
        ) {
          if (today.last && event.type === "nocni")
            newStats[event.dateId].shifts.workedHoursIn7 += 5.5;
          else
            newStats[event.dateId].shifts.workedHoursIn7 += Number(
              event.workingHours
            );
        } else {
          if (today.last && event.type === "nocni")
            newStats[event.dateId].shifts.workedHoursIn6 += 5.5;
          else
            newStats[event.dateId].shifts.workedHoursIn6 += Number(
              event.workingHours
            );
        }
        break;

      case "holidayAverage":
        newStats[event.dateId].shifts.paymentInHolidayAverage += Number(
          event.workingHours
        );
        break;

      case "obstacleInWork":
        newStats[event.dateId].shifts.obstacleInWork += Number(
          event.workingHours
        );
        break;

      case "sickLeaveAverage":
        newStats[event.dateId].shifts.sickLeaveDays += 1;
        newStats[event.dateId].shifts.sickLeave += Number(event.workingHours);
        break;

      case "nv":
        newStats[event.dateId].shifts.nv += Number(event.workingHours);
        break;

      default:
        break;
    }
    dispatch({ type: ADD_STATS, payload: { ...newStats } });
  };
};

export const newEvent = (event) => {
  const id = uuid();
  event.createdAt = Date.now();
  event.key = id;

  const eventWithCalculatedValues = createEvent(event);

  // return { type: NEW_EVENT, payload: eventWithCalculatedValues };

  return async (dispatch) => {
    await db
      .collection("events")
      .doc(id)
      .set(eventWithCalculatedValues)
      .then(() => {
        console.log("Data succesfully written");
        // return { type: NEW_EVENT, payload: formValues };
      })
      .catch((err) => {
        console.log("Error adding event ", err);
      });
    dispatch({ type: NEW_EVENT, payload: eventWithCalculatedValues });
    history.push(`/day/${eventWithCalculatedValues.id}`);
  };
};

export const showADay = (id) => {
  console.log("--- FETCHED EVENTS FOR A SELECTED DAY ---");

  return async (dispatch) => {
    const res = await db
      .collection("events")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        return createEventsArray(querySnapshot);
      });
    // res.unshift(id);
    // z events udelat objekt
    const date = id.split("-");
    const year = date[0];
    const month = date[1];
    const day = date[2];
    const dayInfo = {
      day,
      month,
      year,
      events: res,
    };

    dispatch({ type: SHOW_A_DAY, payload: dayInfo });
  };
};

export const fetchEventsForMonth = (year, month, userId) => {
  const currentMonthDateId = `${year}-${month}`;

  console.log("--- FETCHED EVENTS FOR ONE MONTH ---");

  return async (dispatch) => {
    const res = await db
      .collection("events")
      .where("userId", "==", userId)
      .where("dateId", "==", currentMonthDateId)
      .get()
      .then((querySnapshot) => {
        return createEventsArray(querySnapshot);
      });

    dispatch({
      type: FETCH_EVENTS_FOR_MONTH,
      payload: {
        res,
        fetchedMonth: currentMonthDateId,
      },
    });
  };
};

export const fetchEvents = (year, month, userId) => {
  // get previous month date (becouse you are showing events in calendar from previous and next month)
  // so you must get events from tree months
  const currentMonthDateId = `${year}-${month}`;

  const [prevYear, prevMonth] = prevMonthDate(year, month);
  const prevMonthDateId = `${prevYear}-${prevMonth}`;

  //get next month date
  const [nextYear, nextMonth] = nextMonthDate(year, month);
  const nextMonthDateId = `${nextYear}-${nextMonth}`;

  console.log("--- FETCHED EVENTS ---");

  return async (dispatch) => {
    const res = await db
      .collection("events")
      .where("userId", "==", userId)
      .where("dateId", "in", [
        currentMonthDateId,
        prevMonthDateId,
        nextMonthDateId,
      ])
      .get()
      .then((querySnapshot) => {
        return createEventsArray(querySnapshot);
      });

    dispatch({
      type: FETCH_EVENTS,
      payload: {
        res,
        fetchedMonths: [prevMonthDateId, currentMonthDateId, nextMonthDateId],
      },
    });
  };
};

// helper function
const createEventsArray = (querySnapshot) => {
  const events = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id);
    events.push(doc.data());
  });
  return events;
};

const createEvent = (event) => {
  const { year, month, day, workingHours } = event;
  event.holidayBonus = 0;
  event.weekendBonus = 0;
  event.afternoonBonus = 0;
  event.nightBonus = 0;

  const currDayInfo = whatADay(year, month, day);
  // console.log(currDayInfo);
  const prevDayInfo = whatADay(year, month, day, "prev");
  // console.log(prevDayInfo);
  const nextDayInfo = whatADay(year, month, day, "next");
  // console.log(nextDayInfo);

  switch (event.type) {
    case "ranni":
      if (currDayInfo.holiday) {
        event.holidayBonus = workingHours;
        if (currDayInfo.day < 5) event.weekendBonus = workingHours;
      }
      if (currDayInfo.day > 4) event.weekendBonus = workingHours;
      break;

    case "denni":
      if (currDayInfo.holiday) {
        event.holidayBonus = workingHours;
        if (currDayInfo.day < 5) event.weekendBonus = workingHours;
      }
      if (currDayInfo.day > 4) event.weekendBonus = workingHours;
      event.afternoonBonus = 3.5;
      break;

    case "odpoledni":
      if (currDayInfo.holiday) {
        event.holidayBonus = workingHours;
        if (currDayInfo.day < 5) event.weekendBonus = workingHours;
      }
      if (currDayInfo.day > 4) event.weekendBonus = workingHours;
      event.afternoonBonus = workingHours;
      break;

    case "nocni":
      if (currDayInfo.day === 4) event.weekendBonus += 5.5;
      if (currDayInfo.day === 5) event.weekendBonus = workingHours;
      if (currDayInfo.day === 6) event.weekendBonus += 5.5;

      if (currDayInfo.holiday) event.weekendBonus += 5.5;
      if (nextDayInfo.holiday) event.weekendBonus += 5.5;

      event.weekendBonus = event.weekendBonus > 11 ? 11 : event.weekendBonus;

      if (currDayInfo.holiday) event.holidayBonus += 5.5;
      if (nextDayInfo.holiday) event.holidayBonus += 5.5;

      event.afternoonBonus = 3.5;
      event.nightBonus = 7.5;

      break;

    default:
      break;
  }

  if (currDayInfo.last && event.type === "nocni") {
    if (currDayInfo.day === 4) event.weekendBonus = 0;
    if (currDayInfo.day === 5) event.weekendBonus = 5.5;
    if (currDayInfo.day === 6) event.weekendBonus = 5.5;

    if (currDayInfo.holiday) event.weekendBonus = 5.5;

    if (currDayInfo.holiday) event.holidayBonus = 5.5;
    event.nightBonus = 2;
  }

  return event;
};

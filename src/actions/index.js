import db, { auth } from "../apis/firebase";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import { nextMonthDate, prevMonthDate, whatADay } from "../js/cal";

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
  UPDATE_STATS,
  FETCH_STATS,
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

export const fetchStats = (userId) => {
  console.log(userId);
  return async (dispatch) => {
    await db
      .collection("stats")
      .doc(userId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          dispatch({ type: FETCH_STATS, payload: doc.data() });
        } else {
          console.log("no stats in DB");
        }
      })
      .catch((err) => {
        console.log("error getting stats", err);
      });
  };
};

export const updateStats = (newStats, userId) => {
  return async (dispatch) => {
    await db
      .collection("stats")
      .doc(userId)
      .set(newStats)
      .then(() => {
        console.log("Stats succesfully written");
      })
      .catch((err) => {
        console.log("error adding stats", err);
      });
    dispatch({ type: UPDATE_STATS, payload: { ...newStats } });
  };
};

export const newEvent = (event) => {
  const id = uuid();
  event.createdAt = Date.now();
  event.key = id;

  const eventWithCalculatedValues = createEvent(event);

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

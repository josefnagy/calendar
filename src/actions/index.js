import db, { auth } from "../apis/firebase";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import createCalendar, { nextMonthDate, prevMonthDate } from "../js/cal";

import {
  SET_DATE,
  FETCH_EVENTS,
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

export const newEvent = (formValues) => {
  const id = uuid();
  formValues.createdAt = Date.now();
  formValues.key = id;

  return async (dispatch) => {
    await db
      .collection("events")
      .doc(id)
      .set(formValues)
      .then(() => {
        console.log("Data succesfully written");
        // return { type: NEW_EVENT, payload: formValues };
      })
      .catch((err) => {
        console.log("Error adding event ", err);
      });
    console.log("after");
    dispatch({ type: NEW_EVENT, payload: formValues });
    history.push(`/day/${formValues.id}`);
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

export const fetchEvents = (year, month, userId) => {
  console.log(userId);
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

    dispatch({ type: FETCH_EVENTS, payload: res });
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

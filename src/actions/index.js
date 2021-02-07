import db from "../utils/firebaseConfig";
import _ from "lodash";
import { v4 as uuid } from "uuid";

import {
  SET_CAL_DATE,
  FETCH_EVENTS,
  SHOW_A_DAY,
  NEW_EVENT,
  EDIT_EVENT,
  SHOW_EDIT,
  DELETE_EVENT,
  CLEAR_SELECTED_DAY,
  SET_SELECTED_DAY,
} from "./types";

import { nextMonthDate, prevMonthDate } from "../js/cal";
import history from "../history";

export const setDate = (date) => {
  history.push("/");
  return { type: SET_CAL_DATE, payload: date };
};

// export const clearSelectedDay = () => {
//   return { type: CLEAR_SELECTED_DAY, payload: "qq" };
// };

export const setSelectedDay = (day) => {
  return { type: SET_SELECTED_DAY, payload: day };
  // return { type: "fish" };
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
    const res = await db
      .collection("events")
      .doc(id)
      .set(formValues)
      .then(() => {
        console.log("Data succesfully written");
        return { type: NEW_EVENT, payload: formValues };
      })
      .catch((err) => {
        console.log("Error adding event ", err);
      });
    history.push(`/day/${formValues.id}`);
    dispatch(res);
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

export const fetchEvents = (year, month) => {
  // get previous month date (becouse you are showing events in calendar from previous and next month)
  // so you must get events from tree months
  const currentMonthDateId = `${year}-${month}`;

  const [prevYear, prevMonth] = prevMonthDate(year, month);
  const prevMonthDateId = `${prevYear}-${prevMonth}`;

  //get next month date
  const [nextYear, nextMonth] = nextMonthDate(year, month);
  const nextMonthDateId = `${nextYear}-${nextMonth}`;

  console.log("--- FETCHED EVENTS ---");
  // dbFiller();

  return async (dispatch) => {
    const res = await db
      .collection("events")
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
  // const ids = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id);
    events.push(doc.data());
    // ids.push(doc.id);
  });
  // for (let i = 0; i < events.length; i++) {
  //   events[i].key = ids[i];
  // }
  return events;
};

const dbFiller = () => {
  events.forEach((event) => {
    const evnts = {};
    evnts[event.id] = event;

    db.collection("events")
      .doc()
      .set(event)
      .then(() => {
        console.log("ok");
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  });
};

const events = [
  {
    day: 5,
    month: 1,
    year: 2021,
    type: "ranni",
    label: "Ranní",
    notes: "Vzit si ampuli na moč",
    location: "Uhelná",
  },
  {
    day: 5,
    month: 1,
    year: 2021,
    type: "preventivka",
    label: "Preventivka",
    notes: "Nezapomenout nachcat do ampule",
    location: "Hornická poliklinika",
  },
  {
    day: 5,
    month: 4,
    year: 2021,
    type: "preventivka",
    label: "Preventivka",
    notes: "",
    location: "Hornická poliklinika",
  },
  {
    day: 12,
    month: 1,
    year: 2021,
    type: "denni",
    label: "Denní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 25,
    month: 1,
    year: 2021,
    type: "nocni",
    label: "Nocni",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 23,
    month: 1,
    year: 2021,
    type: "odpoledni",
    label: "Odpoledni",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 16,
    month: 1,
    year: 2021,
    type: "preventivka",
    label: "Preventivka",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 10,
    month: 1,
    year: 2021,
    type: "nemocenska",
    label: "Nemocenska",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 1,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 2,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 3,
    month: 2,
    year: 2021,
    type: "nv",
    label: "Náhradní volno",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 6,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 7,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 8,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 9,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 12,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 13,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 14,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 15,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 18,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 19,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 20,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 21,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 24,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 25,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 26,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
    notes: "",
    location: "Uhelná",
  },
  {
    day: 27,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
    notes: "",
    location: "Uhelná",
  },
];

events.forEach((event) => {
  event.id = `${event.year}-${event.month}-${event.day}`;
  event.dateId = `${event.year}-${event.month}`;
});

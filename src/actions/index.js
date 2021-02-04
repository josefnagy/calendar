import db from "../utils/firebaseConfig";
import _ from "lodash";

import { SET_CAL_DATE, FETCH_EVENTS, SHOW_A_DAY, NEW_EVENT } from "./types";
import { nextMonthDate, prevMonthDate } from "../js/cal";
import history from "../history";

export const setDate = (date) => {
  history.push("/");
  return { type: SET_CAL_DATE, payload: date };
};

export const newEvent = (event) => {
  console.log(event);
  // return async (dispatch) => {
  //   const res = await db
  //     .collection("events")
  //     .doc()
  //     .set(event)
  //     .then((data) => {
  //       // console.log(data);
  //     })
  //     .catch((err) => {
  //       console.log("Error adding event ", err);
  //     });
  // };
};

export const showADay = (id) => {
  return async (dispatch) => {
    const res = await db
      .collection("events")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        return createEventsArray(querySnapshot);
      });
    dispatch({ type: SHOW_A_DAY, payload: res });
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

  //DB FILLER
  // events.forEach((event) => {
  //   const evnts = {};
  //   evnts[event.id] = event;

  //   db.collection("events")
  //     .doc()
  //     .set(event)
  //     .then(() => {
  //       console.log("ok");
  //     })
  //     .catch(function (error) {
  //       console.error("Error adding document: ", error);
  //     });
  // });

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
  const ids = [];
  querySnapshot.forEach((doc) => {
    // console.log(doc.id);
    events.push(doc.data());
    ids.push(doc.id);
  });
  for (let i = 0; i < events.length; i++) {
    events[i].key = ids[i];
  }
  return events;
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

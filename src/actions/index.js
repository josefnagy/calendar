import db from "../utils/firebaseConfig";
import _ from "lodash";

import { SET_CAL_DATE, FETCH_EVENTS, SHOW_A_DAY } from "./types";
import { nextMonthDate, prevMonthDate } from "../js/cal";
import history from "../history";

export const setDate = (date) => {
  history.push("/");
  return { type: SET_CAL_DATE, payload: date };
};

export const showADay = (id) => {
  return async (dispatch) => {
    const res = await db
      .collection("events")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
          // console.log(doc.data());
        });
        return events;
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
        const events = [];
        querySnapshot.forEach((doc) => {
          events.push(doc.data());
        });
        return events;
      });

    dispatch({ type: FETCH_EVENTS, payload: res });
  };
};

const ev = {
  "2021-2-10": [
    {
      day: 10,
      month: 2,
      year: 2021,
      dateId: "2021-2",
      id: "2021-2-10",
      type: "ranni",
      label: "Ranní",
    },
    {
      day: 10,
      month: 2,
      year: 2021,
      dateId: "2021-2",
      id: "2021-2-10",
      type: "preventivka",
      label: "Preventivka",
    },
    {
      day: 10,
      month: 2,
      year: 2021,
      dateId: "2021-2",
      id: "2021-2-10",
      type: "custom",
      label: "Narozky",
    },
  ],
  "2021-2-14": [
    {
      day: 14,
      month: 2,
      year: 2021,
      dateId: "2021-2",
      id: "2021-2-14",
      type: "kalba",
      label: "Kalba jak cip",
    },
  ],
};

const events = [
  {
    day: 5,
    month: 1,
    year: 2021,
    type: "ranni",
    label: "Ranní",
  },
  {
    day: 5,
    month: 1,
    year: 2021,
    type: "preventivka",
    label: "Preventivka",
  },
  {
    day: 5,
    month: 4,
    year: 2021,
    type: "preventivka",
    label: "Preventivka",
  },
  {
    day: 12,
    month: 1,
    year: 2021,
    type: "denni",
    label: "Denní",
  },
  {
    day: 25,
    month: 1,
    year: 2021,
    type: "nocni",
    label: "Nocni",
  },
  {
    day: 23,
    month: 1,
    year: 2021,
    type: "odpoledni",
    label: "Odpoledni",
  },
  {
    day: 16,
    month: 1,
    year: 2021,
    type: "preventivka",
    label: "Preventivka",
  },
  {
    day: 10,
    month: 1,
    year: 2021,
    type: "nemocenska",
    label: "Nemocenska",
  },
  {
    day: 1,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
  },
  {
    day: 2,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
  },
  {
    day: 3,
    month: 2,
    year: 2021,
    type: "nv",
    label: "Náhradní volno",
  },
  {
    day: 6,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
  },
  {
    day: 7,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
  },
  {
    day: 8,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
  },
  {
    day: 9,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
  },
  {
    day: 12,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
  },
  {
    day: 13,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
  },
  {
    day: 14,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
  },
  {
    day: 15,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
  },
  {
    day: 18,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
  },
  {
    day: 19,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
  },
  {
    day: 20,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
  },
  {
    day: 21,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
  },
  {
    day: 24,
    month: 2,
    year: 2021,
    type: "ranni",
    label: "Ranní",
  },
  {
    day: 25,
    month: 2,
    year: 2021,
    type: "denni",
    label: "Denní",
  },
  {
    day: 26,
    month: 2,
    year: 2021,
    type: "odpoledni",
    label: "Odpolední",
  },
  {
    day: 27,
    month: 2,
    year: 2021,
    type: "nocni",
    label: "Noční",
  },
];

events.forEach((event) => {
  event.id = `${event.year}-${event.month}-${event.day}`;
  event.dateId = `${event.year}-${event.month}`;
});

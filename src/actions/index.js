import db from "../utils/firebaseConfig";

import { SET_CAL_DATE, FETCH_EVENTS } from "./types";
import { nextMonthDate, prevMonthDate } from "../js/cal";
import history from "../history";

export const setDate = (date) => {
  history.push("/");
  return { type: SET_CAL_DATE, payload: date };
};

export const fetchEvents = (year, month) => {
  // get previous month date (becouse you are showing events in calendar from previous and next month)
  // so you must get events from tree months
  const [prevYear, prevMonth] = prevMonthDate(year, month);
  //get next month date
  const [nextYear, nextMonth] = nextMonthDate(year, month);

  //DB FILLER
  // events.forEach((event) => {
  //   const evnts = {};
  //   evnts[event.id] = event;

  //   db.collection("events")
  //     .doc(event.id)
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
      .get()
      .then((querySnapshot) => {
        let events = [];
        querySnapshot.forEach((doc) => {
          // console.log(`${doc.id} => ${doc.data()}`);
          // console.log(doc.data());
          events.push(doc.data());
        });
        return events;
      });

    const evnts = Object.values(res).filter((event) => {
      return (
        (event.year === year && event.month === month) ||
        (event.year === prevYear && event.month === prevMonth) ||
        (event.year === nextYear && event.month === nextMonth)
      );
    });
    dispatch({ type: FETCH_EVENTS, payload: evnts });
  };
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
});

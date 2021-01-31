import { SET_CAL_DATE, FETCH_EVENTS } from "./types";
import { nextMonthDate, prevMonthDate } from "../js/cal";

export const setDate = (date) => {
  return { type: SET_CAL_DATE, payload: date };
};

export const fetchEvents = (year, month) => {
  // get previous month date (becouse you are showing events in calendar from previous and next month)
  // so you must get events from tree months
  const [prevYear, prevMonth, daysInPrevMonth] = prevMonthDate(year, month);
  //get next month date
  const [nextYear, nextMonth, daysInNextMonth] = nextMonthDate(year, month);

  //get events from FIrebase someday ....
  // now just hardcoded
  const evnts = events.filter((event) => {
    return (
      (event.year === year && event.month === month) ||
      (event.year === prevYear && event.month === prevMonth) ||
      (event.year === nextYear && event.month === nextMonth)
    );
  });

  // console.log(year, month, evnts);

  return { type: FETCH_EVENTS, payload: evnts };
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
    day: 10,
    month: 2,
    year: 2021,
    type: "paragraf",
    label: "Paragraf",
  },
];

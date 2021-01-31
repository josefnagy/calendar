import { SET_CAL_DATE, FETCH_CALENDAR } from "./types";
import createCalendar from "../js/cal";

export const setDate = (date) => {
  return { type: SET_CAL_DATE, payload: date };
};

export const fetchCalendar = (year, month) => {
  const calendar = createCalendar(year, month);
  return { type: FETCH_CALENDAR, payload: calendar };
};

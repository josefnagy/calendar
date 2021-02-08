import { SET_CAL_DATE, SHOW_MONTH } from "../actions/types";
import createCalendar from "../js/cal";

const INITIAL_STATE = {
  date: new Date(),
  get currentDay() {
    return this.date.getDate();
  },
  get currentMonth() {
    return this.date.getMonth() + 1;
  },
  get currentYear() {
    return this.date.getFullYear();
  },
  get calMonth() {
    return this.date.getMonth() + 1;
  },
  get calYear() {
    return this.date.getFullYear();
  },
  monthsNames: [
    "Leden",
    "Únor",
    "Březen",
    "Duben",
    "Květen",
    "Červen",
    "Červenec",
    "Srpen",
    "Září",
    "Říjen",
    "Listopad",
    "Prosinec",
  ],
  get calendar() {
    return createCalendar(this.currentYear, this.currentMonth);
  },
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CAL_DATE:
      return {
        ...state,
        calMonth: action.payload.calMonth,
        calYear: action.payload.calYear,
        calendar: createCalendar(
          action.payload.calYear,
          action.payload.calMonth
        ),
      };

    case SHOW_MONTH:
      return {
        ...state,
        calMonth: action.payload.calMonth,
        calYear: action.payload.calYear,
        calendar: createCalendar(
          action.payload.calYear,
          action.payload.calMonth
        ),
      };

    default:
      return state;
  }
};

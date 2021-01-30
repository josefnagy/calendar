import { SET_CAL_DATE } from "../actions/types";

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
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CAL_DATE:
      return {
        ...state,
        calMonth: action.payload.calMonth,
        calYear: action.payload.calYear,
      };

    default:
      return state;
  }
};

import { SET_CAL_DATE } from "./types";

export const setDate = (date) => {
  return { type: SET_CAL_DATE, payload: date };
};

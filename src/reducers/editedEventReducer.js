import { SHOW_EDIT, SET_CAL_DATE } from "../actions/types";

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_EDIT:
      return action.payload;

    case SET_CAL_DATE:
      return null;

    default:
      return state;
  }
};

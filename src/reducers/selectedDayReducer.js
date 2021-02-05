import { SHOW_A_DAY, FETCH_EVENTS, CLEAR_SELECTED_DAY } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_A_DAY:
      return action.payload;

    case CLEAR_SELECTED_DAY:
      return [];

    default:
      return state;
  }
};

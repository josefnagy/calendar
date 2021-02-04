import { SHOW_A_DAY, FETCH_EVENTS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_A_DAY:
      return action.payload;

    case FETCH_EVENTS:
      return [];

    default:
      return state;
  }
};

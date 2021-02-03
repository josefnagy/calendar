import { FETCH_EVENTS, SHOW_A_DAY } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return [...action.payload];

    case SHOW_A_DAY:
      console.log(action.payload);
      return action.payload;

    default:
      return state;
  }
};

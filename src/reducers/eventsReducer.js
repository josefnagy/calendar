import { FETCH_EVENTS } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return [...action.payload];

    default:
      return state;
  }
};

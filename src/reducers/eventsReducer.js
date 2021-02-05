import { FETCH_EVENTS, DELETE_EVENT, NEW_EVENT } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS:
      return [...action.payload];

    case NEW_EVENT:
      console.log(action.payload);
      return state;

    case DELETE_EVENT:
      console.log(action.payload);
      return state;

    default:
      return state;
  }
};

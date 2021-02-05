import {
  SHOW_A_DAY,
  CLEAR_SELECTED_DAY,
  SET_SELECTED_DAY,
  NEW_EVENT,
} from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_A_DAY:
      return action.payload;

    case NEW_EVENT:
      return { ...state, events: [...state.events, action.payload] };

    case SET_SELECTED_DAY:
      return { ...state, day: action.payload, events: [] };

    case CLEAR_SELECTED_DAY:
      return [];

    default:
      return state;
  }
};

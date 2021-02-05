import {
  FETCH_EVENTS,
  DELETE_EVENT,
  NEW_EVENT,
  SHOW_EDIT,
  SET_CAL_DATE,
  EDIT_EVENT,
} from "../actions/types";

const INITIAL_STATE = {
  allEvents: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS: {
      return { ...state, allEvents: [...action.payload] };
    }

    case SHOW_EDIT:
      return { ...state, editedEvent: action.payload };

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

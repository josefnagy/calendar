import {
  FETCH_EVENTS,
  DELETE_EVENT,
  NEW_EVENT,
  SHOW_EDIT,
  SHOW_A_DAY,
  EDIT_EVENT,
  CLEAR_SELECTED_DAY,
  SET_SELECTED_DAY,
} from "../actions/types";

const INITIAL_STATE = {
  allEvents: [],
  selectedDay: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_EVENTS: {
      return { ...state, allEvents: [...action.payload], selectedDay: [] };
    }

    case CLEAR_SELECTED_DAY:
      return state;

    case SET_SELECTED_DAY: {
      const filteredEvents = state.allEvents.filter((event) => {
        return (
          event.id ===
          `${action.payload[0]}-${action.payload[1]}-${action.payload[2]}`
        );
      });

      return {
        ...state,
        selectedDay: { day: action.payload[2], events: [...filteredEvents] },
      };
      // return { ...state, day: action.payload, events: [] };
    }

    case SHOW_A_DAY:
      return { ...state, selectedDay: action.payload };

    case SHOW_EDIT:
      return { ...state, editedEvent: action.payload };

    case NEW_EVENT:
      return {
        ...state,
        allEvents: [...state.allEvents, action.payload],
        selectedDay: {
          ...state.selectedDay,
          events: [...state.selectedDay.events, action.payload],
        },
      };

    case DELETE_EVENT:
      return state;

    default:
      return state;
  }
};

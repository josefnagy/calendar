import _ from "lodash";

import {
  FETCH_EVENTS,
  DELETE_EVENT,
  NEW_EVENT,
  SHOW_EDIT,
  SHOW_A_DAY,
  EDIT_EVENT,
  SET_SELECTED_DAY,
  SHOW_MONTH,
  SET_CAL_DATE,
  CHECK_IF_IN_SYNC,
  LOGOUT,
  FETCH_EVENTS_FOR_MONTH,
} from "../actions/types";

const INITIAL_STATE = {
  allEvents: {},
  selectedDay: {},
  fetchedMonths: [],
  updatedAt: null,
  synced: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // * TIMHLE SE RESETNE LOCAL STORAGE
    // * localStorage.clear('persist:persistedStore')

    case "persist/REHYDRATE":
      if (action.payload) {
        return {
          ...state,
          allEvents: action.payload.events.allEvents,
          selectedDay: action.payload.events.selectedDay,
          fetchedMonths: action.payload.events.fetchedMonths,
          updatedAt: action.payload.events.updatedAt,
          synced: action.payload.events.synced,
        };
      }
      return state;

    case LOGOUT: {
      return { ...state, allEvents: {}, fetchedMonths: [] };
    }

    case SHOW_MONTH:
      return state;

    case FETCH_EVENTS: {
      console.log(action.payload);
      const allEvents = _.mapKeys(action.payload.res, "key");
      return {
        ...state,
        allEvents,
        selectedDay: {},
        fetchedMonths: action.payload.fetchedMonths,
      };
    }

    case CHECK_IF_IN_SYNC: {
      if (action.payload.synced) {
        return {
          ...state,
          synced: action.payload.synced,
        };
      } else {
        return {
          ...state,
          synced: action.payload.synced,
          updatedAt: action.payload.updatedAt,
        };
      }
    }

    case FETCH_EVENTS_FOR_MONTH: {
      const eventsForMonth = _.mapKeys(action.payload.res, "key");
      return {
        ...state,
        allEvents: { ...state.allEvents, ...eventsForMonth },
        selectedDay: {},
        fetchedMonths: [...state.fetchedMonths, action.payload.fetchedMonth],
      };
    }

    case SHOW_EDIT:
      return { ...state, editedEvent: action.payload };

    case EDIT_EVENT: {
      const eventToUpdate = state.selectedDay.events[action.payload[0]];
      const key = action.payload[0];

      const e1 = { ...state.selectedDay.events };
      const e2 = { ...state.allEvents };

      const updatedEvent = { ...eventToUpdate, ...action.payload[1] };
      e1[key] = updatedEvent;
      e2[key] = updatedEvent;

      return {
        ...state,
        selectedDay: {
          ...state.selectedDay,
          events: { ...e1 },
        },
        allEvents: { ...e2 },
        updatedAt: updatedEvent.updatedAt,
      };
    }

    case SET_CAL_DATE:
      return { ...state, selectedDay: { day: undefined } };

    case SET_SELECTED_DAY: {
      const eventsArray = Object.values(state.allEvents);

      const filteredEvents = eventsArray.filter((event) => {
        return (
          event.id ===
          `${action.payload[0]}-${action.payload[1]}-${action.payload[2]}`
        );
      });

      const filteredEventsObj = _.mapKeys(filteredEvents, "key");

      return {
        ...state,
        selectedDay: { day: action.payload[2], events: filteredEventsObj },
      };
      // return { ...state, day: action.payload, events: [] };
    }

    case SHOW_A_DAY: {
      console.log(action.payload);
      const { day, month, year } = action.payload;
      const selectedEvents = action.payload.events;
      const selectedEventsObj = _.mapKeys(selectedEvents, "key");

      return {
        ...state,
        selectedDay: { day, month, year, events: selectedEventsObj },
      };
    }

    case NEW_EVENT: {
      const newEvnt = {};
      newEvnt[action.payload.key] = action.payload;
      const newState = { ...state };
      const allEventsArr = Object.values(newState.allEvents);
      const eventArrWithNewEvent = [...allEventsArr, action.payload];
      const newEvntObj = _.mapKeys(eventArrWithNewEvent, "key");
      const selectedDayEventsArr = Object.values(newState.selectedDay.events);
      const selectedDayEventsWithNewEvent = [
        ...selectedDayEventsArr,
        action.payload,
      ];
      const newSelectedDayEventsObj = _.mapKeys(
        selectedDayEventsWithNewEvent,
        "key"
      );

      if ("events" in state.selectedDay) {
        return {
          ...state,
          allEvents: newEvntObj,
          selectedDay: {
            ...state.selectedDay,
            events: newSelectedDayEventsObj,
          },
          updatedAt: action.payload.updatedAt,
        };
      }
      return {
        ...state,
        allEvents: { ...state.allEvents, newEvnt },
        selectedDay: {
          ...state.selectedDay,
          events: newSelectedDayEventsObj,
        },
        updatedAt: action.payload.updatedAt,
      };
    }
    case DELETE_EVENT:
      return {
        ...state,
        allEvents: _.omit(state.allEvents, action.payload[0]),
        selectedDay: {
          ...state.selectedDay,
          events: _.omit(state.selectedDay.events, action.payload[0]),
        },
        updatedAt: action.payload[1],
      };

    default:
      return state;
  }
};

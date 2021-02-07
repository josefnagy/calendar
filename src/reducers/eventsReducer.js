import _ from "lodash";

import {
  FETCH_EVENTS,
  DELETE_EVENT,
  NEW_EVENT,
  SHOW_EDIT,
  SHOW_A_DAY,
  EDIT_EVENT,
  CLEAR_SELECTED_DAY,
  SET_SELECTED_DAY,
  SET_CAL_DATE,
} from "../actions/types";

const INITIAL_STATE = {
  allEvents: {},
  selectedDay: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "persist/REHYDRATE":
      return {
        ...state,
        allEvents: action.payload.events.allEvents,
        selectedDay: action.payload.events.selectedDay,
      };

    case FETCH_EVENTS: {
      // return { ...state, allEvents: [...action.payload], selectedDay: [] };
      const allEvents = _.mapKeys(action.payload, "key");
      return { ...state, allEvents, selectedDay: {} };
    }

    case SHOW_EDIT:
      return { ...state, editedEvent: action.payload };

    case EDIT_EVENT: {
      // TODO: tady tohle musim vykutit, necchce to fachat neajk
      // const nState = { ...state };
      // console.log(action.payload);

      const eventToUpdate = state.selectedDay.events[action.payload[0]];
      const key = action.payload[0];
      // console.log(eventToUpdate);

      const updatedEvent = { ...eventToUpdate, ...action.payload[1] };
      // console.log(updatedEvent);
      // nState.selectedDay.events[action.payload[0]] = updatedEvent;
      // console.log(nState);

      return {
        ...state,
        selectedDay: {
          ...state.selectedDay,
          events: { ...state.selectedDay.events, key: updatedEvent },
        },
      };
    }

    // case CLEAR_SELECTED_DAY:
    //   return { ...state, selectedDay: { day: undefined } };

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
            // events: { ...state.selectedDay.events, newEvnt },
            events: newSelectedDayEventsObj,
          },
        };
      }
      return {
        ...state,
        allEvents: { ...state.allEvents, newEvnt },
        selectedDay: {
          ...state.selectedDay,
          // events: { ...state.selectedDay, newEvnt },
          events: newSelectedDayEventsObj,
        },
      };
    }
    case DELETE_EVENT:
      return state;

    default:
      return state;
  }
};

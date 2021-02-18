import { NEW_EVENT } from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NEW_EVENT: {
      console.log(action.payload);
      const event = action.payload;
      const newStats = { ...state };
      if (typeof newStats[event.dateId] === "undefined") {
        newStats[event.dateId] = {
          shifts: {
            workingEventsForMonth: 1,
          },
        };
      } else newStats[event.dateId].shifts.workingEventsForMonth++;

      console.log(newStats);

      return {
        ...state,
        ...newStats,
      };
    }
    default:
      return state;
  }
};

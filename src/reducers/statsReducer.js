import _ from "lodash";

import { NEW_EVENT } from "../actions/types";
import { getWorkingDaysInMonth } from "../js/cal";

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
            workingEvents: 1,
            workingDays: getWorkingDaysInMonth(event.year, event.month),
          },
        };
      } else newStats[event.dateId].shifts.workingEvents++;

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

import _ from "lodash";

import { UPDATE_STATS } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STATS:
      return {
        ...action.payload,
      };

    default:
      return state;
  }
};

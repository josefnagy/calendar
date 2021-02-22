import { UPDATE_STATS, FETCH_STATS, LOGOUT } from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UPDATE_STATS:
      return {
        ...action.payload,
      };

    case FETCH_STATS:
      console.log(action.payload);
      return {
        ...action.payload,
      };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};

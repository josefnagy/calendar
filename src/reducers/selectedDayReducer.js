import { SHOW_A_DAY } from "../actions/types";

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_A_DAY:
      return action.payload;

    default:
      return state;
  }
};

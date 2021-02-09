import { CREATE_USER, LOGIN, LOGOUT, SET_USER } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      console.log(action.payload);
      return { ...state, user: action.payload, isSignedIn: true };

    case SET_USER:
      return { ...state, user: action.payload, isSignedIn: true };

    case LOGIN:
      console.log("reducer");
      return { ...state, isSignedIn: true, user: action.payload };

    case LOGOUT:
      return { ...state, user: null, isSignedIn: false };

    default:
      return state;
  }
};

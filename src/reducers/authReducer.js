import {
  CREATE_USER,
  LOGIN,
  LOGOUT,
  SET_USER,
  CLEAN_ERROR,
  SET_ERROR,
  SHOW_MONTH,
} from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  user: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_USER:
      if (action.payload.code) return { ...state, error: action.payload.code };
      else
        return { ...state, user: action.payload, isSignedIn: true, error: "" };

    case SET_ERROR: {
      const error = action.payload;
      let errorMessage = "";

      if (error) {
        switch (error) {
          case "auth/email-already-in-use":
            errorMessage = "Sorry, tenhle email už je zaregistrován";
            break;

          case "auth/invalid-email":
            errorMessage = "Sorry, email obsahuje nepovolené znaky";
            break;

          case "auth/invalid-password":
            errorMessage =
              "Sorry, heslo musí mít alspoň 6 znaků a být to string...";
            break;

          case "auth/weak-password":
            errorMessage = "Sorry, heslo by mělo mít alspoň 6 znaků";

            break;

          default:
            errorMessage = error;
            break;
        }
      }
      return { ...state, error: errorMessage };
    }
    case CLEAN_ERROR:
      return { ...state, error: undefined };

    case SET_USER:
      return { ...state, user: action.payload, isSignedIn: true };

    case LOGIN:
      return { ...state, isSignedIn: true, user: action.payload };

    case LOGOUT:
      return { ...state, user: null, isSignedIn: false };

    case SHOW_MONTH:
      return { ...state, error: undefined };

    default:
      return state;
  }
};

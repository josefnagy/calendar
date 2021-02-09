import { combineReducers } from "redux";

import dateReducer from "./dateReducer";
import eventsReducer from "./eventsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  date: dateReducer,
  events: eventsReducer,
  auth: authReducer,
});

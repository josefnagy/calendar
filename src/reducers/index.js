import { combineReducers } from "redux";

import dateReducer from "./dateReducer";
import eventsReducer from "./eventsReducer";
import authReducer from "./authReducer";
import statsReducer from "./statsReducer";

export default combineReducers({
  date: dateReducer,
  events: eventsReducer,
  auth: authReducer,
  stats: statsReducer,
});

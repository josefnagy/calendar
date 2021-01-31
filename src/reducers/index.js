import { combineReducers } from "redux";

import dateReducer from "./dateReducer";
import eventsReducer from "./eventsReducer";

export default combineReducers({
  date: dateReducer,
  events: eventsReducer,
});

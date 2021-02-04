import { combineReducers } from "redux";

import dateReducer from "./dateReducer";
import eventsReducer from "./eventsReducer";
import selectedDayReducer from "./selectedDayReducer";
import editedEventReducer from "./editedEventReducer";

export default combineReducers({
  date: dateReducer,
  events: eventsReducer,
  selectedDay: selectedDayReducer,
  editedDay: editedEventReducer,
});

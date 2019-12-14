import { combineReducers } from "redux";
import user from "./auth";
import messages from "./messages";

export default combineReducers({
  messages,
  user
});

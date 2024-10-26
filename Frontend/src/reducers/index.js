import { combineReducers } from "redux";
import userReducer from "./user";
import authReducer from "./auth";
const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer, 
});
export default rootReducer;
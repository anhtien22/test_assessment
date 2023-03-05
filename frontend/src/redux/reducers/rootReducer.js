
import { combineReducers } from "redux";
import { profileReducer, userReducer } from "./userReducer";


const rootReducer = combineReducers({
  userData: userReducer,
  profile: profileReducer,
});

export default rootReducer;

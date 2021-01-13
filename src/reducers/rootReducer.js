import { combineReducers } from "redux";
import auth from "./authReducer";
import quiz from "./quizReducer";

const rootReducer = combineReducers({ auth, quiz });
export default rootReducer;

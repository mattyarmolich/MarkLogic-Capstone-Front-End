import { combineReducers } from "redux";
import credentials from "./authReducers";
import s3 from "./s3Reducers";

const rootReducer = combineReducers({
  credentials,
  s3
});

export default rootReducer;

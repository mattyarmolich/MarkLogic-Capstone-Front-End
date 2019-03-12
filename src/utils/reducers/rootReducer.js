import { combineReducers } from "redux";
import credentials from "./authReducers";
import s3 from "./s3Reducers";
import loading from "./loadingReducer";

const rootReducer = combineReducers({
  credentials,
  s3,
  loading
});

export default rootReducer;

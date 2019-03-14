import { combineReducers } from "redux";
import credentials from "./authReducers";
import s3 from "./s3Reducers";
import loading from "./loadingReducer";
import ml from "./mlReducer";

const rootReducer = combineReducers({
  credentials,
  s3,
  loading,
  ml
});

export default rootReducer;

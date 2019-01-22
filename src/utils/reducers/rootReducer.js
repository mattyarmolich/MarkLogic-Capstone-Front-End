import { combineReducers } from 'redux';
import credentials from './authReducers';
const rootReducer = combineReducers({
  credentials
});

export default rootReducer;

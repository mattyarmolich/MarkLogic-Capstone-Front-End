import initialState from "./initialState";
import { GET_FILES, RECEIVE_FILES, SET_SELECTED } from "../actions/actionTypes";

export default function credentials(state = initialState.files, action) {
  switch (action.type) {
    case GET_FILES:
      console.log("fetch_files Action");
      return action;
    case RECEIVE_FILES:
      return Object.assign({}, state, {
        files: action.authentication.data.data,
        selected: null
      });
    case SET_SELECTED:
      console.log(action.file);
      return Object.assign({}, state, {
        selected: action.file
      });
    default:
      return state;
  }
}

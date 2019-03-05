import initialState from "./initialState";
import { GET_FILES, RECEIVE_FILES } from "../actions/actionTypes";

export default function credentials(state = initialState.files, action) {
  switch (action.type) {
    case GET_FILES:
      console.log("fetch_files Action");
      return action;
    case RECEIVE_FILES:
      return action.authentication.data.data;
    default:
      return state;
  }
}

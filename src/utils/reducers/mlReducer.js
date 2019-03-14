import initialState from "./initialState";
import { RECEIVE_CLASSIFIER } from "../actions/actionTypes";

export default function credentials(state = initialState.files, action) {
  switch (action.type) {
    case RECEIVE_CLASSIFIER:
      console.log(action.data);
      return Object.assign({}, state, {
        classification: action.data
      });
    default:
      return state;
  }
}

import initialState from "./initialState";
import { SET_LOADING } from "../actions/actionTypes";

export default function credentials(state = initialState.loading, action) {
  switch (action.type) {
    case SET_LOADING:
      return action.loading;
    default:
      return state;
  }
}

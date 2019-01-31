import initialState from './initialState';
import { FETCH_AUTH, RECEIVE_AUTH } from '../actions/actionTypes';

export default function credentials(state = initialState.credentials, action) {
  switch (action.type) {
    case FETCH_AUTH:
      console.log('FETCH_STUFF Action');
      return action;
      // This doesn't do anything?
    case RECEIVE_AUTH:
      sessionStorage.setItem('token', action.authentication.data.auth_token);
      if(sessionStorage.getItem('token') === "undefined") {
        return Object.assign({}, state, {
          authenticated: false
        });
      }
      else {
        return Object.assign({}, state, {
          authenticated: true,
          token: sessionStorage.getItem('token'),
        });
      }


    default:
      return state;
  }
}

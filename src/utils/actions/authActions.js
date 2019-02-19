import * as types from "./actionTypes";
import axios from "axios";
export function receiveAuth(json) {
  return { type: types.RECEIVE_AUTH, authentication: json };
}

export function fetchAuth(user, pass) {
  return dispatch => {
    axios({
      url: "http://52.33.68.240/users/login",
      method: "POST",
      json: true,
      data: {
        email: user,
        password: pass
      }
    })
      .then(res => {
        dispatch(receiveAuth(res));
      })
      .catch(err => alert("incorrect login"));
  };
}

export function registerAuth(user, pass) {
  return dispatch => {
    axios({
      url: "http://52.33.68.240/users/register",
      method: "POST",
      json: true,
      data: {
        email: user,
        password: pass
      }
    })
      .then(res => {
        dispatch(receiveAuth(res));
      })
      .catch(err => console.log(err));
  };
}

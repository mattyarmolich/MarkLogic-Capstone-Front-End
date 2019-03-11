import * as types from "./actionTypes";
import axios from "axios";
export function receiveAuth(json) {
  return { type: types.RECEIVE_AUTH, authentication: json };
}

export function fetchAuth(user, pass) {
  return dispatch => {
    axios({
      url:
        "http://ec2-54-213-224-0.us-west-2.compute.amazonaws.com/users/login",
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
      .catch(err => {
        console.log(err);
        alert("incorrect login");
      });
  };
}

export function registerAuth(user, pass) {
  return dispatch => {
    axios({
      url:
        "http://ec2-54-213-224-0.us-west-2.compute.amazonaws.com/users/register",
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

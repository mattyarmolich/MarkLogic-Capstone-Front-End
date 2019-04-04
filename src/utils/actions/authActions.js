import * as types from "./actionTypes";
import axios from "axios";
import ec2URL from "../urlAssets";
export function receiveAuth(json) {
  return { type: types.RECEIVE_AUTH, authentication: json };
}

export function fetchAuth(user, pass) {
  return dispatch => {
    axios({
      url: ec2URL + "/users/login",
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
      url: ec2URL + "/users/register",
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

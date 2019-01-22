import * as types from './actionTypes';
import axios from 'axios';
export function receiveAuth(json) {
  return { type: types.RECEIVE_AUTH, authentication: json };
}

export function fetchAuth(user, pass) {
  return dispatch => {
    axios({
      url:
        'http://ec2-52-33-68-240.us-west-2.compute.amazonaws.com:5001/users/login',
      method: 'POST',
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

export function registerAuth(user, pass) {
  return dispatch => {
    axios({
      url:
        'http://ec2-52-33-68-240.us-west-2.compute.amazonaws.com:5001/users/register',
      method: 'POST',
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

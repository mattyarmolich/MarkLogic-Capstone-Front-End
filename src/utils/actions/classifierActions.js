import * as types from "./actionTypes";
import axios from "axios";

export function receiveClassifier(json) {
  return { type: types.RECEIVE_FILES, authentication: json };
}

export function getClassifier(user, pass) {
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token")
  };

  return dispatch => {
    axios({
      url:
        "http://ec2-54-213-224-0.us-west-2.compute.amazonaws.com/s3/file_list",
      method: "GET",
      headers: headers
    })
      .then(res => {
        console.log(res);
        dispatch(receiveFiles(res));
      })
      .catch(err => console.log(err));
  };
}

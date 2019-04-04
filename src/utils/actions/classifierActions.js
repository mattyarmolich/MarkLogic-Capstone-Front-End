import * as types from "./actionTypes";
import axios from "axios";
import ec2URL from "../urlAssets";
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
      url: ec2URL + "/s3/file_list",
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

import * as types from "./actionTypes";
import axios from "axios";
import { setLoading } from "./loadingAction";
import { connect } from "react-redux";

export function startML(fileName) {
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token")
  };

  return dispatch => {
    axios({
      url: "http://ec2-54-213-224-0.us-west-2.compute.amazonaws.com/ml/start",
      method: "POST",
      headers: headers,
      data: {
        files: [fileName]
      }
    })
      .then(res => {
        dispatch(receiveML());
      })
      .catch(err => {
        alert("Classifying an object is already in progress");
        dispatch(receiveML());
      });
  };
}

export function receiveML() {
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token")
  };

  console.log("polling");
  return dispatch => {
    axios({
      url: "http://ec2-54-213-224-0.us-west-2.compute.amazonaws.com/ml/status",
      method: "GET",
      headers: headers
    })
      .then(res => {
        console.log(res.data.message);
        if (res.data.message === "Completed.") {
          dispatch(getFinalML());
          dispatch(setLoading(false));

          //get final data from ml/classified
        } else {
          setTimeout(() => {
            dispatch(receiveML());
          }, 3000);
        }
      })
      .catch(err => console.log(err));
  };
}

export function getFinalML() {
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token")
  };

  return dispatch => {
    axios({
      url:
        "http://ec2-54-213-224-0.us-west-2.compute.amazonaws.com/ml/classified",
      method: "GET",
      headers: headers
    })
      .then(res => {
        console.log("final classified data");
        console.log(res);
      })
      .catch(err => console.log(err));
  };
}

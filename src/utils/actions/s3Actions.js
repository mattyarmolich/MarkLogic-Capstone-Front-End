import * as types from "./actionTypes";
import axios from "axios";
import ec2URL from "../urlAssets";

export function receiveFiles(json) {
  return { type: types.RECEIVE_FILES, authentication: json };
}

export function fetchFiles(user, pass) {
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

export function fetchPast(user, pass) {
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token")
  };

  return dispatch => {
    axios({
      url: ec2URL + "/s3/classified_list",
      method: "GET",
      headers: headers
    })
      .then(res => {
        dispatch(receiveFiles(res));
      })
      .catch(err => console.log(err));
  };
}

export function deleteFile(file) {
  const formData = new FormData();
  formData.append("file1", file);
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token")
  };
  var body = {
    file1: file
  };
  console.log(body);

  return dispatch => {
    axios({
      url: ec2URL + "/s3/deleteFileOriginal",
      method: "POST",
      headers: headers,
      data: formData
    })
      .then(res => {
        dispatch(fetchFiles(res));
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchFiles());
      });
  };
}

export function deleteClassified(file) {
  const formData = new FormData();
  formData.append("file1", file);
  var headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("token")
  };
  var body = {
    file1: file
  };
  console.log(body);

  return dispatch => {
    axios({
      url: ec2URL + "/s3/deleteFileClassified",
      method: "POST",
      headers: headers,
      data: formData
    })
      .then(res => {
        dispatch(fetchPast());
      })
      .catch(err => {
        console.log(err);
        dispatch(fetchPast());
      });
  };
}

export function setActiveFile(file) {
  return { type: types.SET_SELECTED, file: file };
}

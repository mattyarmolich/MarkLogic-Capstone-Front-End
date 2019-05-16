import React, { Component } from "react";
import "./DragDrop.scss";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import { Switch, Route, withRouter } from "react-router-dom";

class DragDrop extends Component {
  constructor(props) {
    super(props);
    this.dropRef = React.createRef();
    this.state = {
      dragging: false,
      loaded: 0,
      files: [],
      filesToUpload: []
    };
  }

  submitFile = event => {
    event.preventDefault();
    const formData = new FormData();
    this.state.filesToUpload.map((file, index) => {
      formData.append(this.state.files[index], file, this.state.files[index]);
    });

    formData.append("bucket_name", "uploads");
    var headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + sessionStorage.getItem("token")
    };
    var data = {
      file1: formData
    };
    console.log(sessionStorage.getItem("token"));
    axios
      .post(
        "http://ec2-54-213-224-0.us-west-2.compute.amazonaws.com/s3/uploadOriginal",
        formData,
        {
          onUploadProgress: ProgressEvent => {
            this.setState({
              loaded: (ProgressEvent.loaded / ProgressEvent.total) * 100
            });
          },
          headers: headers
        }
      )
      .then(() => {
        this.props.closeModal();
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  handleFileDrop = files => {
    let fileList = this.state.files;
    let fileUploads = this.state.filesToUpload;
    console.log("FILE DROP");
    for (var i = 0; i < files.length; i++) {
      if (!files[i].name) return;
      if (files[i].name.split(".")[1] !== "csv") {
        alert("Please drag in a CSV file in order to classify data");
        return;
      }

      // if (/* WHAT SHOULD GO HERE ????*/ super.props.files.includes(files[i].name)) {
      //   alert("A file named: \"" + files[i].name + "\" has already been uploaded.")
      //   return
      // }

      fileList.push(files[i].name);
      fileUploads.push(files[i]);
    }

    this.setState({ files: fileList, filesToUpload: fileUploads });
  };

  handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: false });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.handleFileDrop(e.dataTransfer.files);
      // e.dataTransfer.clearData()
      this.dragCounter = 0;
    }
  };

  handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ dragging: true });
  };

  handleDragIn = e => {
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter++;
    this.setState({ dragging: true });
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      this.setState({ dragging: true });
    }
  };

  handleDragOut = e => {
    this.setState({ dragging: false });
    e.preventDefault();
    e.stopPropagation();
    this.dragCounter--;
  };

  handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
  };

  render() {
    return (
      <div
        className="DragDrop"
        onDragEnter={e => this.handleDragIn(e)}
        onDragOver={e => this.handleDragOver(e)}
        onDrop={e => this.handleDrop(e)}
        onDragEnd={e => this.handleDragOut(e)}
      >
        {this.state.files.length > 0 ? (
          <div className="file-container">
            {this.state.files.map((file, index) => (
              <div key={index}>{file}</div>
            ))}
          </div>
        ) : (
          <div>no files uploaded</div>
        )}

        {this.state.dragging && (
          <div className="drag-drop-container">
            <div className="drop-zone">
              <div>Drop files here</div>
            </div>
          </div>
        )}
        <button onClick={e => this.submitFile(e)}>submit</button>
        <div> {Math.round(this.state.loaded, 2)} %</div>
      </div>
    );
  }
}

// function hasDuplicates(array) {
//   var valuesSoFar = Object.create(null);
//   for (var i = 0; i < array.length; ++i) {
//       var value = array[i];
//       if (value in valuesSoFar) {
//           return true;
//       }
//       valuesSoFar[value] = true;
//   }
//   return false;
// }

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    s3Actions: bindActionCreators(s3Actions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DragDrop)
);

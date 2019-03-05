import React, { Component } from "react";
import "./Uploads.scss";
import axios from "axios";
import DragDrop from "./../../Components/DragDrop/DragDrop";
import Modal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import { Switch, Route, withRouter } from "react-router-dom";

if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

class Uploads extends Component {
  constructor() {
    super();

    this.state = {
      showModal: false,
      files: ["file0", "file1", "file2"],
      selectedFile: null
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  componentDidMount() {
    this.props.s3Actions.fetchFiles();
  }
  handleOpenModal = () => {
    console.log("this ran");
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  setSelectedFile = e => {
    if (this.state.selectedFile !== null) {
      document
        .getElementById(this.state.selectedFile.id)
        .classList.remove("active-item");
    }
    this.setState({
      selectedFile: e.target
    });
    document.getElementById(e.target.id).classList.add("active-item");
  };

  nextStep = e => {
    console.log(this.state.selectedFile);
    this.props.nextStep();
  };
  render() {
    return (
      <div className="uploads-container">
        <div className="uploads-view">
          <div className="Title-text">Select a file you wish to classify:</div>
          <div className="current-files">
            <ul
              className="current-files"
              onClick={e => this.setSelectedFile(e)}
            >
              {this.state.files.map((item, i) => (
                <li id={i} className="file-list-item" key={i + 1}>
                  {i}. {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bottom-part">
            <button
              className="upload-button"
              onClick={() => this.handleOpenModal()}
            >
              Upload New File
            </button>
            <button className="next" onClick={e => this.nextStep(e)}>
              next
            </button>
          </div>

          <Modal
            isOpen={this.state.showModal}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className="upload-file-modal"
            contentLabel="Example Modal"
          >
            <button onClick={() => this.handleCloseModal()}>close</button>
            <DragDrop />
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.files
  };
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
  )(Uploads)
);

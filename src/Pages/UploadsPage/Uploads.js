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
      selectedFile: null
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props !== nextProps) {
      return true;
    } else if (this.state !== nextState) {
      return true;
    } else {
      return false;
    }
  }
  componentDidMount() {
    this.props.s3Actions.fetchFiles();
  }
  handleOpenModal = () => {
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
    this.props.s3Actions.fetchFiles();
  };

  setSelectedFile = e => {
    if (this.state.selectedFile !== null) {
      var y = document.getElementById(this.state.selectedFile.id);
      if (y !== null) {
        y.classList.remove("active-item");
      }
    }

    this.props.s3Actions.setActiveFile(this.props.files[e.target.id]);

    this.setState({
      selectedFile: e.target
    });

    var x = document.getElementById(e.target.id);
    if (x !== null) {
      x.classList.add("active-item");
    }
  };

  nextStep = e => {
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
              {this.props.files &&
                this.props.files.map((item, i) => (
                  <li
                    id={i}
                    value={item}
                    className="file-list-item"
                    key={i + 1}
                  >
                    {i}) {item.file_names}
                  </li>
                ))}
            </ul>
            <button
              className="button-style"
              onClick={() => this.handleOpenModal()}
            >
              Upload New File
            </button>
          </div>
          <div className="bottom-part">
            {this.props.selected ? (
              <div className="button-container">
                <button className="next" onClick={e => this.nextStep(e)}>
                  Proceed
                </button>
                <button
                  className="next"
                  onClick={e => console.log("DELETE FILE")}
                >
                  Delete
                </button>
              </div>
            ) : (
              <div className="info-message">Select a file to proceed</div>
            )}
          </div>

          <Modal
            isOpen={this.state.showModal}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            className="upload-file-modal"
            contentLabel="Example Modal"
          >
            <button onClick={() => this.handleCloseModal()}>close</button>
            <DragDrop closeModal={() => this.handleCloseModal()} />
          </Modal>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    files: state.s3.files,
    selected: state.s3.selected
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

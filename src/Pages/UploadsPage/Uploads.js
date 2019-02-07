import React, { Component } from "react";
import "./Uploads.scss";
import axios from "axios";
import DragDrop from "./../../Components/DragDrop/DragDrop";
import Modal from "react-modal";

if (process.env.NODE_ENV !== "test") {
  Modal.setAppElement("#root");
}

class Uploads extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      files: ["file0", "file1", "file2"]
    };

    this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal = () => {
    console.log("this ran");
    this.setState({ showModal: true });
  };

  handleCloseModal = () => {
    this.setState({ showModal: false });
  };

  componentDidMount() {}

  render() {
    return (
      <div className="uploads-container">
        <div className="uploads-view">
          <div className="Title-text">Files</div>
          <div className="current-files">
            <ul className="current-files">
              {this.state.files.map((item, i) => (
                <li key={i}>{item}</li>
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
            <button className="next" onClick={this.props.nextStep}>
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

export default Uploads;

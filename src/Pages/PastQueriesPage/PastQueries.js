import React, { Component } from "react";
import "./PastQueries.scss";
import axios from "axios";
import DragDrop from "./../../Components/DragDrop/DragDrop";
import Modal from "react-modal";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import { Switch, Route, withRouter } from "react-router-dom";

class PastQueries extends Component {
  constructor() {
    super();

    this.state = {
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
    this.props.s3Actions.fetchPast();
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
          <div className="Title-text">Select a past classification to view</div>
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
                    {i}) {item.classified_names}
                  </li>
                ))}
            </ul>
          </div>
          <div className="bottom-part">
            {this.props.selected ? (
              <button className="next" onClick={e => this.nextStep(e)}>
                Proceed
              </button>
            ) : (
              <div className="info-message">Select a file to proceed</div>
            )}
          </div>
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
  )(PastQueries)
);

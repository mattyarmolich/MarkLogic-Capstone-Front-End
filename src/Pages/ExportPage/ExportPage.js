import React, { Component } from "react";
import "./ExportPage.scss";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import { Switch, Route, withRouter } from "react-router-dom";

class ExportPage extends Component {
  constructor(props) {
    super(props);
  }

  _downloadTxtFile = object => {
    console.log("tjisasfaf");
    const fileData = JSON.stringify(object);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "tempFile.json";
    link.href = url;
    link.click();
  };

  componentDidMount() {}

  render() {
    return (
      <div className="loading-container">
        <div className="loading-view">
          <div className="Title-text">Export</div>
          <div>
            <div>Download Classified Data</div>
            <button
              onClick={() => this._downloadTxtFile(this.props.classified)}
            >
              Download
            </button>
          </div>
          <div className="bottom-part">
            <button onClick={this.props.firstStep}>Back to Beginning</button>
            <button onClick={this.props.previousStep}>previous</button>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.ml.classification);
  return {
    classified: state.ml.classification
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ExportPage)
);

import React, { Component } from "react";
import "./ResultPage.scss";
import axios from "axios";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as s3Actions from "../../utils/actions/s3Actions";
import { Switch, Route, withRouter } from "react-router-dom";

class ResultPage extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  _downloadTxtFile = object => {
    const fileData = JSON.stringify(object);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.download = "tempFile.json";
    link.href = url;
    link.click();
  };

  render() {
    return (
      <div className="result-container">
        <div className="results-view">
          <div className="Title-text">Results</div>
          <ul className="player-card-container">
            {this.props.classified &&
              this.props.classified.map((object, key) => (
                <li key={key} className="player-card-object">
                  {Object.keys(object).map(function(key) {
                    return (
                      <div>
                        <div>
                          {key} : {object[key]}
                        </div>
                      </div>
                    );
                  })}
                  <button onClick={() => this._downloadTxtFile(object)}>
                    Download
                  </button>
                </li>
              ))}
          </ul>
          <div className="bottom-part">
            <button className="button-style" onClick={this.props.previousStep}>
              previous
            </button>
            <button className="button-style" onClick={this.props.nextStep}>
              next
            </button>
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
  )(ResultPage)
);
